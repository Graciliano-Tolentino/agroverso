from app import db

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(120), nullable=False)
    descricao = db.Column(db.String(300), nullable=False)
    imagem = db.Column(db.String(255), nullable=False)
    carga_horaria = db.Column(db.Integer, nullable=False)
    conteudo = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descricao": self.descricao,
            "imagem": self.imagem,
            "carga_horaria": self.carga_horaria,
            "conteudo": self.conteudo,
        }
