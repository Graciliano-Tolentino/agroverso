import React from 'react';
import CertificadoComExportacao from '@/components/certificados/CertificadoComExportacao';

export default function CertificadoEmitidoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <CertificadoComExportacao
        nome="Graciliano Tolentino"
        curso="Desenvolvimento AgroDigital"
        data="21/05/2025"
        codigo="AGR-CTF-9472"
      />
    </div>
  );
}
