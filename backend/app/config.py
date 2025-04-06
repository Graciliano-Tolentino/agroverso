import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'agroverso-secreto')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///agroverso.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS = False
    CORS_HEADERS = 'Content-Type'
