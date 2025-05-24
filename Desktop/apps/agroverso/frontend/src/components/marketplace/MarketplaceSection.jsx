// =====================================================================================
// 📄 MarketplaceSection.jsx | Agroverso – Seção de Produtos com Acessibilidade Total
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir produtos com foco em acessibilidade, modularidade, responsividade e expansão API.
//     • Compatível com tokens visuais, dark mode, animações e i18n.
// =====================================================================================

import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { getProdutos } from '@/services/marketplaceService';
// import ProductCard from './ProductCard';

const MarketplaceSection = () => {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(null);
  // const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const dados = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              { id: 1, nome: 'Trator', descricao: 'Trator modelo X', preco: 'R$ 100.000' },
              { id: 2, nome: 'Sementes Orgânicas', descricao: 'Pacote de sementes diversas', preco: 'R$ 50' },
            ]);
          }, 1000)
        );
        setProdutos(dados);
      } catch {
        setErro('Erro ao carregar produtos.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section
      aria-labelledby="titulo-mercado"
      role="region"
      data-testid="mercado:section"
      className="py-16 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="titulo-mercado"
          data-testid="mercado:titulo"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          Mercado Agroverso
        </h2>
        {isLoading && (
          <p
            className="text-center text-sm text-gray-600 dark:text-gray-300 animate-pulse"
            role="status"
            data-testid="mercado:loading"
          >
            Carregando produtos...
          </p>
        )}

        {erro && (
          <p
            className="text-center text-sm text-red-600 dark:text-red-400"
            role="alert"
            data-testid="mercado:erro"
          >
            {erro}
          </p>
        )}

        {!isLoading && !erro && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="mercado:grid"
          >
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="card-product focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 transition-all"
                role="group"
                tabIndex={0}
                aria-label={`Produto: ${produto.nome}`}
                data-testid={`mercado:produto-${produto.id}`}
              >
                <h3 className="card-heading">{produto.nome}</h3>
                <p className="card-body mt-2">{produto.descricao}</p>
                <p className="card-price mt-2">{produto.preco}</p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="action-button"
                    onClick={() => console.log(`Comprar: ${produto.nome}`)}
                    aria-label={`Comprar ${produto.nome}`}
                    data-testid={`mercado:comprar-${produto.id}`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    Comprar
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

export default MarketplaceSection;
