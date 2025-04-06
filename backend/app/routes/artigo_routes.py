from flask import Blueprint, request, jsonify
from app import db
from app.models.artigo import Artigo

artigos_bp = Blueprint('artigos', __name__)

# GET /api/blog - listar todos os artigos
@artigos_bp.route('/', methods=['GET'])
def listar_artigos():
    artigos = Artigo.query.order_by(Artigo.id.desc()).all()
    return jsonify([a.to_dict() for a in artigos]), 200

# GET /api/blog/<id> - obter artigo por ID
@artigos_bp.route('/<int:id>', methods=['GET'])
def obter_artigo(id):
    artigo = Artigo.query.get_or_404(id)
    return jsonify(artigo.to_dict()), 200

# POST /api/blog - criar novo artigo
@artigos_bp.route('/', methods=['POST'])
def criar_artigo():
    data = request.get_json()

    novo_artigo = Artigo(
        titulo=data.get('titulo'),
        imagem=data.get('imagem'),
        resumo=data.get('resumo'),
        conteudo=data.get('conteudo'),
        dataPublicacao=data.get('dataPublicacao')
    )

    db.session.add(novo_artigo)
    db.session.commit()
    return jsonify(novo_artigo.to_dict()), 201

# PUT /api/blog/<id> - atualizar artigo
@artigos_bp.route('/<int:id>', methods=['PUT'])
def atualizar_artigo(id):
    artigo = Artigo.query.get_or_404(id)
    data = request.get_json()

    artigo.titulo = data.get('titulo', artigo.titulo)
    artigo.imagem = data.get('imagem', artigo.imagem)
    artigo.resumo = data.get('resumo', artigo.resumo)
    artigo.conteudo = data.get('conteudo', artigo.conteudo)
    artigo.dataPublicacao = data.get('dataPublicacao', artigo.dataPublicacao)

    db.session.commit()
    return jsonify(artigo.to_dict()), 200

# DELETE /api/blog/<id> - excluir artigo
@artigos_bp.route('/<int:id>', methods=['DELETE'])
def excluir_artigo(id):
    artigo = Artigo.query.get_or_404(id)
    db.session.delete(artigo)
    db.session.commit()
    return jsonify({"message": "Artigo removido com sucesso."}), 200
