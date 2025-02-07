import os

db_endpoint = os.getenv('API_DB_ENDPOINT', 'localhost')
db_port = os.getenv('API_DB_PORT', 5432)
db_password = os.getenv('API_DB_PASSWORD', 'mysecretpassword') 

class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql://postgres:{db_password}@{db_endpoint}:{db_port}/app_database'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'mkSAgSsA!YLom4r5&SPN3SC2'
    DEBUG = True