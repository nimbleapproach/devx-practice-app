from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config
import structlog

jwt = JWTManager()
db = SQLAlchemy()


structlog.configure(
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso", key="ts"),
        structlog.processors.JSONRenderer(),
    ],
)

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    return app

def init_app(app):
    db.init_app(app)
    jwt.init_app(app)

    from app.routes import user_routes, transaction_bp
    app.register_blueprint(user_routes)
    app.register_blueprint(transaction_bp)

    return app