// =====================================================================================
// 📄 QRCodeWrapper.jsx (v2.1)
// 📁 src/components
// ✍️ Atualizado por: Agroverso Tech
// 📅 Atualizado em: 30/05/2025
// 🎯 Wrapper dinâmico e resiliente para QR Code antifraude — compatível com Vite, Rollup e ambientes híbridos
//
// 🌍 Framework Agroverso — Engenharia com Sabedoria, Força e Beleza
// =====================================================================================

import React, { Suspense, memo } from 'react';

// 🔄 Importação dinâmica: contorna a ausência de export default formal e suporta ESM/CJS
const LazyQRCode = React.lazy(async () => {
  const mod = await import('qrcode.react');

  // ✅ Proteção contra todas as formas de exportação
  const Exported = mod.QRCode || mod.default || (() => null);

  return { default: Exported };
});

export const QRCodeWrapper = memo(({
  value,
  size = 128,
  fgColor = '#000000',
  bgColor = '#ffffff',
  level = 'H',
  className = '',
  fallbackMessage = 'Carregando QR Code...',
  ...props
}) => {
  if (!value || typeof value !== 'string') {
    console.warn('QRCodeWrapper: valor inválido fornecido:', value);
    return (
      <div className="text-red-600 text-sm italic">
        QR Code inválido — valor ausente ou malformado.
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-gray-500 text-sm italic">{fallbackMessage}</div>}>
      <LazyQRCode
        value={value}
        size={size}
        fgColor={fgColor}
        bgColor={bgColor}
        level={level}
        className={className}
        {...props}
      />
    </Suspense>
  );
});
