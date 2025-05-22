/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/layout/Footer.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 08/05/2025
  📝 Descrição:
     Rodapé institucional do Agroverso.
     Organizado por seções (Marketplace, Cursos, Blog, Comunidade, Sobre, Contato).
     Contém links funcionais, design responsivo e acessibilidade.
     Desenvolvido com sabedoria, força e beleza – padrão Agroverso High Tech.
  ============================================
*/

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="bg-gray-50 dark:bg-gray-900 text-grayIntelligent dark:text-gray-200 pt-12 pb-6 px-6 border-t border-gray-200 dark:border-gray-700 mt-20"
      role="contentinfo"
      aria-label="Rodapé institucional"
    >
      {/* 📌 Sitemap institucional */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm font-opensans">
        {/* 🔗 Marketplace */}
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Marketplace</h3>
          <ul className="space-y-2">
            <li><a href="#marketplace" className="footer-link">Produtos</a></li>
            <li><a href="#categorias" className="footer-link">Categorias</a></li>
            <li><a href="#esg" className="footer-link">Ofertas ESG</a></li>
          </ul>
        </div>

        {/* 🔗 Cursos */}
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Cursos</h3>
          <ul className="space-y-2">
            <li><Link to="/certificados" className="footer-link">Certificados</Link></li>
            <li><a href="#cursos" className="footer-link">Vídeos</a></li>
          </ul>
        </div>

        {/* 🔗 Blog */}
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Blog</h3>
          <ul className="space-y-2">
            <li><a href="#blog" className="footer-link">Artigos</a></li>
            <li><a href="#categorias-blog" className="footer-link">Temas</a></li>
          </ul>
        </div>
        {/* 🔗 Comunidade */}
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Comunidade</h3>
          <ul className="space-y-2">
            <li><a href="#community" className="footer-link">Depoimentos</a></li>
            <li><a href="#eventos" className="footer-link">Eventos</a></li>
          </ul>
        </div>

        {/* 🔗 Sobre */}
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Sobre</h3>
          <ul className="space-y-2">
            <li><Link to="/sobre" className="footer-link">Quem Somos</Link></li>
            <li><a href="#parceiros" className="footer-link">Parceiros</a></li>
          </ul>
        </div>

        {/* 🔗 Contato */}
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Contato</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://wa.me/5511963372373"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conversar pelo WhatsApp"
                className="footer-link"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <Link
                to="/contato"
                className="footer-link"
                aria-label="Página de contato institucional"
              >
                Página de Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Divider visual */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

      {/* 🔻 Rodapé inferior institucional */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-2 text-xs text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Agroverso. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <Link to="/termos-de-uso" className="footer-link">Termos de Uso</Link>
          <Link to="/politica-de-privacidade" className="footer-link">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/components/layout/Footer.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
