/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/pages/HomePage.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 08/05/2025
  📝 Descrição:
     Página inicial oficial da plataforma Agroverso.
     Apresenta Hero e as principais seções: Marketplace, Cursos, Blog, Comunidade.
     Totalmente responsiva, acessível, escalável e preparada para dados reais.
     Desenvolvida com sabedoria, força e beleza – padrão Agroverso High Tech.
  ============================================
*/

import React from 'react';

// 🌿 Seções principais da Home
import Hero from '../components/Hero';
import ProductSection from '../components/sections/ProductSection';
import CoursesSection from '../components/sections/CoursesSection';
import BlogSection from '../components/sections/BlogSection';
import CommunitySection from '../components/sections/CommunitySection';

// 🎨 Elementos institucionais e de ação
import Button from '../components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />

      <main className="flex flex-col gap-20">
        {/* 🛒 Seção: Produtos em Destaque */}
        <section
          id="marketplace"
          aria-labelledby="titulo-marketplace"
          className="px-6 py-16 bg-white dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2
              id="titulo-marketplace"
              className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white"
            >
              Produtos em Destaque
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tecnologias regenerativas e soluções sustentáveis para transformar o agro.
            </p>
          </div>
          <ProductSection />
        </section>
        {/* 🎓 Seção: Cursos Agroverso */}
        <section
          id="courses"
          aria-labelledby="titulo-cursos"
          className="px-6 py-16 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2
              id="titulo-cursos"
              className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white"
            >
              Cursos e Formação Regenerativa
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Capacite-se para o agro do futuro com nossos conteúdos transformadores.
            </p>
          </div>
          <CoursesSection />
          <div className="mt-10 text-center">
            <Button variant="primary">Explorar todos os cursos</Button>
          </div>
        </section>
        {/* 📰 Seção: Blog Agroverso */}
        <section
          id="blog"
          aria-labelledby="titulo-blog"
          className="px-6 py-16 bg-white dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2
              id="titulo-blog"
              className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white"
            >
              Artigos e Notícias
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Atualizações sobre o agro regenerativo, inovação tecnológica e histórias inspiradoras.
            </p>
          </div>
          <BlogSection />
          <div className="mt-10 text-center">
            <Button variant="outline">Ver todos os artigos</Button>
          </div>
        </section>
        {/* 🤝 Seção: Comunidade Agroverso */}
        <section
          id="community"
          aria-labelledby="titulo-comunidade"
          className="px-6 py-16 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2
              id="titulo-comunidade"
              className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white"
            >
              Comunidade Agroverso
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Depoimentos, eventos e conexões vivas com quem cultiva o futuro regenerativo.
            </p>
          </div>
          <CommunitySection />
          <div className="mt-10 text-center">
            <Button variant="primary">Junte-se a nós</Button>
          </div>
        </section>
      </main>
    </>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/pages/HomePage.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
