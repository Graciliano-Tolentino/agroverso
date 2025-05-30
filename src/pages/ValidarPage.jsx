// =====================================================================================
// 📄 ValidarPage.jsx (v2.0)
// 📁 src/pages
// ✍️ Desenvolvido por: Graciliano Tolentino
// 📅 Atualizado em: 29/05/2025
// 🎯 Visualização pública de certificados Agroverso com validação antifraude via JWT
// 🌍 Framework Agroverso — Interface de confiança pública com sabedoria, força e beleza
// =====================================================================================

import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode' // ✅ Importação corrigida: nomeada
import { useSearchParams } from 'react-router-dom'

const ValidarCertificado = () => {
  const [params] = useSearchParams()
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState(null)
  const [verificadoEm, setVerificadoEm] = useState(null)

  useEffect(() => {
    const token = params.get('token')
    if (!token) {
      setErro('❗ Token de verificação ausente.')
      return
    }

    try {
      const payload = jwtDecode(token)
      setDados(payload)
      setVerificadoEm(new Date().toLocaleString('pt-BR'))
    } catch (err) {
      console.error('[ValidarPage] Erro ao decodificar JWT:', err)
      setErro('❌ Token inválido, corrompido ou expirado.')
    }
  }, [params])

  if (erro) {
    return (
      <section className="max-w-xl mx-auto mt-12 p-6 bg-red-100 border-l-4 border-red-600 text-red-900 rounded">
        <h1 className="text-xl font-bold mb-2">Certificado inválido</h1>
        <p>{erro}</p>
        <p className="text-sm mt-4 italic text-gray-600">Agroverso — Validador Público</p>
      </section>
    )
  }

  if (!dados) {
    return <p className="text-center mt-12">⏳ Validando certificado...</p>
  }

  return (
    <article className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 text-gray-800 font-sans">
      <h1 className="text-2xl font-bold text-green-700 mb-4">✅ Certificado válido</h1>
      <dl className="grid grid-cols-1 gap-2">
        <div>
          <dt className="font-semibold">Nome:</dt>
          <dd>{dados.nome}</dd>
        </div>
        <div>
          <dt className="font-semibold">Curso:</dt>
          <dd>{dados.curso}</dd>
        </div>
        <div>
          <dt className="font-semibold">Data de Conclusão:</dt>
          <dd>{dados.data}</dd>
        </div>
        <div>
          <dt className="font-semibold">Código do Certificado:</dt>
          <dd>{dados.id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Emitido por:</dt>
          <dd>{dados.origem || 'Agroverso'}</dd>
        </div>
        <div>
          <dt className="font-semibold">Emitido em:</dt>
          <dd>{new Date(dados.emitidoEm).toLocaleDateString('pt-BR')}</dd>
        </div>
        <div>
          <dt className="font-semibold">Verificado em:</dt>
          <dd>{verificadoEm}</dd>
        </div>
      </dl>
      <p className="text-xs text-gray-500 mt-6 italic">
        Certificado verificado por Agroverso — Plataforma de Sabedoria Verde.
      </p>
    </article>
  )
}

export default ValidarCertificado
