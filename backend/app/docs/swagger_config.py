import os
from dotenv import load_dotenv

load_dotenv()

def swagger_template():
    return {
        "swagger": "2.0",
        "info": {
            "title": "API Agroverso",
            "description": "Documentação interativa da API Agroverso.",
            "version": "1.0.0",
            "contact": {
                "name": os.getenv("AUTHOR_NAME", "Graciliano Tolentino"),
                "email": os.getenv("AUTHOR_EMAIL", "contato@agroverso.tec.br"),
                "url": os.getenv("PROJECT_URL", "https://agroverso.tec.br")
            }
        },
        "schemes": ["https"],
        "basePath": "/",
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header",
                "description": "Autenticação via token JWT. Use o formato: Bearer {seu_token}"
            }
        }
    }
