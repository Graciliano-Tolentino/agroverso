from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Carrega variáveis de ambiente do .env
load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Importa e registra rotas
    from app.routes.routes_blog import blog_bp
    from app.routes.routes_courses import courses_bp
    from app.routes.routes_certificates import certificates_bp
    from app.routes.routes_developers import developers_bp
    from app.routes.routes_budget import budget_bp
    from app.auth.routes_auth import auth_bp
    from app.admin.routes_admin import admin_bp

    app.register_blueprint(blog_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(certificates_bp)
    app.register_blueprint(developers_bp)
    app.register_blueprint(budget_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)

    return app
