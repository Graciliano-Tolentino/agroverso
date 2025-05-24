// =====================================================================================
// 📄 BlogSection.jsx | Agroverso – Seção de Publicações do Blog com Estética Institucional
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir artigos recentes com modularidade, acessibilidade, responsividade e tokens visuais.
//     • Compatível com dark mode, testes automatizados, internacionalização futura e animações sutis.
// =====================================================================================

import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next'; // preparado para i18n
// import PostCard from './PostCard'; // futuro

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);
  // const { t } = useTranslation();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                titulo: 'Novas Tecnologias no Campo',
                resumo: 'Saiba como a tecnologia está transformando a agricultura.',
              },
              {
                id: 2,
                titulo: 'Dicas de Plantio',
                resumo: 'Como melhorar sua colheita com técnicas simples.',
              },
            ]);
          }, 1000)
        );
        setPosts(data);
      } catch {
        setErro('Erro ao carregar postagens.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section
      className="py-16 bg-gray-50 dark:bg-gray-900 px-6"
      role="region"
      aria-labelledby="blog-titulo"
      data-testid="blog:section"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="blog-titulo"
          data-testid="blog:titulo"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center card-heading"
        >
          {/* {t('blog.titulo')} */}
          Últimas do Blog
        </h2>

        {isLoading && (
          <p
            className="text-center text-sm text-gray-600 dark:text-gray-300 animate-pulse"
            role="status"
            data-testid="blog:loading"
          >
            {/* {t('blog.carregando')} */}
            Carregando postagens...
          </p>
        )}

        {erro && (
          <p
            className="text-center text-sm text-red-600 dark:text-red-400"
            role="alert"
            data-testid="blog:erro"
          >
            {erro}
          </p>
        )}

        {!isLoading && !erro && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="blog:grid">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card-entity"
                role="article"
                tabIndex={0}
                aria-label={`Post: ${post.titulo}`}
                data-testid={`blog:post-${post.id}`}
              >
                <h3 className="card-heading">{post.titulo}</h3>
                <p className="mt-2 card-body">{post.resumo}</p>
                <div className="mt-4">
                  <button
                    className="action-button"
                    aria-label={`Ler mais sobre ${post.titulo}`}
                    onClick={() => console.log(`Acessar post ${post.id}`)}
                    data-testid={`blog:ler-${post.id}`}
                  >
                    Ler Mais
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

export default BlogSection;
