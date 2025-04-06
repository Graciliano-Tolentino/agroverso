from app import db
from datetime import datetime

class BlogPost(db.Model):
    __tablename__ = 'blog_posts'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(120), nullable=False)
    imagem = db.Column(db.String(255), nullable=False)
    resumo = db.Column(db.String(300), nullable=False)
    conteudo = db.Column(db.Text, nullable=False)
    data_publicacao = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "imagem": self.imagem,
            "resumo": self.resumo,
            "conteudo": self.conteudo,
            "data_publicacao": self.data_publicacao.strftime("%d/%m/%Y"),
        }
