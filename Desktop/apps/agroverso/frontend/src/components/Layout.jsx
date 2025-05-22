/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/Layout.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente de layout geral da aplicação Agroverso,
     responsável por renderizar a barra de navegação (topo),
     o conteúdo das rotas internas (Outlet) e o rodapé (base).
     Fornece um container centralizado, responsivo e aplica
     suporte ao tema claro/escuro conforme preferência do usuário.
     Estruturado com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Componente funcional de layout que encapsula Navbar, conteúdo principal e Footer
const Layout = () => {
  return (
    // Flex container para dispor Navbar, conteúdo e Footer em coluna
    <div className="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 🔝 Barra de navegação no topo da página */}
      <Navbar />

      {/* 📑 Conteúdo principal (rotas internas) */}
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* 🎬 FUTURO: suporte a transições de página com Framer Motion */}
        {/* Exemplo: envolver <Outlet /> com <AnimatePresence> e <motion.div> */}
        {/* 📌 Ponto de saída das rotas internas do React Router */}
        <Outlet />
      </main>

      {/* 🔻 Rodapé fixado na base da página */}
      <Footer />
    </div>
  );
};

export default Layout;

/*
  ============================================
  🔚 Fim do arquivo src/components/Layout.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
