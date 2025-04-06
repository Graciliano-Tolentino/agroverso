import React from "react";

function ProductCard({ titulo, descricao, imagem }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden flex flex-col">
      <img
        src={imagem}
        alt={titulo}
        className="w-full h-44 object-cover"
        loading="lazy"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-green-800 mb-2">{titulo}</h2>
        <p className="text-gray-700 text-sm flex-grow">{descricao}</p>
        <div className="mt-4">
          <a
            href="/orcamento"
            className="inline-block bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
