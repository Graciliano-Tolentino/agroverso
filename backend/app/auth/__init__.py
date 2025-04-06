from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

from app.auth import routes_auth  # importa as rotas para registrar no blueprint
