from app import db

class Developer(db.Model):
    __tablename__ = 'developers'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    foto = db.Column(db.String(255), nullable=False)
    cargo = db.Column(db.String(100), nullable=False)
    linkedin = db.Column(db.String(255), nullable=True)
    biografia = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "foto": self.foto,
            "cargo": self.cargo,
            "linkedin": self.linkedin,
            "biografia": self.biografia,
        }
