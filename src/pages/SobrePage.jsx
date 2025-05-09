/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/pages/SobrePage.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 08/05/2025
  📝 Descrição:
     Página institucional “Quem Somos” do Agroverso.
     Apresenta missão, visão, valores e equipe do projeto.
     Estilizada e documentada com sabedoria, força e beleza – padrão Agroverso High Tech.
  ============================================
*/

import React from 'react';
import { Link } from 'react-router-dom';

export default function SobrePage() {
  return (
    <section
      className="max-w-5xl mx-auto px-6 py-20 font-opensans text-grayIntelligent dark:text-gray-100"
      aria-labelledby="titulo-sobre"
    >
      <h2
        id="titulo-sobre"
        className="text-3xl font-bold font-montserrat text-center mb-6"
      >
        Sobre o Agroverso
      </h2>

      <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        O <strong>Agroverso</strong> é um ecossistema de tecnologias regenerativas que conecta
        saberes ancestrais, inovação acessível e soluções sustentáveis para transformar
        o futuro da agricultura brasileira com sabedoria, força e beleza.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {/* 🌱 Missão */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">
            🌱 Missão
          </h3>
          <p className="text-sm leading-relaxed">
            Regenerar o campo e a cidade com tecnologias acessíveis e inclusivas, conectando
            pessoas, saberes e territórios com respeito à vida, à natureza e à justiça social.
          </p>
        </div>

        {/* 🌍 Visão */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">
            🌍 Visão
          </h3>
          <p className="text-sm leading-relaxed">
            Ser referência global em inovação agroecológica regenerativa, valorizando as raízes,
            impulsionando a soberania alimentar e fortalecendo comunidades.
          </p>
        </div>

        {/* ✨ Valores */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">
            ✨ Valores
          </h3>
          <ul className="list-disc ml-5 text-sm leading-relaxed">
            <li>Ética, verdade e transparência</li>
            <li>Respeito à sabedoria dos povos originários</li>
            <li>Compromisso com sustentabilidade real</li>
            <li>Educação como transformação profunda</li>
            <li>Inclusão, justiça ecológica e responsabilidade social</li>
          </ul>
        </div>

        {/* 👥 Nossa Equipe */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">
            👥 Nossa Equipe
          </h3>
          <p className="text-sm leading-relaxed">
            O Agroverso é desenvolvido por educadores, agricultores, tecnólogos, designers
            e ativistas que acreditam em um futuro regenerativo, baseado em ciência,
            ancestralidade e cooperação.
          </p>
        </div>
      </div>
      {/* 📞 Chamada para ação institucional */}
      <div className="mt-16 text-center">
        <Link
          to="/contato"
          className="inline-block bg-greenRegenerative text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-green-600 transition-all duration-200"
        >
          Fale com o Agroverso
        </Link>
      </div>

      {/* 🤝 Parcerias futuras (estrutura opcional) */}
      {/*
      <div className="mt-20 text-center">
        <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-4">
          🤝 Parcerias e Apoios
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          O Agroverso conta com o apoio de instituições, empresas e pessoas comprometidas com um futuro regenerativo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <img src="/parceiros/logo1.png" alt="Parceiro 1" className="h-12" loading="lazy" />
          <img src="/parceiros/logo2.png" alt="Parceiro 2" className="h-12" loading="lazy" />
          <!-- Adicionar mais parceiros conforme necessário -->
        </div>
      </div>
      */}
    </section>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/pages/SobrePage.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
