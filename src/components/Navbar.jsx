import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo institucional */}
        <a href="/" className="flex items-center gap-2" aria-label="Página inicial Agroverso">
          <img
            src="/src/assets/images/logo_agroverso.png"
            alt="Logo Agroverso"
            className="h-10 w-auto"
          />
          <span className="text-greenRegenerative font-montserrat font-bold text-lg tracking-wide">
            Agroverso
          </span>
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-8 font-opensans text-grayIntelligent text-sm font-medium">
          <li><a href="#marketplace" className="hover:text-greenRegenerative transition-colors">Marketplace</a></li>
          <li><a href="#courses" className="hover:text-greenRegenerative transition-colors">Cursos</a></li>
          <li><a href="#blog" className="hover:text-greenRegenerative transition-colors">Blog</a></li>
          <li><a href="#community" className="hover:text-greenRegenerative transition-colors">Comunidade</a></li>
          <li><a href="#profile" className="hover:text-greenRegenerative transition-colors">Perfil / Login</a></li>
        </ul>

        {/* Botão Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Abrir ou fechar menu"
        >
          <svg className="w-6 h-6 fill-grayIntelligent" viewBox="0 0 24 24">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <ul className="flex flex-col items-center gap-4 py-4 font-opensans text-grayIntelligent text-sm font-medium">
            <li><a href="#marketplace" className="hover:text-greenRegenerative" onClick={() => setMenuOpen(false)}>Marketplace</a></li>
            <li><a href="#courses" className="hover:text-greenRegenerative" onClick={() => setMenuOpen(false)}>Cursos</a></li>
            <li><a href="#blog" className="hover:text-greenRegenerative" onClick={() => setMenuOpen(false)}>Blog</a></li>
            <li><a href="#community" className="hover:text-greenRegenerative" onClick={() => setMenuOpen(false)}>Comunidade</a></li>
            <li><a href="#profile" className="hover:text-greenRegenerative" onClick={() => setMenuOpen(false)}>Perfil / Login</a></li>
          </ul>
        </div>
      )}
    </header>
  )
}
