from flask_jwt_extended import create_access_token, get_jwt_identity
from werkzeug.security import check_password_hash
from app.services.user_service import get_user_by_username

def generate_token(identity):
    return create_access_token(identity=identity)

def verify_password(plain_password, hashed_password):
    return check_password_hash(hashed_password, plain_password)

def authenticate(username, password):
    user = get_user_by_username(username)
    if user and verify_password(password, user.password):
        return generate_token(identity=user.username)
    return None

def get_current_user():
    return get_jwt_identity()