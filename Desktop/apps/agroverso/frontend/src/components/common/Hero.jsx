import React from 'react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-100 to-green-300 dark:from-green-900 dark:to-green-800 py-24 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        Bem-vindo ao <span className="text-green-600 dark:text-green-300">Agroverso</span>
      </h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
        Plataforma regenerativa para transformar o agro com tecnologia, sabedoria e colaboração.
      </p>
    </section>
  );
}
