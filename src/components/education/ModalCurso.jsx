// ========================================================================================
// 🪟 ModalCurso.jsx | Agroverso — Modal de Curso com Acessibilidade e Conteúdo Rico
// ========================================================================================
// 🎯 Finalidade:
//     • Apresentar detalhes do curso de forma clara, acessível e focada.
//     • Oferecer call-to-action emocional com estilo responsivo e dark mode.
// ========================================================================================

import React from 'react'
import PropTypes from 'prop-types'

export default function ModalCurso({ curso, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-curso-titulo"
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-600 text-xl"
        >
          ×
        </button>

        <h2
          id="modal-curso-titulo"
          className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4"
        >
          {curso.titulo || 'Curso sem título'}
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {curso.descricao || 'Nenhuma descrição fornecida.'}
        </p>

        {curso.duracaoHoras && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
            Duração estimada: {curso.duracaoHoras} hora
            {curso.duracaoHoras > 1 ? 's' : ''}
          </p>
        )}

        {curso.publico && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Público-alvo: {curso.publico}
          </p>
        )}

        {curso.tema && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Tema: {curso.tema}
          </p>
        )}

        {curso.linkInscricao && (
          <a
            href={curso.linkInscricao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            data-testid="botao:inscricao"
          >
            Inscreva-se Agora
          </a>
        )}
      </div>
    </div>
  )
}

ModalCurso.propTypes = {
  curso: PropTypes.shape({
    titulo: PropTypes.string,
    descricao: PropTypes.string,
    duracaoHoras: PropTypes.number,
    publico: PropTypes.string,
    tema: PropTypes.string,
    linkInscricao: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
