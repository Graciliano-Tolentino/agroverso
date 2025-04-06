from app import db
from datetime import datetime

class BudgetRequest(db.Model):
    __tablename__ = 'budget_requests'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    telefone = db.Column(db.String(30), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(2), nullable=False)
    tipo_propriedade = db.Column(db.String(100), nullable=True)
    area_total = db.Column(db.String(50), nullable=True)
    necessidades = db.Column(db.Text, nullable=True)
    data_envio = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "telefone": self.telefone,
            "cidade": self.cidade,
            "estado": self.estado,
            "tipo_propriedade": self.tipo_propriedade,
            "area_total": self.area_total,
            "necessidades": self.necessidades,
            "data_envio": self.data_envio.strftime("%d/%m/%Y %H:%M"),
        }
