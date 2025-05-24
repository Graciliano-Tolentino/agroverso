// =====================================================================================
// 📄 CoursesSection.jsx | Agroverso – Lista de Cursos Qualificadores com Acessibilidade
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir cursos com acessibilidade, responsividade, modularidade e integração API.
//     • Compatível com dark mode, i18n, testabilidade e design emocional.
// =====================================================================================

import React, { useState } from 'react';
import { useCursos } from '@/hooks/useCursos';
import { coursesText } from '@/constants/coursesContent';
import CourseCard from '@/components/education/CourseCard';
import ModalCurso from '@/components/education/ModalCurso';

const CoursesSection = () => {
  const { cursos, carregando } = useCursos();
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  return (
    <section
      role="region"
      aria-label="Seção com lista de cursos qualificadores disponíveis"
      data-testid="cursos:section"
      className="py-16 px-6 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          data-testid="cursos:titulo"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 card-heading"
        >
          {coursesText.tituloSecao || 'Cursos Disponíveis'}
        </h2>

        {carregando ? (
          <p
            className="text-lg text-gray-600 dark:text-gray-400 animate-pulse"
            role="status"
            data-testid="cursos:carregando"
          >
            {coursesText.carregando || 'Carregando cursos...'}
          </p>
        ) : (
          <div
            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            data-testid="cursos:grid"
          >
            {cursos.map((curso) => (
              <CourseCard
                key={curso.id}
                curso={curso}
                onClick={() => setCursoSelecionado(curso)}
              />
            ))}
          </div>
        )}

        {/* 🌱 Modal com detalhes do curso selecionado */}
        {cursoSelecionado && (
          <ModalCurso
            curso={cursoSelecionado}
            onClose={() => setCursoSelecionado(null)}
          />
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
