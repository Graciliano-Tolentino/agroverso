from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flasgger import Swagger
from dotenv import load_dotenv
import os

# Inicialização global do SQLAlchemy e Migrate
db = SQLAlchemy()
migrate = Migrate()

# Carrega variáveis do .env
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configurações principais
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'super-secret-key')
    app.config['SWAGGER'] = {
        'title': 'Agroverso API',
        'uiversion': 3
    }

    # Inicializa extensões
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    Swagger(app)

    # Registro de rotas da aplicação
    from app.routes import register_routes
    register_routes(app)

    return app
