// 🚫 404.jsx – Página Não Encontrada (Agroverso)
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center">
        <img
          src="/src/assets/images/logo_agroverso.png"
          alt="Agroverso"
          className="w-20 mx-auto mb-6"
        />

        <h1 className="text-4xl font-montserrat font-bold text-greenRegenerative mb-4">
          Página não encontrada
        </h1>

        <p className="text-gray-600 mb-8 text-sm">
          Sentimos muito. O caminho que você tentou acessar não existe ou foi movido.
        </p>

        <Link
          to="/"
          className="inline-block bg-greenRegenerative text-white font-semibold px-8 py-3 rounded-xl shadow hover:bg-green-600 transition-all duration-200"
        >
          Voltar à Página Inicial
        </Link>
      </div>
    </section>
  )
}
