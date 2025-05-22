// ===================================================================
// 📄 MarketplaceSection.jsx | Agroverso – Seção de Produtos em Destaque
// 📁 Diretório: src/components/
// 🎯 Finalidade:
//     Exibir uma vitrine responsiva com produtos simulados que representam
//     soluções sustentáveis com selo ESG, prontas para integração com API real.
// 🔧 Ação:
//     Verificação de estrutura semântica, exportação correta, preparo para fetch futuro.
// 🌱 Simulação atual com 3 produtos estáticos e imagem local.
// 🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ===================================================================
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const MarketplaceSection = () => {
  // Estado local para armazenar a lista de produtos do marketplace
  const [products, setProducts] = useState([]);

  // Efeito para carregar dados iniciais (estático por enquanto, futuramente via API)
  useEffect(() => {
    // Dados estáticos temporários para exibição; substituir por fetch em futura integração
    const staticProducts = [
      {
        id: 1,
        name: 'Produto 1 - Sensor de Solo',
        price: 'R$ 250,00',
        image: '/assets/images/produto1.jpg',  // caminho público corrigido
        status: 'Disponível',
        esg: 'Certificação ESG nível A'
      },
      {
        id: 2,
        name: 'Produto 2 - Drone Agrícola',
        price: 'R$ 1.750,00',
        image: '/assets/images/produto2.jpg',  // caminho público corrigido
        status: 'Em Estoque',
        esg: 'Baixa emissão de carbono'
      },
      {
        id: 3,
        name: 'Produto 3 - Irrigação Inteligente',
        price: 'R$ 890,00',
        image: '/assets/images/produto3.jpg',  // caminho público corrigido
        status: 'Disponível',
        esg: 'Economia de 30% de água'
      }
      // ... (produtos adicionais podem ser adicionados seguindo esta estrutura)
    ];
    setProducts(staticProducts);
  }, []);

  return (
    <section className="marketplace-section">
      {/* Título da seção do marketplace */}
      <h2 className="section-title">Conheça nosso Marketplace</h2>

      {/* Grade de produtos responsiva (1 coluna em mobile, até 3 colunas em desktop) */}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
export default MarketplaceSection;

// ===================================================================
// 🔚 Fim do Componente: MarketplaceSection.jsx
// 🛒 Vitrine modular com produtos ESG simulados (modo demo)
// 🧱 Estrutura pronta para integração com backend real via API REST ou GraphQL
// 🎯 Responsiva, acessível, e integrada com ProductCard reutilizável
// 🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
// 📆 Última atualização: 10/05/2025
// ===================================================================
