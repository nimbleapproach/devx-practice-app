from flask import Blueprint

# Initialize the Blueprint for routes
api = Blueprint('api', __name__)

# Import routes to register them with the Blueprint
from .user_routes import *
from .transaction_routes import *

# Register the Blueprint with the main application in app/__init__.py