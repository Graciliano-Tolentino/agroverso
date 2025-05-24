/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/pages/SobrePage.jsx
  ✍️ Autor: Equipe Agroverso High Tech
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 11/05/2025
  📝 Descrição:
     Página institucional "Quem Somos" da plataforma Agroverso.
     Apresenta missão, visão, valores, equipe e parceiros do ecossistema.
     Desenvolvida com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';

/* Componente: SobrePage
 * Responsável por exibir as informações institucionais do Agroverso High Tech.
 * Estrutura semanticamente organizada, visual moderna, acessível e alinhada à identidade do projeto.
 */

function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sobre o Agroverso</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Missão</h2>
        <p>
          Promover a regeneração do planeta por meio da inovação no agronegócio, integrando tecnologias inteligentes,
          agricultura digital, energia limpa e práticas sustentáveis com propósito, acessibilidade e impacto social.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Visão</h2>
        <p>
          Ser um ecossistema referência global em soluções tecnológicas regenerativas, colocando a América do Sul como
          protagonista da nova revolução agroambiental, científica e ética.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Valores</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Inovação:</strong> tecnologia como instrumento de transformação do campo e da sociedade.</li>
          <li><strong>Sustentabilidade:</strong> compromisso com a vida, o solo, a água e as futuras gerações.</li>
          <li><strong>Sabedoria:</strong> valorização do conhecimento ancestral, científico e comunitário.</li>
          <li><strong>Força:</strong> resiliência diante dos desafios técnicos, sociais e ambientais.</li>
          <li><strong>Beleza:</strong> estética funcional, harmonia com a natureza e interfaces encantadoras.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Nossa Equipe</h2>
        <p>
          O Agroverso é desenvolvido por uma rede interdisciplinar de especialistas em software, agroecologia, energias
          renováveis, automação, inteligência artificial e inclusão digital. Unidos por um propósito maior, transformamos
          ideias em soluções que elevam o agro brasileiro ao mais alto nível tecnológico e ético.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Parceiros</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img src="/parceiros/logo1.png" alt="Parceiro 1" className="object-contain h-12" />
          <img src="/parceiros/logo2.png" alt="Parceiro 2" className="object-contain h-12" />
          {/* Adicione outros logos conforme necessário */}
        </div>
      </section>
    </div>
  );
}

export default SobrePage;

/*
  ============================================
  🔚 Fim do arquivo SobrePage.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos regenerados
  ============================================
*/
