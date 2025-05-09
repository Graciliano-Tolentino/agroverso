/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/Hero.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Seção heroica da home com missão institucional do Agroverso.
     Visual imersivo, acessibilidade aplicada e CTA com foco em conversão.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center bg-black"
      aria-label="Seção principal com missão institucional do Agroverso"
    >
      {/* 🌎 Imagem de fundo decorativa com acessibilidade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/images/hero_am_sul_invertida.png')" }}
      ></div>

      {/* 🔲 Overlay escuro para garantir contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* 🌟 Conteúdo central da hero */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-white text-4xl md:text-5xl font-montserrat font-bold leading-tight drop-shadow-md">
          Revolucionando o Agro Sustentável
        </h1>

        <p className="mt-4 text-white text-lg md:text-xl font-roboto leading-relaxed opacity-90 drop-shadow-sm">
          Tecnologia avançada conectada à sabedoria ancestral.
        </p>

        <a
          href="#marketplace"
          aria-label="Conheça as soluções tecnológicas oferecidas pelo Agroverso"
          className="mt-8 inline-block bg-greenRegenerative text-white font-semibold font-opensans px-8 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-greenRegenerative focus:ring-offset-2"
        >
          Conheça nossas soluções
        </a>
      </div>
    </section>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/components/Hero.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
