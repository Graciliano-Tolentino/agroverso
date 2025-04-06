from flask import Blueprint, request, jsonify
from app import db
from app.models.usuario import Usuario

usuarios_bp = Blueprint('usuarios', __name__)

# GET /api/usuarios - listar todos os usuários
@usuarios_bp.route('/', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.order_by(Usuario.id.asc()).all()
    return jsonify([u.to_dict() for u in usuarios]), 200

# GET /api/usuarios/<id> - obter usuário específico
@usuarios_bp.route('/<int:id>', methods=['GET'])
def obter_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    return jsonify(usuario.to_dict()), 200

# POST /api/usuarios - criar novo usuário
@usuarios_bp.route('/', methods=['POST'])
def criar_usuario():
    data = request.get_json()

    novo_usuario = Usuario(
        nome=data.get('nome'),
        email=data.get('email'),
        senha=data.get('senha')  # idealmente com hash
    )

    db.session.add(novo_usuario)
    db.session.commit()
    return jsonify(novo_usuario.to_dict()), 201

# PUT /api/usuarios/<id> - atualizar usuário
@usuarios_bp.route('/<int:id>', methods=['PUT'])
def atualizar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    data = request.get_json()

    usuario.nome = data.get('nome', usuario.nome)
    usuario.email = data.get('email', usuario.email)
    usuario.senha = data.get('senha', usuario.senha)  # aplicar hash no futuro

    db.session.commit()
    return jsonify(usuario.to_dict()), 200

# DELETE /api/usuarios/<id> - deletar usuário
@usuarios_bp.route('/<int:id>', methods=['DELETE'])
def deletar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"message": "Usuário removido com sucesso."}), 200
