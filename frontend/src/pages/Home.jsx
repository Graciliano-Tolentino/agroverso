import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-gray-800 bg-white">
      {/* HERO */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-green-100 to-green-200">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">🌱 Bem-vindo ao Agroverso</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Soluções inteligentes para o campo — conecte sua produção com o futuro.
        </p>
        <Link to="/produtos">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition">
            Explorar Soluções
          </button>
        </Link>
      </section>

      {/* PRODUTOS */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-8">🌿 Nossos Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card 
            title="Irrigação Inteligente"
            img="/static/img/irrigacao.png"
            desc="Automatize sua plantação com sensores e economia de água."
            link="/produtos"
          />
          <Card 
            title="Hidroponia Urbana"
            img="/static/img/hidroponia.png"
            desc="Plante em ambientes pequenos com tecnologia e sustentabilidade."
            link="/produtos"
          />
          <Card 
            title="Energia Fotovoltaica"
            img="/static/img/solar.png"
            desc="Transforme luz solar em economia e autonomia energética."
            link="/produtos"
          />
        </div>
      </section>

      {/* CURSOS */}
      <section className="py-12 px-6 bg-green-50 text-center">
        <h2 className="text-3xl font-semibold mb-8">🎓 Cursos Gratuitos</h2>
        <p className="mb-8 text-gray-700 max-w-3xl mx-auto">
          Capacite-se com nossos cursos online e receba certificados digitais automaticamente.
        </p>
        <Link to="/cursos">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition">
            Ver Cursos Disponíveis
          </button>
        </Link>
      </section>

      {/* SOBRE */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">🔍 Sobre o Agroverso</h2>
        <p className="text-gray-700 max-w-4xl mx-auto mb-6">
          Somos uma iniciativa dedicada a transformar a agricultura com tecnologia acessível,
          capacitação gratuita e sustentabilidade real. Nossa missão é democratizar a inovação no campo.
        </p>
        <Link to="/sobre">
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-2 rounded">
            Conheça nossa história
          </button>
        </Link>
      </section>

      {/* AÇÕES RÁPIDAS */}
      <section className="py-12 px-6 bg-green-100 text-center">
        <h2 className="text-2xl font-semibold mb-6">🚀 Comece agora mesmo</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/orcamentos">
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl">
              Solicitar Orçamento
            </button>
          </Link>
          <Link to="/certificados">
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl">
              Validar Certificado
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Componente interno reutilizável
const Card = ({ title, img, desc, link }) => (
  <Link to={link}>
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 text-left">
      <img src={img} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </Link>
);

export default HomePage;
