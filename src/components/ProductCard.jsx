// 🌾 Cartão de Produto com destaque ESG
export default function ProductCard({ data }) {
  const { name, price, image, status, esg } = data

  // Cores por status
  const statusColor = {
    'disponível': 'bg-greenRegenerative',
    'últimas unidades': 'bg-yellow-400',
    'esgotado': 'bg-red-500',
  }

  return (
    <div className="relative bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden">
      {/* Selo ESG */}
      {esg && (
        <div className="absolute top-3 right-3 bg-blueWisdom text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
          ESG
        </div>
      )}

      {/* Imagem do Produto */}
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover"
        loading="lazy"
      />

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="text-lg font-roboto text-grayIntelligent mb-2">
          {name}
        </h3>

        <p className="text-greenRegenerative font-bold text-xl mb-3">
          R$ {price.toFixed(2).replace('.', ',')}
        </p>

        {/* Status */}
        <span className={`inline-block text-white text-xs px-3 py-1 rounded-full ${statusColor[status]}`}>
          {status}
        </span>
      </div>
    </div>
  )
}
