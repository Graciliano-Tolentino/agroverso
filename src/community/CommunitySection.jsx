// =====================================================================================
// 📄 CommunitySection.jsx | Agroverso – Seção da Comunidade com Identidade Institucional
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir membros com acessibilidade, modularidade, testabilidade e integração futura de API.
//     • Compatível com dark mode, design tokens, animação e internacionalização.
// =====================================================================================

import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next'; // i18n futuro
// import MemberCard from './MemberCard'; // modularização futura

const CommunitySection = () => {
  const [membros, setMembros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const data = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              { id: 1, nome: 'João', bio: 'Produtor rural há 20 anos' },
              { id: 2, nome: 'Maria', bio: 'Especialista em agronomia' },
            ]);
          }, 1000)
        );
        setMembros(data);
      } catch {
        setErro('Erro ao carregar membros da comunidade.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembros();
  }, []);

  return (
    <section
      className="py-16 px-6 bg-gray-50 dark:bg-gray-900"
      role="region"
      aria-labelledby="comunidade-titulo"
      data-testid="comunidade:section"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="comunidade-titulo"
          data-testid="comunidade:titulo"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center card-heading"
        >
          Comunidade Agroverso
        </h2>

        {isLoading && (
          <p
            className="text-center text-sm text-gray-600 dark:text-gray-400 animate-pulse"
            role="status"
            data-testid="comunidade:loading"
          >
            Carregando membros da comunidade...
          </p>
        )}

        {erro && (
          <p
            className="text-center text-sm text-red-600 dark:text-red-400"
            role="alert"
            data-testid="comunidade:erro"
          >
            {erro}
          </p>
        )}

        {!isLoading && !erro && (
          <div
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            data-testid="comunidade:grid"
          >
            {membros.map((membro) => (
              <div
                key={membro.id}
                role="group"
                aria-label={`Perfil de ${membro.nome}`}
                tabIndex={0}
                className="card-entity focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 transition-all"
                data-testid={`comunidade:membro-${membro.id}`}
              >
                <h3 className="card-heading">{membro.nome}</h3>
                <p className="mt-2 card-body">{membro.bio}</p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="action-button"
                    aria-label={`Ver perfil de ${membro.nome}`}
                    onClick={() => console.log(`Ver perfil de ${membro.nome}`)}
                    data-testid={`comunidade:botao-${membro.id}`}
                  >
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunitySection;
