from flask import Blueprint, request, jsonify
from app.models import Transaction
from app import db
from app.services.user_service import get_user
from flask_jwt_extended import jwt_required, get_jwt_identity

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    data = request.get_json()
    current_user = get_jwt_identity()
    transaction_user = get_user(data['user_id'])
    if transaction_user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    new_transaction = Transaction(**data)
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(new_transaction.as_dict()), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['GET'])
@jwt_required()
def get_transaction(transaction_id):
    transaction = Transaction.query.get_or_404(transaction_id)
    current_user = get_jwt_identity()
    if transaction.user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify(transaction.as_dict()), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['PUT'])
@jwt_required()
def update_transaction(transaction_id):
    data = request.get_json()
    transaction = Transaction.query.get_or_404(transaction_id)
    current_user = get_jwt_identity()
    if transaction.user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    for key, value in data.items():
        setattr(transaction, key, value)
    db.session.commit()
    return jsonify(transaction.as_dict()), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(transaction_id):
    transaction = Transaction.query.get_or_404(transaction_id)
    current_user = get_jwt_identity()
    if transaction.user.username != current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction deleted'}), 204

@transaction_bp.route('/transactions/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_transactions_by_user(user_id):
    current_user = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    if any(transaction.user.username != current_user for transaction in transactions):
        return jsonify({'message': 'Unauthorized'}), 401
    return jsonify([transaction.as_dict() for transaction in transactions]), 200