// 📝 BlogSection – Reflexão Crítica e Educação Regenerativa
import { useEffect, useState } from 'react'

export default function BlogSection() {
  const [posts, setPosts] = useState([])

  // Simulação de artigos (substituir futuramente por API externa)
  useEffect(() => {
    setPosts([
      {
        id: 1,
        title: 'Como a agricultura regenerativa pode salvar o planeta',
        category: 'Sustentabilidade',
        date: '14 abr. 2025',
        thumbnail: '/src/assets/images/blog_regenerativa.jpg',
        link: '#',
      },
      {
        id: 2,
        title: '5 tecnologias para hortas urbanas inteligentes',
        category: 'Tecnologia Agro',
        date: '12 abr. 2025',
        thumbnail: '/src/assets/images/blog_tecnologia.jpg',
        link: '#',
      },
      {
        id: 3,
        title: 'A importância da preservação das nascentes',
        category: 'Educação Ambiental',
        date: '10 abr. 2025',
        thumbnail: '/src/assets/images/blog_nascentes.jpg',
        link: '#',
      },
    ])
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2
        id="blog-title"
        className="text-3xl font-montserrat font-bold text-grayIntelligent mb-10 text-center"
      >
        Artigos Recentes
      </h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-200"
          >
            {/* Imagem */}
            <img
              src={post.thumbnail}
              alt={`Imagem do post: ${post.title}`}
              className="w-full h-48 object-cover"
              loading="lazy"
            />

            {/* Conteúdo */}
            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block bg-blueWisdom text-white text-xs px-3 py-1 rounded-full mb-2">
                  {post.category}
                </span>
                <h3 className="text-lg font-roboto font-semibold text-grayIntelligent mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{post.date}</p>
              </div>

              <a
                href={post.link}
                className="text-sm font-semibold text-greenRegenerative hover:underline"
                aria-label={`Ler mais: ${post.title}`}
              >
                Ler mais →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
