from flask import Flask

# Importa os blueprints
from app.routes.usuario_routes import usuarios_bp
from app.routes.orcamento_routes import orcamentos_bp
from app.routes.curso_routes import cursos_bp
from app.routes.certificado_routes import certificados_bp
from app.routes.artigo_routes import artigos_bp
from app.routes.produto_routes import produtos_bp
from app.routes.desenvolvedor_routes import desenvolvedores_bp

def register_routes(app: Flask):
    app.register_blueprint(usuarios_bp, url_prefix='/api/usuarios')
    app.register_blueprint(orcamentos_bp, url_prefix='/api/budget')
    app.register_blueprint(cursos_bp, url_prefix='/api/courses')
    app.register_blueprint(certificados_bp, url_prefix='/api/certificates')
    app.register_blueprint(artigos_bp, url_prefix='/api/blog')
    app.register_blueprint(produtos_bp, url_prefix='/api/produtos')
    app.register_blueprint(desenvolvedores_bp, url_prefix='/api/developers')
