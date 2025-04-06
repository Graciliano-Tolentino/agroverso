import React from "react";
import ProductCard from "../components/ProductCard";

// Imagens importadas corretamente
import produtoIrrigacao from "../assets/images/produto-irrigacao.png";
import produtoHidroponia from "../assets/images/produto-hidroponia.png";
import produtoFotovoltaico from "../assets/images/produto-fotovoltaico.png";

function Products() {
  const produtos = [
    {
      id: 1,
      titulo: "Irrigação por Gotejamento Inteligente",
      descricao:
        "Sistema automatizado com sensores e controle digital para irrigação precisa, econômica e eficiente diretamente na raiz da planta.",
      imagem: produtoIrrigacao,
    },
    {
      id: 2,
      titulo: "Hidroponia Inteligente",
      descricao:
        "Cultivo sem solo com monitoramento e ajuste automático de nutrientes, pH e temperatura da solução nutritiva.",
      imagem: produtoHidroponia,
    },
    {
      id: 3,
      titulo: "Energia Fotovoltaica Inteligente",
      descricao:
        "Geração de energia solar com gerenciamento inteligente de consumo, armazenamento e retorno à rede.",
      imagem: produtoFotovoltaico,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-green-800 text-center">
        Nossas Soluções Tecnológicas
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} {...produto} />
        ))}
      </div>
    </div>
  );
}

export default Products;
