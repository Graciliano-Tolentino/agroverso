/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/layout/DefaultLayout.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Estrutura padrão de layout para páginas da aplicação Agroverso.
     Renderiza Header, conteúdo principal (via Outlet) e Footer.
     Suporta tema escuro, responsividade e acessibilidade semântica.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '../Footer';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* 🔝 Cabeçalho institucional */}
      <Header />
      {/* 📄 Conteúdo principal da página */}
      <main
        id="main"
        role="main"
        aria-label="Conteúdo principal da página"
        className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8"
      >
        <Outlet />
      </main>

      {/* 🔻 Rodapé fixo e ético */}
      <Footer />
    </div>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/components/layout/DefaultLayout.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
