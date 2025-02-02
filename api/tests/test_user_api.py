import pytest
from flask import json
from app import create_app, db
from app.models import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

@pytest.fixture(scope="function")
def client():
  app = create_app()
  app.config['TESTING'] = True
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
  with app.test_client() as client:
    with app.app_context():
      db.create_all()
      yield client
      db.session.close_all()
      db.drop_all()

def test_login(client):
  user = User(username='testuser', email='test@example.com', password=generate_password_hash('password'))
  db.session.add(user)
  db.session.commit()

  response = client.post('/login', json={'username': 'testuser', 'password': 'password'})
  assert response.status_code == 200
  assert 'access_token' in json.loads(response.data)

def test_add_user(client):
  response = client.post('/users', json={'username': 'newuser', 'email': 'newuser@example.com', 'password': 'password'})
  assert response.status_code == 201
  assert response.json['username'] == 'newuser'

def test_get_single_user(client):
  user = User(username='testuser', email='test@example.com', password='password')
  db.session.add(user)
  db.session.commit()

  access_token = create_access_token(identity='testuser')
  headers = {'Authorization': f'Bearer {access_token}'}

  response = client.get(f'/users/{user.id}', headers=headers)
  assert response.status_code == 200
  assert response.json['username'] == 'testuser'

def test_update_single_user(client):
  user = User(username='testuser', email='test@example.com', password='password')
  db.session.add(user)
  db.session.commit()

  access_token = create_access_token(identity='testuser')
  headers = {'Authorization': f'Bearer {access_token}'}

  response = client.put(f'/users/{user.id}', json={'email': 'updated@example.com'}, headers=headers)
  assert response.status_code == 200
  assert response.json['email'] == 'updated@example.com'

def test_delete_single_user(client):
  user = User(username='testuser', email='test@example.com', password='password')
  db.session.add(user)
  db.session.commit()

  access_token = create_access_token(identity='testuser')
  headers = {'Authorization': f'Bearer {access_token}'}

  response = client.delete(f'/users/{user.id}', headers=headers)
  assert response.status_code == 204

def test_get_single_user_no_jwt(client):
    response = client.get('/users/1')
    assert response.status_code == 401
    assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_update_single_user_no_jwt(client):
    response = client.put('/users/1', json={'username': 'new_username'})
    assert response.status_code == 401
    assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_delete_single_user_no_jwt(client):
    response = client.delete('/users/1')
    assert response.status_code == 401
    assert response.get_json() == {'msg': 'Missing Authorization Header'}

def get_headers_for_user(username):
    access_token = create_access_token(identity=username)
    return {'Authorization': f'Bearer {access_token}'}

def test_get_single_user_incorrect_identity(client):
    user1 = User(username='testuser1', email='test1@example.com', password='password')
    user2 = User(username='testuser2', email='test2@example.com', password='password')
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    headers = get_headers_for_user(user2.username)
    response = client.get('/users/1', headers=headers)
    assert response.status_code == 401
    assert response.get_json() == {'message': 'Unauthorized'}

def test_update_single_user_incorrect_identity(client):
    user1 = User(username='testuser1', email='test1@example.com', password='password')
    user2 = User(username='testuser2', email='test2@example.com', password='password')
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    headers = get_headers_for_user(user2.username)
    response = client.put('/users/1', json={'username': 'new_username'}, headers=headers)
    assert response.status_code == 401
    assert response.get_json() == {'message': 'Unauthorized'}

def test_delete_single_user_incorrect_identity(client):
    user1 = User(username='testuser1', email='test1@example.com', password='password')
    user2 = User(username='testuser2', email='test2@example.com', password='password')
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    headers = get_headers_for_user(user2.username)
    response = client.delete('/users/1', headers=headers)
    assert response.status_code == 401
    assert response.get_json() == {'message': 'Unauthorized'}