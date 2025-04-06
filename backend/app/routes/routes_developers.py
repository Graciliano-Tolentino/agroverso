from flask import Blueprint, request, jsonify
from app import db
from app.models.desenvolvedor import Developer

developers_bp = Blueprint('developers', __name__)

# GET /api/developers - listar todos os desenvolvedores
@developers_bp.route('/', methods=['GET'])
def listar_desenvolvedores():
    devs = Developer.query.order_by(Developer.id.asc()).all()
    return jsonify([d.to_dict() for d in devs]), 200

# GET /api/developers/<id> - obter desenvolvedor específico
@developers_bp.route('/<int:id>', methods=['GET'])
def obter_desenvolvedor(id):
    dev = Developer.query.get_or_404(id)
    return jsonify(dev.to_dict()), 200

# POST /api/developers - cadastrar novo desenvolvedor
@developers_bp.route('/', methods=['POST'])
def criar_desenvolvedor():
    data = request.get_json()

    novo = Developer(
        nome=data.get('nome'),
        foto=data.get('foto'),
        cargo=data.get('cargo'),
        linkedin=data.get('linkedin'),
        biografia=data.get('biografia')
    )

    db.session.add(novo)
    db.session.commit()
    return jsonify(novo.to_dict()), 201

# PUT /api/developers/<id> - atualizar desenvolvedor
@developers_bp.route('/<int:id>', methods=['PUT'])
def atualizar_desenvolvedor(id):
    dev = Developer.query.get_or_404(id)
    data = request.get_json()

    dev.nome = data.get('nome', dev.nome)
    dev.foto = data.get('foto', dev.foto)
    dev.cargo = data.get('cargo
