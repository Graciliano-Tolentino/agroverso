// 🔝 Navbar.jsx – Navegação Principal do Agroverso
import React, { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#marketplace', label: 'Marketplace' },
    { href: '#courses', label: 'Cursos' },
    { href: '#blog', label: 'Blog' },
    { href: '#community', label: 'Comunidade' },
    { href: '#contato', label: 'Contato' }
  ]

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🌿 Logo e nome */}
        <a href="/" className="flex items-center gap-2" aria-label="Página inicial Agroverso">
          <img src="/src/assets/images/logo_agroverso.png" alt="Logo Agroverso" className="h-8 w-auto" />
          <span className="text-greenRegenerative font-montserrat font-bold text-lg tracking-wide">Agroverso</span>
        </a>

        {/* 📱 Botão mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-grayIntelligent"
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 🖥️ Menu desktop */}
        <ul className="hidden md:flex gap-6 font-opensans text-sm text-grayIntelligent font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-greenRegenerative transition-colors duration-200">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 📱 Menu mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow">
          <ul className="flex flex-col items-center gap-4 py-4 text-sm font-opensans text-grayIntelligent">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-greenRegenerative transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
