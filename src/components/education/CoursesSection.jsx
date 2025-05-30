// ========================================================================================
// 🎓 CoursesSection.jsx (v2.0) | Agroverso — Seção de Cursos com Acessibilidade e Emoção
// ========================================================================================
// 🎯 Finalidade:
//     • Listar cursos com responsividade, acessibilidade, i18n e UX emocional.
//     • Exibir estado de carregamento, falha e modal de detalhes com elegância.
//     • Integrado ao hook `useCursos` com fallback, escalabilidade e legibilidade.
// ========================================================================================

import React, { useState } from 'react'
import useCursos from '@/hooks/useCursos'
import { coursesText } from '@/constants/coursesContent'
import CourseCard from '@/components/education/CourseCard'
import ModalCurso from '@/components/education/ModalCurso'

export default function CoursesSection() {
  const { cursos, loading, erro } = useCursos()
  const [cursoSelecionado, setCursoSelecionado] = useState(null)

  return (
    <section
      role="region"
      aria-label="Seção de cursos qualificadores"
      data-testid="cursos:section"
      className="py-16 px-6 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
          data-testid="cursos:titulo"
        >
          {coursesText?.tituloSecao || '📘 Cursos Disponíveis'}
        </h2>

        {loading && (
          <p
            role="status"
            data-testid="cursos:carregando"
            className="text-lg text-gray-600 dark:text-gray-400 animate-pulse"
          >
            {coursesText?.carregando || 'Carregando cursos...'}
          </p>
        )}

        {erro && (
          <p
            role="alert"
            data-testid="cursos:erro"
            className="text-red-600 dark:text-red-400 mb-4"
          >
            {erro || 'Erro ao carregar cursos.'}
          </p>
        )}

        {!loading && cursos.length === 0 && (
          <p
            className="text-gray-500 dark:text-gray-400"
            data-testid="cursos:nenhum"
          >
            Nenhum curso disponível no momento.
          </p>
        )}

        <div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4"
          data-testid="cursos:grid"
        >
          {cursos.map((curso) => (
            <CourseCard
              key={curso.id}
              curso={curso}
              onClick={() => setCursoSelecionado(curso)}
              data-testid={`curso:${curso.id}`}
            />
          ))}
        </div>

        {cursoSelecionado && (
          <ModalCurso
            curso={cursoSelecionado}
            onClose={() => setCursoSelecionado(null)}
          />
        )}
      </div>
    </section>
  )
}
