from app.models.courses import Course
from app.models.budgets import BudgetRequest
from app.models.certificates import Certificate
from app.models.blog import BlogPost
from app import db

def get_dashboard_metrics():
    """
    Retorna métricas consolidadas para o painel administrativo.
    """
    total_cursos = Course.query.count()
    total_orcamentos = BudgetRequest.query.count()
    total_certificados = Certificate.query.count()
    total_artigos = BlogPost.query.count()

    return {
        "cursos": total_cursos,
        "orcamentos": total_orcamentos,
        "certificados": total_certificados,
        "artigos": total_artigos
    }
