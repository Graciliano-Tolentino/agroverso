import React from 'react';
import html2pdf from 'html2pdf.js';

interface CertificadoProps {
  nome: string;
  curso: string;
  data: string;
  codigo: string;
}

export default function CertificadoComExportacao({ nome, curso, data, codigo }: CertificadoProps) {
  const exportarPDF = () => {
    const elemento = document.getElementById('certificado');
    if (elemento) {
      html2pdf().from(elemento).save(`certificado-${codigo}.pdf`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md" id="certificado">
      <h1 className="text-3xl font-bold mb-4 text-center">Certificado de Conclusão</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Certificamos que <strong>{nome}</strong> concluiu o curso <strong>{curso}</strong> em <strong>{data}</strong>.
      </p>
      <p className="text-sm text-center text-gray-500 mb-2">Código de Verificação: {codigo}</p>
      <div className="text-center">
        <button onClick={exportarPDF} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Exportar em PDF
        </button>
      </div>
    </div>
  );
}
