import os
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')
