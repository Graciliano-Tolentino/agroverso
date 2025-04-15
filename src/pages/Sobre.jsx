// 🌍 Sobre.jsx – Quem Somos no Agroverso
import React from 'react'

export default function Sobre() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 font-opensans text-grayIntelligent">
      <h2 className="text-3xl font-montserrat font-bold mb-6 text-center">
        Sobre o Agroverso
      </h2>

      <p className="text-center text-sm text-gray-600 mb-12 max-w-2xl mx-auto">
        O Agroverso é um ecossistema de tecnologias regenerativas que conecta saberes ancestrais, soluções sustentáveis e inovação acessível para transformar o futuro da agricultura brasileira.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Missão */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">🌱 Missão</h3>
          <p className="text-sm leading-relaxed">
            Regenerar o campo e a cidade por meio de tecnologias acessíveis e inclusivas, conectando pessoas, saberes e territórios com respeito à vida, à natureza e à justiça social.
          </p>
        </div>

        {/* Visão */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">🌍 Visão</h3>
          <p className="text-sm leading-relaxed">
            Ser referência global em inovação agroecológica regenerativa, valorizando as raízes, impulsionando a soberania alimentar e fortalecendo comunidades.
          </p>
        </div>

        {/* Valores */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">✨ Valores</h3>
          <ul className="list-disc ml-5 text-sm leading-relaxed">
            <li>Ética, verdade e transparência</li>
            <li>Respeito à sabedoria dos povos originários</li>
            <li>Compromisso com sustentabilidade real</li>
            <li>Educação como transformação profunda</li>
            <li>Inclusão, justiça ecológica e responsabilidade social</li>
          </ul>
        </div>

        {/* Equipe */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">👥 Nossa Equipe</h3>
          <p className="text-sm leading-relaxed">
            O Agroverso é desenvolvido por educadores, agricultores, tecnólogos, designers e ativistas que acreditam em um futuro regenerativo, baseado em cooperação, ciência e ancestralidade.
          </p>
        </div>
      </div>

      {/* CTA institucional */}
      <div className="mt-12 text-center">
        <a
          href="/contato"
          className="inline-block bg-greenRegenerative text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-green-600 transition-all duration-200"
        >
          Fale com o Agroverso
        </a>
      </div>
    </section>
  )
}
