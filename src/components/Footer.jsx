export default function Footer() {
  return (
    <footer className="bg-gray-50 text-grayIntelligent pt-12 pb-6 px-6 border-t border-gray-200 mt-20">
      {/* Sitemap em colunas */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm font-opensans">
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Marketplace</h3>
          <ul className="space-y-2">
            <li><a href="#marketplace" className="footer-link">Produtos Populares</a></li>
            <li><a href="#categorias" className="footer-link">Categorias</a></li>
            <li><a href="#esg" className="footer-link">Ofertas ESG</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Cursos</h3>
          <ul className="space-y-2">
            <li><a href="#courses" className="footer-link">Cursos Disponíveis</a></li>
            <li><a href="#certificados" className="footer-link">Certificados</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Blog</h3>
          <ul className="space-y-2">
            <li><a href="#blog" className="footer-link">Últimos Artigos</a></li>
            <li><a href="#categorias-blog" className="footer-link">Mais Lidos</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Comunidade</h3>
          <ul className="space-y-2">
            <li><a href="#community" className="footer-link">Depoimentos</a></li>
            <li><a href="#eventos" className="footer-link">Eventos</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Sobre Nós</h3>
          <ul className="space-y-2">
            <li><a href="#quem-somos" className="footer-link">Quem Somos</a></li>
            <li><a href="#parceiros" className="footer-link">Parceiros</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-greenRegenerative font-bold mb-3 font-montserrat">Contato</h3>
          <ul className="space-y-2">
            <li><a href="https://wa.me/5511963372373" className="footer-link" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href="mailto:contato@agroverso.com" className="footer-link">E-mail</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Rodapé inferior */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-2 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Agroverso. Todos os direitos reservados.</p>

        {/* Links legais */}
        <div className="flex items-center gap-4">
          <a href="/termos-de-uso" className="footer-link">Termos de Uso</a>
          <a href="/politica-de-privacidade-lgpd" className="footer-link">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
