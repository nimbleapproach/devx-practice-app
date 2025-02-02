from werkzeug.security import generate_password_hash

from app.models import User, db

def create_user(username, email, password):
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_user(user_id):
    return User.query.get(user_id)

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

def update_user(user_id, username=None, email=None, password=None):
    user = User.query.get(user_id)
    if user:
        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            user.password = password
        db.session.commit()
    return user

def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
    return user