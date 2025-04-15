// 🔍 ValidadorCertificado.jsx – Validação dinâmica com JSON externo
import React, { useState, useEffect } from 'react'

export default function ValidadorCertificado() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState(null)
  const [base, setBase] = useState([])

  useEffect(() => {
    fetch('/data/certificados.json')
      .then(res => res.json())
      .then(data => setBase(data))
      .catch(err => console.error('Erro ao carregar certificados:', err))
  }, [])

  const validar = (e) => {
    e.preventDefault()
    const cert = base.find(item => item.codigo.toLowerCase() === codigo.toLowerCase())
    setResultado(cert || false)
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-20 font-opensans">
      <h2 className="text-3xl font-montserrat font-bold text-grayIntelligent mb-6 text-center">
        Validador de Certificados
      </h2>

      <p className="text-sm text-gray-600 mb-8 text-center">
        Insira o código do certificado para verificar sua autenticidade.
      </p>

      <form onSubmit={validar} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ex: AGRO-001"
          className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
        />
        <button
          type="submit"
          className="bg-greenRegenerative text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
        >
          Validar
        </button>
      </form>

      {/* Resultado */}
      {resultado && resultado !== false && (
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6 text-sm text-center">
          <p className="mb-2"><strong>Código:</strong> {resultado.codigo}</p>
          <p className="mb-2"><strong>Nome:</strong> {resultado.nome}</p>
          <p className="mb-2"><strong>Curso:</strong> {resultado.curso}</p>
          <p><strong>Data de emissão:</strong> {resultado.data}</p>
        </div>
      )}

      {resultado === false && (
        <p className="text-red-600 text-center text-sm mt-4">
          Certificado não encontrado. Verifique o código inserido.
        </p>
      )}
    </section>
  )
}
