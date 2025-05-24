/*
  ===================================================================
  📄 DefaultLayout.jsx | Agroverso – Layout Institucional Padrão
  📁 Diretório: src/components/layout/
  🎯 Finalidade:
      Estruturar todas as páginas públicas da aplicação Agroverso com
      cabeçalho (Header), conteúdo principal (Outlet) e rodapé (Footer),
      garantindo consistência visual, acessibilidade e responsividade.
  🔧 Correção aplicada:
      Corrigido import de `Footer` para refletir o caminho real na mesma pasta.
      Verificado que `Header` e `Footer` não estão duplicados em nenhuma página.
  🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
  ===================================================================
*/
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; // ✅ Correção aplicada: import relativo à mesma pasta

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
  ===================================================================
  🔚 Fim do Componente: DefaultLayout.jsx
  🧱 Layout base das páginas públicas, com Header, Outlet e Footer
  🔧 Corrigido import do Footer para './Footer' (pasta local)
  ♿ Estrutura acessível, responsiva e adaptada ao modo escuro
  🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
  📆 Última atualização: 10/05/2025
  ===================================================================
*/
