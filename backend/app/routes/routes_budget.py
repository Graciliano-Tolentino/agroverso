from flask import Blueprint, request, jsonify
from app import db
from app.models.orcamento import BudgetRequest
from datetime import datetime

budget_bp = Blueprint('budget', __name__)

# GET /api/budget - listar todos os orçamentos
@budget_bp.route('/', methods=['GET'])
def listar_orcamentos():
    orcamentos = BudgetRequest.query.order_by(BudgetRequest.data_envio.desc()).all()
    return jsonify([o.to_dict() for o in orcamentos]), 200

# GET /api/budget/<id> - obter orçamento específico
@budget_bp.route('/<int:id>', methods=['GET'])
def obter_orcamento(id):
    orcamento = BudgetRequest.query.get_or_404(id)
    return jsonify(orcamento.to_dict()), 200

# POST /api/budget - enviar novo orçamento
@budget_bp.route('/', methods=['POST'])
def enviar_orcamento():
    data = request.get_json()

    novo = BudgetRequest(
        nome=data.get('nome'),
        email=data.get('email'),
        telefone=data.get('telefone'),
        cidade=data.get('cidade'),
        estado=data.get('estado'),
        tipo_propriedade=data.get('tipo_propriedade'),
        area_total=data.get('area_total'),
        necessidades=data.get('necessidades'),
        data_envio=datetime.utcnow()
    )

    db.session.add(novo)
    db.session.commit()
    return jsonify(novo.to_dict()), 201

# DELETE /api/budget/<id> - remover orçamento
@budget_bp.route('/<int:id>', methods=['DELETE'])
def deletar_orcamento(id):
    orcamento = BudgetRequest.query.get_or_404(id)
    db.session.delete(orcamento)
    db.session.commit()
    return jsonify({"message": "Orçamento removido com sucesso."}), 200
