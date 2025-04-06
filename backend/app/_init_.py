from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Inicializa a extensão de banco de dados
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configurações principais
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///agroverso.db'  # pode ser trocado por PostgreSQL depois
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Habilita CORS
    CORS(app)

    # Inicializa as extensões
    db.init_app(app)

    # Importação e registro dos blueprints
    from app.routes.courses import courses_bp
    from app.routes.certificates import certificates_bp
    from app.routes.blog import blog_bp
    from app.routes.budget import budget_bp

    app.register_blueprint(courses_bp, url_prefix='/api/courses')
    app.register_blueprint(certificates_bp, url_prefix='/api/certificates')
    app.register_blueprint(blog_bp, url_prefix='/api/blog')
    app.register_blueprint(budget_bp, url_prefix='/api/budget')

    return app
