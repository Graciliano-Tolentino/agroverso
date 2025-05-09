// ==========================================
// 📄 CertificadoComExportacao.jsx | Agroverso
// ==========================================
// 🧾 Certificado com prefixo AGRO-, QR Code integrado e exportação em PDF
// Layout institucional, acessível, imprimível e validável por link.
// Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ==========================================

import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { v4 as uuidv4 } from 'uuid';
import QRCodeGenerator from './QRCodeGenerator'; // ajuste conforme estrutura

export default function CertificadoComExportacao({
  nome = 'Participante',
  curso = 'Curso de Formação Agroverso',
  data = '01/01/2025',
  codigo = null
}) {
  const [codigoUnique] = useState(() => {
    const raw = codigo || uuidv4();
    return raw.startsWith('AGRO-') ? raw : `AGRO-${raw}`;
  });

  const linkValidacao = `https://agroverso.tec.br/validar/${codigoUnique}`;
  const handleDownload = () => {
    const element = document.getElementById('certificado-pdf');
    const options = {
      margin: 0,
      filename: `certificado-${nome.trim().toLowerCase().replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <article
        id="certificado-pdf"
        role="document"
        aria-labelledby="titulo-certificado"
        className="bg-white border border-gray-300 shadow-xl rounded-xl px-10 py-12 text-center font-opensans text-gray-800 print:bg-white print:text-black print:shadow-none print:border-none"
      >
        <header className="mb-8">
          <img
            src="/src/assets/images/logo_agroverso.png"
            alt="Logotipo do Agroverso"
            className="w-28 mx-auto mb-6"
          />
          <h1
            id="titulo-certificado"
            className="text-3xl font-montserrat font-bold text-green-700"
          >
            Certificado de Conclusão
          </h1>
        </header>

        <section aria-label="Conteúdo do certificado">
          <p className="mb-6 text-sm leading-relaxed">
            Certificamos que <span className="font-bold text-lg">{nome}</span> concluiu com êxito o curso
            <br />
            <span className="font-semibold italic">“{curso}”</span>, promovido pelo <strong>Agroverso</strong>.
          </p>

          <p className="text-sm mb-4">
            Emitido em: <span className="font-medium">{data}</span>
          </p>

          <p className="text-xs text-gray-500 mb-6">
            Código do certificado: <span className="font-mono">{codigoUnique}</span>
          </p>
        </section>
        {/* QR Code para validação */}
        <section
          aria-label="Validação do certificado por QR Code"
          className="mt-8 flex flex-col items-center justify-center"
        >
          <QRCodeGenerator
            value={linkValidacao}
            size={150}
            fgColor="#1f2937"
            bgColor="#ffffff"
            level="M"
            ariaLabel={`QR Code para validação do certificado ${codigoUnique}`}
          />
          <p className="text-xs text-gray-500 mt-2">
            Escaneie ou acesse:&nbsp;
            <a
              href={linkValidacao}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-green-700 hover:text-green-900"
            >
              {linkValidacao}
            </a>
          </p>
        </section>

        {/* Assinaturas institucionais */}
        <footer
          aria-label="Assinaturas institucionais"
          className="mt-12 flex flex-col md:flex-row justify-around text-xs text-gray-600 space-y-6 md:space-y-0"
        >
          <figure className="text-center">
            <img
              src="/src/assets/images/assinatura_coordenador.png"
              alt="Assinatura digital do coordenador técnico do Agroverso"
              className="w-32 mx-auto mb-2"
            />
            <figcaption>
              __________________________
              <br />
              Coordenação Técnica – Agroverso
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              src="/src/assets/images/assinatura_instituto.png"
              alt="Assinatura digital da presidência do Instituto Graciliana Maria da Conceição"
              className="w-32 mx-auto mb-2"
            />
            <figcaption>
              __________________________
              <br />
              Instituto Graciliana Maria da Conceição
            </figcaption>
          </figure>
        </footer>
      </article>

      {/* Botão de exportação (fora do PDF) */}
      <div className="text-center mt-6 print:hidden">
        <button
          onClick={handleDownload}
          aria-label="Baixar este certificado como PDF"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition duration-200"
        >
          📥 Baixar Certificado em PDF
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 🌱 Desenvolvido com sabedoria, força e beleza
// 🧠 Padrão High Tech Agroverso – agroverso.tec.br
// ==========================================
