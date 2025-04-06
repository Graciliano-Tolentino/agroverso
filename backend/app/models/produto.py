from app import db

class Produto(db.Model):
    __tablename__ = 'produtos'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(120), nullable=False)
    descricao = db.Column(db.String(300), nullable=False)
    imagem = db.Column(db.String(255), nullable=False)
    destaque = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descricao": self.descricao,
            "imagem": self.imagem,
            "destaque": self.destaque,
        }
