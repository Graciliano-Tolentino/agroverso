from flask import Blueprint, request, jsonify
from app import db
from app.models.certificado import Certificado

certificados_bp = Blueprint('certificados', __name__)

# GET /api/certificates - listar todos os certificados emitidos
@certificados_bp.route('/', methods=['GET'])
def listar_certificados():
    certificados = Certificado.query.order_by(Certificado.id.desc()).all()
    return jsonify([c.to_dict() for c in certificados]), 200

# GET /api/certificates/<id> - obter certificado por ID
@certificados_bp.route('/<int:id>', methods=['GET'])
def obter_certificado(id):
    certificado = Certificado.query.get_or_404(id)
    return jsonify(certificado.to_dict()), 200

# POST /api/certificates - emitir novo certificado
@certificados_bp.route('/', methods=['POST'])
def emitir_certificado():
    data = request.get_json()

    novo_certificado = Certificado(
        nomeAluno=data.get('nomeAluno'),
        curso=data.get('curso'),
        cargaHoraria=data.get('cargaHoraria')
    )

    db.session.add(novo_certificado)
    db.session.commit()
    return jsonify(novo_certificado.to_dict()), 201

# DELETE /api/certificates/<id> - excluir certificado
@certificados_bp.route('/<int:id>', methods=['DELETE'])
def excluir_certificado(id):
    certificado = Certificado.query.get_or_404(id)
    db.session.delete(certificado)
    db.session.commit()
    return jsonify({"message": "Certificado removido com sucesso."}), 200
