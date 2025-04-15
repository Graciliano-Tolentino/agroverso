// 🎓 CoursesSection – Capacitação Técnica Regenerativa Agroverso
import { useEffect, useState } from 'react'

export default function CoursesSection() {
  const [courses, setCourses] = useState([])

  // Simulação de dados de cursos (pode ser substituído por fetch futuramente)
  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: 'Preservação de Nascentes',
        description: 'Aprenda práticas regenerativas para proteger recursos hídricos.',
        thumbnail: 'https://img.youtube.com/vi/1S3nBTXHqa4/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=1S3nBTXHqa4',
      },
      {
        id: 2,
        title: 'Hidroponia Inteligente para Iniciantes',
        description: 'Domine os princípios da produção limpa e controlada.',
        thumbnail: 'https://img.youtube.com/vi/4cNS93G7YTI/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=4cNS93G7YTI',
      },
      {
        id: 3,
        title: 'Gestão Regenerativa no Agro',
        description: 'Integre tecnologia e tradição com ética ambiental.',
        thumbnail: 'https://img.youtube.com/vi/0G3Rcs_7dx4/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0G3Rcs_7dx4',
      },
    ])
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2
        id="courses-title"
        className="text-3xl font-montserrat font-bold text-grayIntelligent mb-10 text-center"
      >
        Cursos Regenerativos
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => (
          <a
            key={course.id}
            href={course.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden"
            aria-label={`Acessar curso: ${course.title}`}
          >
            {/* Thumbnail com botão play central */}
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-52 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition">
                <svg
                  className="w-12 h-12 text-white opacity-90 group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Conteúdo textual */}
            <div className="p-4">
              <h3 className="text-lg font-roboto text-grayIntelligent mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
