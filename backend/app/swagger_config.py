from flasgger import Swagger

def configurar_swagger(app):
    """
    Aplica a configuração do Swagger à instância do Flask.
    """
    Swagger(app, template={
        "swagger": "2.0",
        "info": {
            "title": "API Agroverso",
            "description": "Documentação da API oficial do Agroverso - Agricultura Inteligente e Sustentável.",
            "version": "1.0.0",
            "contact": {
                "name": "Graciliano Tolentino",
                "email": "contato@agroverso.tec.br",
                "url": "https://agroverso.tec.br"
            },
        },
        "host": "localhost:5000",  # Pode ser substituído por domínio em produção
        "basePath": "/api",
        "schemes": ["http"],
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header",
                "description": "Prefixe com 'Bearer ' + token JWT"
            }
        }
    })
