from flask import Blueprint, request, jsonify
from app import db
from app.models.curso import Curso

cursos_bp = Blueprint('cursos', __name__)

# GET /api/courses - listar todos os cursos
@cursos_bp.route('/', methods=['GET'])
def listar_cursos():
    cursos = Curso.query.order_by(Curso.id.asc()).all()
    return jsonify([c.to_dict() for c in cursos]), 200

# GET /api/courses/<id> - obter curso por ID
@cursos_bp.route('/<int:id>', methods=['GET'])
def obter_curso(id):
    curso = Curso.query.get_or_404(id)
    return jsonify(curso.to_dict()), 200

# POST /api/courses - criar novo curso
@cursos_bp.route('/', methods=['POST'])
def criar_curso():
    data = request.get_json()

    novo_curso = Curso(
        titulo=data.get('titulo'),
        descricao=data.get('descricao'),
        imagem=data.get('imagem'),
        cargaHoraria=data.get('cargaHoraria'),
        conteudo=data.get('conteudo')
    )

    db.session.add(novo_curso)
    db.session.commit()
    return jsonify(novo_curso.to_dict()), 201

# PUT /api/courses/<id> - atualizar curso existente
@cursos_bp.route('/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    curso = Curso.query.get_or_404(id)
    data = request.get_json()

    curso.titulo = data.get('titulo', curso.titulo)
    curso.descricao = data.get('descricao', curso.descricao)
    curso.imagem = data.get('imagem', curso.imagem)
    curso.cargaHoraria = data.get('cargaHoraria', curso.cargaHoraria)
    curso.conteudo = data.get('conteudo', curso.conteudo)

    db.session.commit()
    return jsonify(curso.to_dict()), 200

# DELETE /api/courses/<id> - excluir curso
@cursos_bp.route('/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    curso = Curso.query.get_or_404(id)
    db.session.delete(curso)
    db.session.commit()
    return jsonify({"message": "Curso excluído com sucesso."}), 200
