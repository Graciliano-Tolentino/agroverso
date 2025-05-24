import React from 'react';

export default function CertificadoValidadoPage() {
  return (
    <section className="min-h-screen bg-green-50 dark:bg-green-900 p-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">✅ Certificado Válido</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">Este certificado foi emitido oficialmente pela plataforma Agroverso.</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Verificação completa realizada com sucesso.</p>
    </section>
  );
}
