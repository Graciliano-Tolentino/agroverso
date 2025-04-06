# 🌱 Agroverso – Agricultura Inteligente, Sustentável e Autônoma

O Agroverso é uma plataforma full-stack dedicada à transformação digital do campo, oferecendo soluções tecnológicas como irrigação inteligente, hidroponia automatizada e energia fotovoltaica adaptada à agricultura. Além disso, capacita profissionais com cursos gratuitos e emissão automática de certificados digitais.

## 🚀 Objetivos do Projeto

- Democratizar o acesso à tecnologia agrícola
- Criar uma reserva de mercado com mão de obra qualificada
- Oferecer cursos gratuitos com certificação automática
- Gerar orçamentos personalizados para propriedades rurais e urbanas
- Integrar comunicação com clientes via chatbot (WhatsApp)
- Consolidar autoridade institucional no setor agro

## 🧰 Tecnologias Utilizadas

### Backend
- Python 3.11+
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- PostgreSQL
- JWT (JSON Web Token)
- Swagger / OpenAPI
- PDF / QR Code (certificados)

### Frontend
- React
- Tailwind CSS
- Axios
- Estrutura modular (Clean Code + SOLID)

## 📁 Estrutura do Projeto

agroverso/
├── backend/
│   ├── app/
│   ├── run.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md

## ✅ Funcionalidades Implementadas

- Página inicial com produtos destacados
- Missão, Visão e Valores institucionais
- Cursos com emissão de certificado automático
- Certificados com QR Code de validação
- Formulário de orçamento inteligente
- Blog com artigos técnicos
- Desenvolvedores com perfil individual
- Chatbot via WhatsApp
- Autenticação JWT (usuários e admins)
- Painel administrativo com CMS
- API RESTful com documentação Swagger

## 📦 Como Executar

### Backend
cd backend  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  
flask db upgrade  
flask run

### Frontend
cd frontend  
npm install  
npm run dev

## 🌐 Documentação da API

http://localhost:5000/docs

## 📃 Licença

Projeto educacional, institucional e comercial controlado por Graciliano Tolentino e pelo Instituto Graciliana Maria da Conceição. Todos os direitos reservados.

## 👤 Autor

**Graciliano Tolentino**  
Desenvolvedor, educador, escritor e idealizador do Agroverso.  
[www.gracilianotolentino.org](http://www.gracilianotolentino.org)
