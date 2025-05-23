import React from 'react';

export default function CoursesSection() {
  const cursosMock = [
    { id: 1, titulo: 'Agricultura Regenerativa', carga: '12h' },
    { id: 2, titulo: 'Tecnologia no Agro Sustentável', carga: '8h' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cursosMock.map((curso) => (
        <div
          key={curso.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {curso.titulo}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Carga horária: {curso.carga}</p>
        </div>
      ))}
    </div>
  );
}
