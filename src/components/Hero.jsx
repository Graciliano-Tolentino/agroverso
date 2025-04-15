// 🌱 Hero.jsx – Seção de Entrada Institucional do Agroverso
import React from 'react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/images/hero_am_sul_invertida.png')"
      }}
      aria-label="Seção principal com missão do Agroverso"
    >
      {/* 🔲 Overlay escuro para contraste e profundidade */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* 🌟 Conteúdo central */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-white text-4xl md:text-5xl font-montserrat font-bold leading-tight drop-shadow-md">
          Revolucionando o Agro Sustentável
        </h1>

        <p className="mt-4 text-white text-lg md:text-xl font-roboto leading-relaxed drop-shadow-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Tecnologia avançada conectada à sabedoria ancestral.
        </p>

        <a
          href="#marketplace"
          aria-label="Conheça nossas soluções disponíveis no Agroverso"
          className="mt-8 inline-block bg-greenRegenerative text-white font-semibold font-opensans px-8 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-greenRegenerative focus:ring-offset-2"
        >
          Conheça nossas soluções
        </a>
      </div>
    </section>
  )
}
