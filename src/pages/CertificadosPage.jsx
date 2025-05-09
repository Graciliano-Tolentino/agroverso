// ==========================================
// 📄 CertificadosPage.jsx | Agroverso – Validador de Certificados
// ==========================================
// Permite validação pública de certificados com base no código único (AGRO-xxxx)
// Suporte a QR code via rota dinâmica (/validar/:codigo) e pesquisa manual (/certificados)
// Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ==========================================

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import certificados from '@/data/certificados.json'; // se preferir fetch, ajustar aqui

export default function CertificadosPage() {
  const { codigo: paramCodigo } = useParams();
  const [searchParams] = useSearchParams();
  const queryCodigo = searchParams.get('code');

  const [codigoInput, setCodigoInput] = useState('');
  const [resultado, setResultado] = useState(null); // null | 'valido' | 'invalido' | 'malformado'
  const [dadosCertificado, setDadosCertificado] = useState(null);
  const [verificando, setVerificando] = useState(false);

  const regexValido = /^AGRO-[A-Z0-9\-]{8,}$/i;

  // 🔍 Busca automática se código vier por rota ou query
  useEffect(() => {
    const codigoInicial = paramCodigo || queryCodigo;
    if (codigoInicial) {
      setCodigoInput(codigoInicial);
      validarCodigo(codigoInicial);
    }
  }, [paramCodigo, queryCodigo]);

  // 🧠 Lógica principal de validação
  const validarCodigo = (codigo) => {
    const codigoFormatado = codigo.trim().toUpperCase();

    if (!regexValido.test(codigoFormatado)) {
      setResultado('malformado');
      setDadosCertificado(null);
      return;
    }

    setVerificando(true);

    const encontrado = certificados.find(
      (cert) => cert.codigo.toUpperCase() === codigoFormatado
    );

    if (encontrado) {
      setResultado('valido');
      setDadosCertificado(encontrado);
    } else {
      setResultado('invalido');
      setDadosCertificado(null);
    }

    setVerificando(false);
  };
  // 🔁 Limpa resultado ao digitar novo código
  const handleChange = (e) => {
    setCodigoInput(e.target.value);
    setResultado(null);
    setDadosCertificado(null);
  };

  return (
    <section className="min-h-screen px-4 py-20 bg-gray-50 font-opensans">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 font-montserrat">
          🔎 Validação de Certificado
        </h1>

        <label htmlFor="codigo-certificado" className="block text-sm font-medium text-gray-700 mb-1">
          Código do Certificado:
        </label>
        <input
          type="text"
          id="codigo-certificado"
          name="codigo"
          value={codigoInput}
          onChange={handleChange}
          placeholder="Ex: AGRO-XXXX-XXXX"
          aria-label="Código do certificado"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-sm"
        />

        <button
          onClick={() => validarCodigo(codigoInput)}
          disabled={verificando || codigoInput.trim() === ''}
          aria-label="Validar certificado"
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          {verificando ? 'Verificando...' : 'Validar'}
        </button>

        <div role="status" aria-live="polite" className="mt-6 text-sm">
          {resultado === 'valido' && dadosCertificado && (
            <div className="text-green-700 bg-green-50 border border-green-200 p-4 rounded-lg shadow mt-4">
              <p className="font-bold text-base mb-2">✅ Certificado VÁLIDO</p>
              <p><strong>Nome:</strong> {dadosCertificado.nome}</p>
              <p><strong>Curso:</strong> {dadosCertificado.curso}</p>
              <p><strong>Data:</strong> {dadosCertificado.data}</p>
              <p className="text-xs text-gray-500 mt-2"><strong>Código:</strong> {dadosCertificado.codigo}</p>
            </div>
          )}

          {resultado === 'invalido' && (
            <div className="text-red-700 bg-red-50 border border-red-200 p-4 rounded-lg shadow mt-4">
              <p className="font-bold text-base">❌ Certificado NÃO encontrado.</p>
              <p className="text-xs text-gray-600 mt-1">
                Verifique se o código foi digitado corretamente e tente novamente.
              </p>
            </div>
          )}

          {resultado === 'malformado' && (
            <div className="text-yellow-800 bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow mt-4">
              <p className="font-bold text-base">⚠️ Código inválido</p>
              <p className="text-xs text-gray-600 mt-1">
                O código deve começar com "AGRO-" e conter ao menos 8 caracteres alfanuméricos.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );

}

// ==========================================
// 🌱 Desenvolvido com sabedoria, força e beleza
// 🧠 Padrão High Tech Agroverso – agroverso.tec.br
// ==========================================
