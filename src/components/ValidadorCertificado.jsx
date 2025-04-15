// ✅ Validador de Certificados Digitais – Agroverso
import { useState } from 'react'

export default function ValidadorCertificado() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState(null)

  const certificadosSimulados = {
    'ABC123XYZ': {
      nome: 'Joana da Silva',
      curso: 'Hidroponia Inteligente para Hortas Urbanas',
      data: '15 de Abril de 2025',
    },
    'DEF456LMN': {
      nome: 'Carlos Oliveira',
      curso: 'Gestão Regenerativa no Agro',
      data: '02 de Março de 2025',
    },
  }

  const validarCertificado = () => {
    setErro(null)
    setResultado(null)

    if (!codigo.trim()) {
      setErro('Por favor, insira um código de certificado.')
      return
    }

    const info = certificadosSimulados[codigo.trim().toUpperCase()]

    if (info) {
      setResultado(info)
    } else {
      setErro('Certificado não encontrado. Verifique o código e tente novamente.')
    }
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-20 text-center font-opensans">
      <h2 className="text-3xl font-montserrat font-bold text-grayIntelligent mb-6">
        Validação de Certificado
      </h2>

      <p className="mb-8 text-gray-600 text-sm">
        Insira abaixo o código de verificação encontrado no certificado ou escaneado pelo QR Code.
      </p>

      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Digite o código do certificado (ex: ABC123XYZ)"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-greenRegenerative text-sm"
      />

      <button
        onClick={validarCertificado}
        className="bg-greenRegenerative text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition duration-200"
      >
        Validar Certificado
      </button>

      {erro && <p className="mt-6 text-sm text-red-600">{erro}</p>}

      {resultado && (
        <div className="mt-10 border border-gray-200 rounded-lg p-6 bg-white shadow text-left text-sm">
          <h3 className="font-bold text-greenRegenerative text-lg mb-2">
            Certificado válido 🎉
          </h3>
          <p><strong>Nome:</strong> {resultado.nome}</p>
          <p><strong>Curso:</strong> {resultado.curso}</p>
          <p><strong>Data de Emissão:</strong> {resultado.data}</p>
        </div>
      )}
    </section>
  )
}
