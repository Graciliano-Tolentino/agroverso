// 🛒 MarketplaceSection.jsx – Produtos Populares com Selo ESG
import React, { useEffect, useState } from 'react'
import ProductCard from '@components/ProductCard'

export default function MarketplaceSection() {
  const [products, setProducts] = useState([])

  // Simulação de produtos (pode ser substituído por fetch futuramente)
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Café Orgânico Sul Mineiro',
        price: 42.9,
        image: '/src/assets/images/produto_cafe.jpg',
        status: 'disponível',
        esg: true,
      },
      {
        id: 2,
        name: 'Hidroponia Inteligente p/ Hortas',
        price: 189.0,
        image: '/src/assets/images/produto_hidroponia.jpg',
        status: 'últimas unidades',
        esg: true,
      },
      {
        id: 3,
        name: 'Composto de Laranja Sustentável',
        price: 12.5,
        image: '/src/assets/images/produto_laranja.jpg',
        status: 'esgotado',
        esg: true,
      }
    ])
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2
        id="marketplace-title"
        className="text-3xl font-montserrat font-bold text-grayIntelligent mb-10 text-center"
      >
        Produtos em Destaque
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  )
}
