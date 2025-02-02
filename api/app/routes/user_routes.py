from flask import Blueprint, request, jsonify
from app.services.user_service import create_user, get_user, update_user, delete_user, get_user_by_username
from app.services.auth_service import authenticate
from flask_jwt_extended import jwt_required, get_jwt_identity

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    jwt = authenticate(username, password)
    if not jwt:
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify(access_token=jwt), 200

@user_routes.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    user = create_user(**data)
    return jsonify(user.as_dict()), 201

@user_routes.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_single_user(user_id):
    user = get_user(user_id)
    current_user = get_jwt_identity()
    if user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    if user:
        return jsonify(user.as_dict()), 200
    return jsonify({'message': 'User not found'}), 404

@user_routes.route('/users/<string:username>', methods=['GET'])
@jwt_required()
def get_single_user_by_username(username):
    current_user = get_jwt_identity()
    if username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    user = get_user_by_username(username)
    if user:
        return jsonify(user.as_dict()), 200
    return jsonify({'message': 'User not found'}), 404

@user_routes.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_single_user(user_id):
    data = request.get_json()
    current_user = get_jwt_identity()
    user = get_user(user_id)
    if user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    user = update_user(user_id, **data)
    if user:
        return jsonify(user.as_dict()), 200
    return jsonify({'message': 'User not found'}), 404

@user_routes.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_single_user(user_id):
    current_user = get_jwt_identity()
    user = get_user(user_id)
    if user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    success = delete_user(user_id)
    if success:
        return jsonify({'message': 'User deleted'}), 204
    return jsonify({'message': 'User not found'}), 404
