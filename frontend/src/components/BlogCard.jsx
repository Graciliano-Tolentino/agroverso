import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ id, titulo, imagem, resumo, data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={imagem}
        alt={titulo}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">{data}</p>
        <h2 className="text-lg font-semibold text-green-800 mb-2">{titulo}</h2>
        <p className="text-gray-700 text-sm mb-4">{resumo}</p>
        <Link
          to={`/blog/${id}`}
          className="text-green-700 font-medium hover:underline"
        >
          Ler mais →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
