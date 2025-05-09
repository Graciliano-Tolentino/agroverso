/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/ProductCard.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente de card de produto individual, com selo ESG,
     imagem, nome, preço e status com acessibilidade aprimorada.
     Totalmente navegável via teclado e compatível com leitores de tela.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react'

export default function ProductCard({ data }) {
  const { name, price, image, status, esg } = data

  const statusColor = {
    'disponível': 'bg-greenRegenerative',
    'últimas unidades': 'bg-yellow-400',
    'esgotado': 'bg-red-500'
  }

  return (
    <div
      className="relative bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-greenRegenerative"
      tabIndex="0"
      role="group"
      aria-label={`Produto: ${name}, status ${status}${esg ? ', possui selo ESG' : ''}`}
    >
      {/* 🔷 Selo ESG */}
      {esg && (
        <div
          className="absolute top-3 right-3 bg-blueWisdom text-white text-xs font-semibold px-3 py-1 rounded-full shadow z-10"
          aria-label="Produto com selo ESG"
        >
          ESG
        </div>
      )}

      {/* 🖼️ Imagem com descrição acessível */}
      <img
        src={image}
        alt={`Imagem do produto ${name}`}
        className="w-full h-52 object-cover"
        loading="lazy"
      />

      {/* 📦 Conteúdo principal do card */}
      <div className="p-4">
        <h3 className="text-lg font-roboto text-grayIntelligent mb-2">{name}</h3>
        <p className="text-greenRegenerative font-bold text-xl mb-3">
          R$ {price.toFixed(2).replace('.', ',')}
        </p>
        <span
          className={`inline-block text-white text-xs px-3 py-1 rounded-full ${statusColor[status]}`}
          aria-label={`Status do produto: ${status}`}
        >
          {status}
        </span>
      </div>
    </div>
  )
}

/*
  ============================================
  🔚 Fim do arquivo src/components/ProductCard.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
