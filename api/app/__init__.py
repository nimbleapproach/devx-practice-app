from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config

jwt = JWTManager()
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    from app.routes import user_routes, transaction_bp
    app.register_blueprint(user_routes)
    app.register_blueprint(transaction_bp)

    return app