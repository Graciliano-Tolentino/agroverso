// ===================================================================
// 📄 NotFoundPage.jsx | Agroverso – Página Não Encontrada (404)
// 📁 Diretório: src/pages/
// 🎯 Finalidade:
//     Informar ao usuário que a rota acessada não foi encontrada,
//     mantendo a identidade visual do Agroverso e oferecendo retorno
//     amigável à navegação principal.
// 🧭 Justificativa:
//     Renomeado de 404.jsx para NotFoundPage.jsx, promovendo padrão
//     consistente com as demais páginas e evitando ambiguidade técnica.
// 🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ===================================================================

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <img
          src="/assets/images/logo_agroverso.png"
          alt="Logotipo da Agroverso"
          className="w-20 mx-auto"
          loading="eager"
        />
        <h1 className="text-4xl text-greenRegenerative font-montserrat mt-4">
          404 - Página não encontrada
        </h1>
        <p className="text-gray-700 font-opensans mt-2 mb-6">
          Desculpe, a página que você procura não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-block bg-greenRegenerative text-white font-opensans font-semibold py-2 px-4 rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-greenRegenerative focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Voltar à Página Inicial
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;

// ===================================================================
// 🔚 Fim do Componente: NotFoundPage.jsx
// 🚫 Página 404 com retorno visual elegante e acessível
// 🧭 Navegação orientada de volta à página inicial
// 🗂️ Refatorado e renomeado para padronização e legibilidade
// 🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
// 📆 Última atualização: 10/05/2025
// ===================================================================
