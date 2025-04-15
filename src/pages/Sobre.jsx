// 🌿 Página Sobre – Identidade Regenerativa Agroverso
import React from 'react'

export default function Sobre() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 font-opensans text-grayIntelligent">
      <h2 className="text-3xl font-montserrat font-bold mb-6 text-center">
        Sobre o Agroverso
      </h2>

      <p className="text-center text-sm text-gray-600 mb-12 max-w-2xl mx-auto">
        O Agroverso é uma plataforma de tecnologias regenerativas que une sabedoria ancestral e inovação ética para transformar o futuro da agricultura no Brasil e no mundo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Missão */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">🌱 Missão</h3>
          <p className="text-sm leading-relaxed">
            Regenerar o campo e a cidade por meio de tecnologias acessíveis, conectando produtores, educadores e comunidades a soluções que respeitam a vida, os ciclos naturais e a justiça social.
          </p>
        </div>

        {/* Visão */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">🌎 Visão</h3>
          <p className="text-sm leading-relaxed">
            Ser referência em inovação agroecológica regenerativa, promovendo transformação ambiental, cultural e econômica a partir do conhecimento compartilhado.
          </p>
        </div>

        {/* Valores */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">✨ Valores</h3>
          <ul className="list-disc ml-5 text-sm leading-relaxed">
            <li>Ética e transparência em cada ação</li>
            <li>Respeito à sabedoria dos povos originários</li>
            <li>Sustentabilidade real, além do discurso</li>
            <li>Educação como caminho de transformação</li>
            <li>Inclusão social e justiça ecológica</li>
          </ul>
        </div>

        {/* Equipe */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-greenRegenerative mb-3">👥 Nossa Equipe</h3>
          <p className="text-sm leading-relaxed">
            O Agroverso é uma construção coletiva formada por educadores, desenvolvedores, agricultores, designers e pensadores regenerativos comprometidos com a ética, a técnica e a beleza.
          </p>
        </div>
      </div>

      {/* CTA institucional opcional */}
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
