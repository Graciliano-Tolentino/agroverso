/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/layout/Header.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente de cabeçalho da aplicação Agroverso.
     Integra logotipo, navegação principal e botão de tema.
     Acessível, responsivo e alinhado ao padrão high tech.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import logo from '/src/assets/images/logo_agroverso.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
    { href: '/certificados', label: 'Certificados' }
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        role="navigation"
        aria-label="Navegação principal do site Agroverso"
      >
        {/* 🌿 Logotipo Agroverso */}
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-greenRegenerative"
          aria-label="Página inicial do Agroverso"
        >
          <img
            src={logo}
            alt="Logotipo do Agroverso"
            className="h-8 w-auto"
          />
          <span className="text-greenRegenerative font-montserrat font-bold text-lg tracking-wide">
            Agroverso
          </span>
        </Link>

        {/* ☀️🌒 Alternância de tema + Menu mobile */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* 📱 Botão de menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-grayIntelligent dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-greenRegenerative"
            aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 🖥️ Menu desktop */}
        <ul className="hidden md:flex gap-6 font-opensans text-sm text-grayIntelligent dark:text-gray-200 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-greenRegenerative rounded ${
                  location.pathname === link.href
                    ? 'text-greenRegenerative underline underline-offset-4'
                    : 'hover:text-greenRegenerative'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 📱 Menu mobile dropdown */}
      {menuOpen && (
        <div
          id="menu-mobile"
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow"
          role="menu"
          aria-label="Menu de navegação para dispositivos móveis"
        >
          <ul className="flex flex-col items-center gap-4 py-4 text-sm font-opensans text-grayIntelligent dark:text-gray-200">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`transition-colors focus:outline-none focus:ring-2 focus:ring-greenRegenerative rounded ${
                    location.pathname === link.href
                      ? 'text-greenRegenerative underline underline-offset-4'
                      : 'hover:text-greenRegenerative'
                  }`}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/components/layout/Header.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
