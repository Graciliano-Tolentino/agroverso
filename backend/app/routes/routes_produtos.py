from flask import Blueprint, request, jsonify
from app import db
from app.models.produto import Produto

produtos_bp = Blueprint('produtos', __name__)

# GET /api/produtos - listar todos os produtos
@produtos_bp.route('/', methods=['GET'])
def listar_produtos():
    produtos = Produto.query.order_by(Produto.id.asc()).all()
    return jsonify([p.to_dict() for p in produtos]), 200

# GET /api/produtos/<id> - obter produto específico
@produtos_bp.route('/<int:id>', methods=['GET'])
def obter_produto(id):
    produto = Produto.query.get_or_404(id)
    return jsonify(produto.to_dict()), 200

# POST /api/produtos - cadastrar novo produto
@produtos_bp.route('/', methods=['POST'])
def criar_produto():
    data = request.get_json()

    novo = Produto(
        titulo=data.get('titulo'),
        descricao=data.get('descricao'),
        imagem=data.get('imagem'),
        destaque=data.get('destaque', False)
    )

    db.session.add(novo)
    db.session.commit()
    return jsonify(novo.to_dict()), 201

# PUT /api/produtos/<id> - atualizar produto
@produtos_bp.route('/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    produto = Produto.query.get_or_404(id)
    data = request.get_json()

    produto.titulo = data.get('titulo', produto.titulo)
    produto.descricao = data.get('descricao', produto.descricao)
    produto.imagem = data.get('imagem', produto.imagem)
    produto.destaque = data.get('destaque', produto.destaque)

    db.session.commit()
    return jsonify(produto.to_dict()), 200

# DELETE /api/produtos/<id> - remover produto
@produtos_bp.route('/<int:id>', methods=['DELETE'])
def deletar_produto(id):
    produto = Produto.query.get_or_404(id)
    db.session.delete(produto)
    db.session.commit()
    return jsonify({"message": "Produto removido com sucesso."}), 200
