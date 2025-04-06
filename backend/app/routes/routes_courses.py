from flask import Blueprint, request, jsonify
from app import db
from app.models.curso import Course

courses_bp = Blueprint('courses', __name__)

# GET /api/courses - listar todos os cursos
@courses_bp.route('/', methods=['GET'])
def listar_cursos():
    cursos = Course.query.all()
    return jsonify([c.to_dict() for c in cursos]), 200

# GET /api/courses/<id> - obter curso específico
@courses_bp.route('/<int:id>', methods=['GET'])
def obter_curso(id):
    curso = Course.query.get_or_404(id)
    return jsonify(curso.to_dict()), 200

# POST /api/courses - criar novo curso
@courses_bp.route('/', methods=['POST'])
def criar_curso():
    data = request.get_json()
    novo = Course(
        titulo=data.get('titulo'),
        descricao=data.get('descricao'),
        imagem=data.get('imagem'),
        carga_horaria=data.get('carga_horaria'),
        conteudo=data.get('conteudo')
    )
    db.session.add(novo)
    db.session.commit()
    return jsonify(novo.to_dict()), 201

# PUT /api/courses/<id> - atualizar curso
@courses_bp.route('/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    curso = Course.query.get_or_404(id)
    data = request.get_json()
    curso.titulo = data.get('titulo', curso.titulo)
    curso.descricao = data.get('descricao', curso.descricao)
    curso.imagem = data.get('imagem', curso.imagem)
    curso.carga_horaria = data.get('carga_horaria', curso.carga_horaria)
    curso.conteudo = data.get('conteudo', curso.conteudo)
    db.session.commit()
    return jsonify(curso.to_dict()), 200

# DELETE /api/courses/<id> - excluir curso
@courses_bp.route('/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    curso = Course.query.get_or_404(id)
    db.session.delete(curso)
    db.session.commit()
    return jsonify({"message": "Curso excluído com sucesso."}), 200
