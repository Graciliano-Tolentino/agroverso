from flask.cli import FlaskGroup
from app import create_app, db
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

app = create_app()
cli = FlaskGroup(app)
migrate = Migrate(app, db)

if __name__ == "__main__":
    cli()
