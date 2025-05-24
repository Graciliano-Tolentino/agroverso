// =====================================================================================
// 📄 CertificadoComExportacao.jsx (v3.3)
// 📁 src/components
// ✍️ Refatorado por: Graciliano Tolentino
// 📅 Atualizado em: 21/05/2025
// 🎯 Certificado com validação antifraude, persistência auditável e exportação segura
//
// 🌍 Framework Agroverso — Perfeição auditável com sabedoria, força e beleza
// =====================================================================================

import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import html2pdf from 'html2pdf.js';

const CertificadoComExportacao = ({
  nome,
  curso,
  data,
  emitidoEm,
  codigoAssinadoJWT,
  orgaoEmissor = 'Agroverso',
}) => {
  const fallback = (value) => (value && value.trim()) || 'DADO NÃO FORNECIDO';

  const urlValidacao = `https://certificados.agroverso.tec.br/validar?token=${codigoAssinadoJWT}`;

  const exportPDF = () => {
    const element = document.getElementById('certificate');
    if (!element) {
      console.error('Elemento #certificate não encontrado para exportação.');
      alert('Erro: Certificado não pode ser exportado. Elemento não encontrado.');
      return;
    }

    html2pdf()
      .set({
        margin: 0.5,
        filename: `Certificado - ${fallback(nome)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  return (
    <>
      <article
        id="certificate"
        role="document"
        className="font-opensans bg-white text-grayIntelligent p-8 sm:p-12 mx-auto my-4 shadow-lg max-w-3xl"
      >
        {/* Cabeçalho */}
        <header className="text-center mb-8">
          <img
            src="/assets/images/logo.png"
            alt="Logotipo da Agroverso"
            className="mx-auto mb-4 h-16 sm:h-20"
            loading="lazy"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">Certificado</h1>
        </header>

        {/* Corpo */}
        <section className="mb-6">
          <p className="text-lg text-center mb-4">
            Certificamos que <span className="font-bold">{fallback(nome)}</span> concluiu o curso{' '}
            <span className="font-bold">{fallback(curso)}</span> em{' '}
            <span className="font-bold">{fallback(data)}</span>.
          </p>
          <p className="text-center text-base italic text-grayIntelligent">
            Parabéns por cultivar conhecimento e sabedoria em nossa plataforma.
          </p>
        </section>

        {/* Metadados visíveis */}
        <section className="text-center text-xs text-gray-500 mb-6">
          <p>
            Emitido por <strong>{orgaoEmissor}</strong> em{' '}
            <strong>{fallback(emitidoEm)}</strong>
          </p>
        </section>

        {/* QR Code */}
        <aside className="text-center mb-8">
          <QRCode value={urlValidacao} size={128} fgColor="#000000" bgColor="#ffffff" level="H" />
          <p className="mt-2 text-sm text-grayIntelligent">Escaneie o QR Code ou acesse:</p>
          <p className="text-xs text-blue-600 underline mt-1 break-all">
            <a href={urlValidacao} target="_blank" rel="noreferrer">
              {urlValidacao}
            </a>
          </p>
        </aside>

        {/* Assinaturas */}
        <footer className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          <div>
            <img
              src="/assets/images/signature1.png"
              alt="Assinatura de Vinícius Almeida"
              className="mx-auto mb-2 h-12 sm:h-16"
              loading="lazy"
            />
            <p className="font-semibold">Vinícius Almeida</p>
            <p className="text-sm text-grayIntelligent">Diretor Executivo, Agroverso</p>
          </div>
          <div>
            <img
              src="/assets/images/signature2.png"
              alt="Assinatura de Mariana Silva"
              className="mx-auto mb-2 h-12 sm:h-16"
              loading="lazy"
            />
            <p className="font-semibold">Mariana Silva</p>
            <p className="text-sm text-grayIntelligent">Instrutora Responsável</p>
          </div>
        </footer>
      </article>

      {/* Botão de Exportação */}
      <div className="text-center mt-6">
        <button
          onClick={exportPDF}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
        >
          Exportar PDF
        </button>
      </div>
    </>
  );
};

CertificadoComExportacao.propTypes = {
  nome: PropTypes.string.isRequired,
  curso: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  emitidoEm: PropTypes.string.isRequired,
  codigoAssinadoJWT: PropTypes.string.isRequired,
  orgaoEmissor: PropTypes.string,
};

export default CertificadoComExportacao;
