import jwt
import datetime
from flask import request, jsonify
from functools import wraps

# Idealmente carregado via variável de ambiente
SECRET_KEY = "agroverso-secreto"

def gerar_token(usuario_id, exp_horas=4):
    """
    Gera um token JWT com validade definida.
    """
    payload = {
        'user_id': usuario_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=exp_horas)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


def verificar_token(f):
    """
    Decorator que verifica se o token JWT é válido.
    """
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({"success": False, "message": "Token ausente"}), 401

        try:
            dados = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = dados['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Token inválido"}), 401

        return f(*args, **kwargs)
    
    return wrapper
