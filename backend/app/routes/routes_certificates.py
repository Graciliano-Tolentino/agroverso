from flask import Blueprint, request, jsonify
from app import db
from app.models.certificado import Certificate
from datetime import datetime
import uuid

certificates_bp = Blueprint('certificates', __name__)

# GET /api/certificates - listar todos os certificados
@certificates_bp.route('/', methods=['GET'])
def listar_certificados():
    certificados = Certificate.query.order_by(Certificate.data_conclusao.desc()).all()
    return jsonify([c.to_dict() for c in certificados]), 200

# GET /api/certificates/<id> - obter certificado específico
@certificates_bp.route('/<int:id>', methods=['GET'])
def obter_certificado(id):
    certificado = Certificate.query.get_or_404(id)
    return jsonify(certificado.to_dict()), 200

# POST /api/certificates - emitir novo certificado
@certificates_bp.route('/', methods=['POST'])
def emitir_certificado():
    data = request.get_json()

    # Geração de código único de validação
    codigo_validacao = str(uuid.uuid4()).replace("-", "")[:12].upper()

    novo = Certificate(
        nome_aluno=data.get('nome_aluno'),
        curso=data.get('curso'),
        carga_horaria=data.get('carga_horaria'),
        codigo_validacao=codigo_validacao,
        data_conclusao=datetime.utcnow()
    )

    db.session.add(novo)
    db.session.commit()
    return jsonify(novo.to_dict()), 201

# DELETE /api/certificates/<id> - excluir certificado
@certificates_bp.route('/<int:id>', methods=['DELETE'])
def deletar_certificado(id):
    certificado = Certificate.query.get_or_404(id)
    db.session.delete(certificado)
    db.session.commit()
    return jsonify({"message": "Certificado removido com sucesso."}), 200

# GET /api/certificates/validate/<codigo> - validar certificado
@certificates_bp.route('/validate/<string:codigo>', methods=['GET'])
def validar_certificado(codigo):
    certificado = Certificate.query.filter_by(codigo_validacao=codigo).first()
    if not certificado:
        return jsonify({"valid": False, "message": "Certificado não encontrado."}), 404
    return jsonify({"valid": True, "certificado": certificado.to_dict()}), 200
