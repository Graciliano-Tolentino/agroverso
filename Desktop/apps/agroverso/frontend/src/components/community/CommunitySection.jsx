// =====================================================================================
// 📄 CommunitySection.jsx | Agroverso – Seção de Membros da Comunidade
// =====================================================================================
// 🎯 Finalidade:
//     • Apresentar membros da comunidade com clareza visual, semântica, acessibilidade e rastreabilidade.
//     • Pronto para consumo de API, documentação em Storybook e testes automatizados.
// =====================================================================================

import React, { useEffect, useState } from 'react';

const CommunitySection = () => {
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    // 🧪 Simulação de chamada de API
    setTimeout(() => {
      setMembros([
        { id: 1, nome: 'Joana Mendes', cargo: 'Produtora Orgânica', bio: 'Atua com certificação agroecológica em Minas Gerais.' },
        { id: 2, nome: 'Carlos Silva', cargo: 'Pesquisador AgroDigital', bio: 'Desenvolve soluções com IA para o campo.' },
      ]);
    }, 800);
  }, []);

  return (
    <section
      aria-labelledby="titulo-comunidade"
      className="bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="titulo-comunidade"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          Comunidade Agroverso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {membros.map((membro) => (
            <div
              key={membro.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-green-500"
              tabIndex={0}
              role="group"
              aria-label={`Perfil de ${membro.nome}`}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {membro.nome}
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                {membro.cargo}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {membro.bio}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                  aria-label={`Ver perfil de ${membro.nome}`}
                  onClick={() => alert(`Perfil de ${membro.nome}`)}
                >
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
