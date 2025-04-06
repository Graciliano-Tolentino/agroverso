import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Agroverso</h2>
          <p className="text-sm text-gray-200">
            Agricultura inteligente, sustentável e autônoma.  
            Tecnologia a serviço do campo e da formação profissional.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Navegação</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Início</Link></li>
            <li><Link to="/cursos" className="hover:underline">Cursos</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/equipe" className="hover:underline">Equipe</Link></li>
            <li><Link to="/painel" className="hover:underline">Painel</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contato</h3>
          <p className="text-sm">
            Instituto Graciliana Maria da Conceição<br />
            Cotia - SP, Brasil<br />
            contato@agroverso.tec.br
          </p>
          <a
            href="https://wa.me/55XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-white text-green-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
          >
            Fale via WhatsApp
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 mt-10">
        &copy; {new Date().getFullYear()} Agroverso. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
