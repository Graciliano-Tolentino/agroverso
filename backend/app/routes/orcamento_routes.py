from flask import Blueprint, request, jsonify
from app import db
from app.models.orcamento import Orcamento

orcamentos_bp = Blueprint('orcamentos', __name__)

# GET /api/budget - listar todos os orçamentos
@orcamentos_bp.route('/', methods=['GET'])
def listar_orcamentos():
    orcamentos = Orcamento.query.order_by(Orcamento.id.desc()).all()
    return jsonify([o.to_dict() for o in orcamentos]), 200

# GET /api/budget/<id> - obter orçamento por ID
@orcamentos_bp.route('/<int:id>', methods=['GET'])
def obter_orcamento(id):
    orcamento = Orcamento.query.get_or_404(id)
    return jsonify(orcamento.to_dict()), 200

# POST /api/budget - criar novo orçamento
@orcamentos_bp.route('/', methods=['POST'])
def criar_orcamento():
    data = request.get_json()

    novo_orcamento = Orcamento(
        nome=data.get('nome'),
        email=data.get('email'),
        telefone=data.get('telefone'),
        propriedade=data.get('propriedade'),
        localizacao=data.get('localizacao'),
        interesse=data.get('interesse'),
        observacoes=data.get('observacoes')
    )

    db.session.add(novo_orcamento)
    db.session.commit()
    return jsonify(novo_orcamento.to_dict()), 201

# DELETE /api/budget/<id> - excluir orçamento
@orcamentos_bp.route('/<int:id>', methods=['DELETE'])
def excluir_orcamento(id):
    orcamento = Orcamento.query.get_or_404(id)
    db.session.delete(orcamento)
    db.session.commit()
    return jsonify({"message": "Orçamento excluído com sucesso."}), 200
