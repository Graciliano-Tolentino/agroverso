import React from "react";
import { Link } from "react-router-dom";
import MissionVisionValues from "../components/MissionVisionValues";
import ProductCard from "../components/ProductCard";
import CourseCard from "../components/CourseCard";
import products from "../data/produtos";
import courses from "../data/courses";

// Assets
import videoSrc from "../assets/videos/apresentacao.mp4";
import bannerImg from "../assets/images/banner-home.png";

function Home() {
  return (
    <div className="space-y-10 pb-10">
      {/* Hero com vídeo */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
            Agroverso — Agricultura Inteligente, Sustentável e Autônoma
          </h1>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Nossos Produtos</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((produto) => (
            <ProductCard key={produto.id} {...produto} />
          ))}
        </div>
      </section>

      {/* Cursos com certificado gratuito */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Capacitação Profissional</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((curso) => (
            <CourseCard key={curso.id} {...curso} />
          ))}
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="max-w-4xl mx-auto px-4">
        <MissionVisionValues />
      </section>

      {/* CTA final */}
      <section className="text-center mt-16">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Deseja transformar sua propriedade com tecnologia?
        </h3>
        <Link
          to="/orcamento"
          className="inline-block mt-2 bg-green-700 text-white px-6 py-3 rounded-xl shadow hover:bg-green-800 transition"
        >
          Solicitar Orçamento Personalizado
        </Link>
      </section>
    </div>
  );
}

export default Home;
