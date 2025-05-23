import React from 'react';

export default function AdminDashboardPage() {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">Painel Administrativo</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Visão geral da operação, atividades recentes e dados relevantes da plataforma Agroverso.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Usuários ativos</h2>
          <p className="text-2xl font-bold text-green-500">123</p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Cursos publicados</h2>
          <p className="text-2xl font-bold text-blue-500">7</p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Novos acessos</h2>
          <p className="text-2xl font-bold text-yellow-500">45</p>
        </div>
      </div>
    </section>
  );
}
