// 🔓 Logout.jsx – Página de Encerramento de Sessão com Feedback Institucional
import React from 'react'
import { Link } from 'react-router-dom'

export default function Logout() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <img
          src="/src/assets/images/logo_agroverso.png"
          alt="Agroverso"
          className="w-20 mx-auto mb-6"
        />

        <h1 className="text-3xl font-montserrat font-bold text-greenRegenerative mb-4">
          Sessão finalizada
        </h1>

        <p className="text-gray-600 text-sm mb-8">
          Você saiu do painel administrativo com segurança.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-greenRegenerative text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Voltar para o site
          </Link>
          <Link
            to="/admin"
            className="bg-blueWisdom text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Acessar novamente
          </Link>
        </div>
      </div>
    </section>
  )
}
