// 🤝 CommunitySection.jsx – Depoimentos da Comunidade Agroverso
import React, { useEffect, useState } from 'react'

export default function CommunitySection() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    setTestimonials([
      {
        id: 1,
        name: 'Joana Silva',
        text: 'O Agroverso transformou nossa produção com tecnologia limpa e prática!',
        avatar: '/src/assets/images/avatar_joana.png',
      },
      {
        id: 2,
        name: 'Carlos Oliveira',
        text: 'Agora conseguimos aliar sustentabilidade com produtividade de verdade.',
        avatar: '/src/assets/images/avatar_carlos.png',
      },
      {
        id: 3,
        name: 'Rafaela Torres',
        text: 'Os cursos abriram minha mente para uma gestão regenerativa e consciente.',
        avatar: '/src/assets/images/avatar_rafaela.png',
      }
    ])
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      <h2
        id="community-title"
        className="text-3xl font-montserrat font-bold text-grayIntelligent mb-10 text-center"
      >
        Vozes da Comunidade
      </h2>

      {/* Slider horizontal nativo com scroll suave */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="min-w-[280px] max-w-sm snap-start bg-white rounded-lg shadow p-6 flex flex-col items-center text-center flex-shrink-0"
          >
            <img
              src={item.avatar}
              alt={`Foto de ${item.name}`}
              className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-greenRegenerative"
              loading="lazy"
            />
            <p className="text-sm text-gray-600 italic mb-3 leading-relaxed">"{item.text}"</p>
            <span className="text-greenRegenerative font-roboto font-semibold text-sm">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a
          href="#contato"
          className="inline-block bg-blueWisdom text-white font-semibold font-montserrat px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
          aria-label="Junte-se à comunidade Agroverso"
        >
          Junte-se à comunidade
        </a>
      </div>
    </section>
  )
}
