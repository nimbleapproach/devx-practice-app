from app import db
from app.models import User, Transaction
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

def create_user(username, email, password):
  user = User(username=username, email=email, password=generate_password_hash(password))
  db.session.add(user)
  db.session.commit()
  return user

def create_transaction(user_id, amount, description):
  transaction = Transaction(user_id=user_id, amount=amount, description=description)
  db.session.add(transaction)
  db.session.commit()
  return transaction

def get_headers_for_user(username):
  access_token = create_access_token(identity=username)
  return {'Authorization': f'Bearer {access_token}'}

def test_create_transaction(client):
  user = create_user('testuser', 'test@example.com', 'password')
  headers = get_headers_for_user(user.username)
  response = client.post('/transactions', json={'user_id': user.id, 'amount': 100.0, 'description': 'Test transaction'}, headers=headers)
  assert response.status_code == 201
  assert response.json['amount'] == 100.0

def test_get_transaction(client):
  user = create_user('testuser', 'test@example.com', 'password')
  transaction = create_transaction(user.id, 100.0, 'Test transaction')
  headers = get_headers_for_user(user.username)
  response = client.get(f'/transactions/{transaction.id}', headers=headers)
  assert response.status_code == 200
  assert response.json['amount'] == 100.0

def test_update_transaction(client):
  user = create_user('testuser', 'test@example.com', 'password')
  transaction = create_transaction(user.id, 100.0, 'Test transaction')
  headers = get_headers_for_user(user.username)
  response = client.put(f'/transactions/{transaction.id}', json={'amount': 200.0}, headers=headers)
  assert response.status_code == 200
  assert response.json['amount'] == 200.0

def test_delete_transaction(client):
  user = create_user('testuser', 'test@example.com', 'password')
  transaction = create_transaction(user.id, 100.0, 'Test transaction')
  headers = get_headers_for_user(user.username)
  response = client.delete(f'/transactions/{transaction.id}', headers=headers)
  assert response.status_code == 204

def test_get_transactions_by_user(client):
  user = create_user('testuser', 'test@example.com', 'password')
  create_transaction(user.id, 100.0, 'Test transaction 1')
  create_transaction(user.id, 200.0, 'Test transaction 2')
  headers = get_headers_for_user(user.username)
  response = client.get(f'/transactions/user/{user.id}', headers=headers)
  assert response.status_code == 200
  assert len(response.json) == 2

def test_create_transaction_no_jwt(client):
  response = client.post('/transactions', json={'user_id': 1, 'amount': 100.0, 'description': 'Test transaction'})
  assert response.status_code == 401
  assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_get_transaction_no_jwt(client):
  response = client.get('/transactions/1')
  assert response.status_code == 401
  assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_update_transaction_no_jwt(client):
  response = client.put('/transactions/1', json={'amount': 200.0})
  assert response.status_code == 401
  assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_delete_transaction_no_jwt(client):
  response = client.delete('/transactions/1')
  assert response.status_code == 401
  assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_get_transactions_by_user_no_jwt(client):
  response = client.get('/transactions/user/1')
  assert response.status_code == 401
  assert response.get_json() == {'msg': 'Missing Authorization Header'}

def test_create_transaction_incorrect_identity(client):
  user1 = create_user('testuser1', 'test1@example.com', 'password')
  user2 = create_user('testuser2', 'test2@example.com', 'password')
  headers = get_headers_for_user(user2.username)
  response = client.post('/transactions', json={'user_id': user1.id, 'amount': 100.0, 'description': 'Test transaction'}, headers=headers)
  assert response.status_code == 401
  assert response.get_json() == {'message': 'Unauthorized'}

def test_get_transaction_incorrect_identity(client):
  user1 = create_user('testuser1', 'test1@example.com', 'password')
  user2 = create_user('testuser2', 'test2@example.com', 'password')
  transaction = create_transaction(user1.id, 100.0, 'Test transaction')
  headers = get_headers_for_user(user2.username)
  response = client.get(f'/transactions/{transaction.id}', headers=headers)
  assert response.status_code == 401
  assert response.get_json() == {'message': 'Unauthorized'}

def test_update_transaction_incorrect_identity(client):
  user1 = create_user('testuser1', 'test1@example.com', 'password')
  user2 = create_user('testuser2', 'test2@example.com', 'password')
  transaction = create_transaction(user1.id, 100.0, 'Test transaction')
  headers = get_headers_for_user(user2.username)
  response = client.put(f'/transactions/{transaction.id}', json={'amount': 200.0}, headers=headers)
  assert response.status_code == 401
  assert response.get_json() == {'message': 'Unauthorized'}

def test_delete_transaction_incorrect_identity(client):
  user1 = create_user('testuser1', 'test1@example.com', 'password')
  user2 = create_user('testuser2', 'test2@example.com', 'password')
  transaction = create_transaction(user1.id, 100.0, 'Test transaction')
  headers = get_headers_for_user(user2.username)
  response = client.delete(f'/transactions/{transaction.id}', headers=headers)
  assert response.status_code == 401
  assert response.get_json() == {'message': 'Unauthorized'}

def test_get_transactions_by_user_incorrect_identity(client):
  user1 = create_user('testuser1', 'test1@example.com', 'password')
  user2 = create_user('testuser2', 'test2@example.com', 'password')
  create_transaction(user1.id, 100.0, 'Test transaction 1')
  create_transaction(user1.id, 200.0, 'Test transaction 2')
  headers = get_headers_for_user(user2.username)
  response = client.get(f'/transactions/user/{user1.id}', headers=headers)
  assert response.status_code == 401
  assert response.get_json() == {'message': 'Unauthorized'}