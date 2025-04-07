from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
import datetime
import os
from dotenv import load_dotenv

from app.auth import auth_bp
from app import db
from app.models.users import User

# Carrega variáveis do .env com segurança
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "chave-padrao-insegura")

def gerar_token(usuario_id, exp_horas=4):
    """
    Gera um token JWT com tempo de expiração configurável.
    """
    payload = {
        "user_id": usuario_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=exp_horas)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def verificar_token(f):
    """
    Decorator para proteger rotas com verificação JWT.
    """
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split(" ")
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]

        if not token:
            return jsonify({"success": False, "message": "Token ausente"}), 401

        try:
            dados = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = dados["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Token inválido"}), 401

        return f(*args, **kwargs)
    return wrapper

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    if not nome or not email or not senha:
        return jsonify({"success": False, "message": "Todos os campos são obrigatórios."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "message": "E-mail já cadastrado."}), 409

    hashed_password = generate_password_hash(senha)
    novo_usuario = User(nome=nome, email=email, senha=hashed_password)

    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({"success": True, "message": "Usuário registrado com sucesso."}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"success": False, "message": "E-mail e senha são obrigatórios."}), 400

    usuario = User.query.filter_by(email=email).first()

    if not usuario or not check_password_hash(usuario.senha, senha):
        return jsonify({"success": False, "message": "Credenciais inválidas."}), 401

    token = gerar_token(usuario.id)

    return jsonify({
        "success": True,
        "token": token,
        "usuario": usuario.to_dict()
    }), 200

@auth_bp.route('/protegido', methods=['GET'])
@verificar_token
def rota_protegida():
    return jsonify({
        "success": True,
        "message": "Acesso autorizado.",
        "user_id": request.user_id
    })
