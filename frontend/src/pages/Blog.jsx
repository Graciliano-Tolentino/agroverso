import React from "react";
import blogPosts from "../data/blogPosts";
import BlogCard from "../components/BlogCard";

function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Últimos Artigos
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            titulo={post.titulo}
            imagem={post.imagem}
            resumo={post.resumo}
            data={post.data}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
