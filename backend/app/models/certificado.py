from app import db
from datetime import datetime

class Certificate(db.Model):
    __tablename__ = 'certificates'

    id = db.Column(db.Integer, primary_key=True)
    nome_aluno = db.Column(db.String(120), nullable=False)
    curso = db.Column(db.String(120), nullable=False)
    carga_horaria = db.Column(db.Integer, nullable=False)
    data_conclusao = db.Column(db.DateTime, default=datetime.utcnow)
    codigo_validacao = db.Column(db.String(64), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome_aluno": self.nome_aluno,
            "curso": self.curso,
            "carga_horaria": self.carga_horaria,
            "data_conclusao": self.data_conclusao.strftime("%d/%m/%Y"),
            "codigo_validacao": self.codigo_validacao
        }
