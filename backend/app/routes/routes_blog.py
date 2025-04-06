from flask import Blueprint, request, jsonify
from app import db
from app.models.artigo import BlogPost

blog_bp = Blueprint('blog', __name__)

# GET /api/blog - listar todos os artigos
@blog_bp.route('/', methods=['GET'])
def listar_artigos():
    artigos = BlogPost.query.order_by(BlogPost.data_publicacao.desc()).all()
    return jsonify([a.to_dict() for a in artigos]), 200

# GET /api/blog/<id> - obter artigo específico
@blog_bp.route('/<int:id>', methods=['GET'])
def obter_artigo(id):
    artigo = BlogPost.query.get_or_404(id)
    return jsonify(artigo.to_dict()), 200

# POST /api/blog - criar novo artigo
@blog_bp.route('/', methods=['POST'])
def criar_artigo():
    data = request.get_json()
    novo = BlogPost(
        titulo=data.get('titulo'),
        imagem=data.get('imagem'),
        resumo=data.get('resumo'),
        conteudo=data.get('conteudo')
    )
    db.session.add(novo)
    db.session.commit()
    return jsonify(novo.to_dict()), 201

# PUT /api/blog/<id> - atualizar artigo
@blog_bp.route('/<int:id>', methods=['PUT'])
def atualizar_artigo(id):
    artigo = BlogPost.query.get_or_404(id)
    data = request.get_json()
    artigo.titulo = data.get('titulo', artigo.titulo)
    artigo.imagem = data.get('imagem', artigo.imagem)
    artigo.resumo = data.get('resumo', artigo.resumo)
    artigo.conteudo = data.get('conteudo', artigo.conteudo)
    db.session.commit()
    return jsonify(artigo.to_dict()), 200

# DELETE /api/blog/<id> - excluir artigo
@blog_bp.route('/<int:id>', methods=['DELETE'])
def deletar_artigo(id):
    artigo = BlogPost.query.get_or_404(id)
    db.session.delete(artigo)
    db.session.commit()
    return jsonify({"message": "Artigo excluído com sucesso."}), 200
