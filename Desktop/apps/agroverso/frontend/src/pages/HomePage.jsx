/*
  ===================================================================
  📄 HomePage.jsx | Agroverso – Página Inicial da Plataforma (v3.0)
  📁 Diretório: src/pages/
  🎯 Finalidade:
      • Modularidade declarativa com lazy loading acessível
      • UX suave com animação condicional por acessibilidade
      • Importações absolutas para máxima legibilidade e robustez

  🌟 Desenvolvido com sabedoria, força e beleza – Agroverso 12/10
  ===================================================================
*/

import React, { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getDefaultTransition } from '@/utils/animations';

// ✅ Importações atualizadas com base em alias
import Hero from '@/components/common/Hero';
import CoursesSection from '@/components/education/CoursesSection';
import CommunitySection from '@/components/community/CommunitySection';
import Button from '@/components/ui/Button';

// ✅ Lazy loading otimizado
const MarketplaceSection = lazy(() => import('@/components/marketplace/MarketplaceSection'));
const BlogSection = lazy(() => import('@/components/blog/BlogSection'));

// 🧪 Dados simulados para exibição temporária
const produtosMock = [
  { id: 1, name: 'Estufa automatizada', price: 'R$1200' },
  { id: 2, name: 'Controlador climático', price: 'R$850' },
];

const blogMock = [
  { id: 1, title: 'Agro regenerativo é real', date: '2025-05-01' },
  { id: 2, title: 'Biotecnologia e fertilidade', date: '2025-04-28' },
];

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const animation = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 };

  return (
    <>
      {/* 🌄 Seção Hero */}
      <Hero />

      <main className="flex flex-col gap-20">

        {/* 🛒 Produtos em Destaque */}
        <motion.section
          id="marketplace"
          aria-labelledby="titulo-marketplace"
          initial={animation}
          whileInView={{ opacity: 1, y: 0 }}
          transition={getDefaultTransition(0)}
          viewport={{ once: true }}
          className="px-6 py-16 bg-white dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2 id="titulo-marketplace" className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white">
              Produtos em Destaque
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tecnologias regenerativas e soluções sustentáveis para transformar o agro.
            </p>
          </div>

          <Suspense fallback={
            <div role="status" aria-live="polite" className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-md dark:bg-gray-700" />
              ))}
            </div>
          }>
            <MarketplaceSection products={produtosMock} />
          </Suspense>
        </motion.section>

        {/* 🎓 Cursos Agroverso */}
        <motion.section
          id="courses"
          aria-labelledby="titulo-cursos"
          initial={animation}
          whileInView={{ opacity: 1, y: 0 }}
          transition={getDefaultTransition(0.1)}
          viewport={{ once: true }}
          className="px-6 py-16 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2 id="titulo-cursos" className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white">
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
        </motion.section>

        {/* 📰 Blog Agroverso */}
        <motion.section
          id="blog"
          aria-labelledby="titulo-blog"
          initial={animation}
          whileInView={{ opacity: 1, y: 0 }}
          transition={getDefaultTransition(0.15)}
          viewport={{ once: true }}
          className="px-6 py-16 bg-white dark:bg-gray-900"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2 id="titulo-blog" className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white">
              Artigos e Notícias
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Atualizações sobre o agro regenerativo, inovação tecnológica e histórias inspiradoras.
            </p>
          </div>
          <Suspense fallback={
            <div role="status" aria-live="polite" className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-md dark:bg-gray-700" />
              ))}
            </div>
          }>
            <BlogSection posts={blogMock} />
          </Suspense>
          <div className="mt-10 text-center">
            <Button variant="outline">Ver todos os artigos</Button>
          </div>
        </motion.section>

        {/* 🤝 Comunidade Agroverso */}
        <motion.section
          id="community"
          aria-labelledby="titulo-comunidade"
          initial={animation}
          whileInView={{ opacity: 1, y: 0 }}
          transition={getDefaultTransition(0.2)}
          viewport={{ once: true }}
          className="px-6 py-16 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2 id="titulo-comunidade" className="text-3xl font-bold font-montserrat text-gray-800 dark:text-white">
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
        </motion.section>
      </main>
    </>
  );
}
