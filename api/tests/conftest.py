import pytest

from app import create_app, init_app
from app import db

@pytest.fixture(scope="function")
def client():
  app = create_app()
  app.config['TESTING'] = True
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
  init_app(app)
  with app.test_client() as client:
    with app.app_context():
      db.create_all()
      yield client
      db.session.close_all()
      db.drop_all()