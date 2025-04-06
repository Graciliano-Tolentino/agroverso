import React from "react";
import { useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";

function Article() {
  const { id } = useParams();
  const artigo = blogPosts.find((post) => post.id === Number(id));

  if (!artigo) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Artigo não encontrado</h2>
        <p className="text-gray-600">Verifique o endereço ou volte ao blog.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">{artigo.titulo}</h1>
      <img
        src={artigo.imagem}
        alt={artigo.titulo}
        className="w-full rounded-xl shadow-md object-cover"
      />
      <p className="text-sm text-gray-500">{artigo.data}</p>
      <div className="whitespace-pre-line text-gray-800 mt-4">{artigo.conteudo}</div>
    </div>
  );
}

export default Article;
