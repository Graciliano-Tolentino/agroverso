import React from 'react';

export default function CommunitySection() {
  const membrosMock = [
    { id: 1, nome: 'Joana Mendes', cargo: 'Produtora Orgânica' },
    { id: 2, nome: 'Carlos Silva', cargo: 'Pesquisador AgroDigital' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {membrosMock.map((membro) => (
        <div
          key={membro.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {membro.nome}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{membro.cargo}</p>
        </div>
      ))}
    </div>
  );
}
