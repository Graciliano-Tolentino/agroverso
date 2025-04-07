from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
from dotenv import load_dotenv

from app.auth import auth_bp
from app import db
from app.models.users import User

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "chave-padrao-insegura")

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

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

    usuario = User.query.filter_by(email=email).first()

    if not usuario or not check_password_hash(usuario.senha, senha):
        return jsonify({"success": False, "message": "Credenciais inválidas."}), 401

    token = jwt.encode(
        {
            "user_id": usuario.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=4)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "success": True,
        "token": token,
        "usuario": {"id": usuario.id, "nome": usuario.nome, "email": usuario.email}
    }), 200
