// ========================================================================================
// 📘 CourseCard.jsx (v2.0) | Agroverso – Cartão de Curso com Acessibilidade e Estilo Vivo
// ========================================================================================
// 🎯 Finalidade:
//     • Exibir curso com acessibilidade, rastreamento e responsividade refinada.
//     • Componente isolado, compatível com Design System e CI.
// ========================================================================================

import React from 'react'
import PropTypes from 'prop-types'

export default function CourseCard({ curso, onClick }) {
  const handleClick = () => {
    if (window?.gtag) {
      window.gtag('event', 'clique-card-curso', {
        event_category: 'Cursos',
        event_label: curso.titulo,
        cursoId: curso.id,
        tema: curso.tema || 'indefinido',
      })
    }

    onClick()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-left w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 p-5 transition-all focus:outline-none focus:ring-2 focus:ring-green-600"
      aria-label={`Ver detalhes do curso ${curso.titulo || 'sem título'}`}
      data-testid={`carta:${curso.id}`}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        {curso.titulo || 'Título não informado'}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
        {curso.descricao || 'Descrição não disponível.'}
      </p>

      {curso.duracaoHoras && (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Duração estimada: {curso.duracaoHoras} hora
          {curso.duracaoHoras > 1 ? 's' : ''}
        </p>
      )}

      {curso.imagem && (
        <img
          src={curso.imagem}
          alt={`Imagem ilustrativa do curso ${curso.titulo}`}
          className="mt-4 w-full h-40 object-cover rounded-lg border border-gray-100 dark:border-gray-700"
          loading="lazy"
        />
      )}
    </button>
  )
}

CourseCard.propTypes = {
  curso: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    titulo: PropTypes.string,
    descricao: PropTypes.string,
    duracaoHoras: PropTypes.number,
    imagem: PropTypes.string,
    tema: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}
