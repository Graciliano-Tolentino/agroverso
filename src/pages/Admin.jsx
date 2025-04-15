// 🔐 Admin.jsx – Painel com Logout e Timeout de Sessão
import React, { useState, useEffect } from 'react'
import CertificadoComExportacao from '@components/CertificadoComExportacao'

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [baseAdmins, setBaseAdmins] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)

  const [certData, setCertData] = useState({
    nome: '',
    curso: '',
    data: '',
    qrCodeUrl: ''
  })

  // 🔄 Carrega dados de login
  useEffect(() => {
    fetch('/data/admin.json')
      .then(res => res.json())
      .then(data => setBaseAdmins(data))
  }, [])

  // ⏳ Controla sessão com timeout de 15 minutos
  useEffect(() => {
    if (auth) {
      const id = setTimeout(() => {
        alert('Sessão expirada por inatividade.')
        handleLogout()
      }, 15 * 60 * 1000) // 15 minutos

      setTimeoutId(id)

      return () => clearTimeout(id)
    }
  }, [auth])

  const autenticar = () => {
    const encontrado = baseAdmins.find(
      (admin) =>
        admin.usuario.toLowerCase() === usuario.toLowerCase() &&
        admin.senha === senha
    )
    if (encontrado) {
      setAuth(true)
    } else {
      alert('Usuário ou senha inválidos.')
    }
  }

  const handleLogout = () => {
    setAuth(false)
    setUsuario('')
    setSenha('')
    setCertData({ nome: '', curso: '', data: '', qrCodeUrl: '' })
    if (timeoutId) clearTimeout(timeoutId)
  }

  const handleChange = (e) => {
    setCertData({ ...certData, [e.target.name]: e.target.value })
  }

  return (
    <section className="min-h-screen px-6 py-20 font-opensans bg-gray-50">
      {!auth ? (
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-2xl font-montserrat font-bold text-grayIntelligent mb-6">Acesso Restrito</h2>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuário"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
          />
          <button
            onClick={autenticar}
            className="w-full bg-greenRegenerative text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
          >
            Entrar
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {/* 🔒 Barra superior de sessão */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-montserrat font-bold text-grayIntelligent">
              Sessão ativa: {usuario}
            </h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-600 transition"
            >
              Encerrar sessão
            </button>
          </div>

          <h3 className="text-xl font-montserrat font-bold text-grayIntelligent mb-6 text-center">
            Gerar Certificado Digital
          </h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input
              type="text"
              name="nome"
              value={certData.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              className="border border-gray-300 px-4 py-3 rounded-lg text-sm"
            />
            <input
              type="text"
              name="curso"
              value={certData.curso}
              onChange={handleChange}
              placeholder="Nome do curso"
              className="border border-gray-300 px-4 py-3 rounded-lg text-sm"
            />
            <input
              type="text"
              name="data"
              value={certData.data}
              onChange={handleChange}
              placeholder="Data de emissão"
              className="border border-gray-300 px-4 py-3 rounded-lg text-sm"
            />
            <input
              type="text"
              name="qrCodeUrl"
              value={certData.qrCodeUrl}
              onChange={handleChange}
              placeholder="URL do QR Code"
              className="border border-gray-300 px-4 py-3 rounded-lg text-sm"
            />
          </form>

          <CertificadoComExportacao
            nome={certData.nome}
            curso={certData.curso}
            data={certData.data}
            qrCodeUrl={certData.qrCodeUrl}
          />
        </div>
      )}
    </section>
  )
}
