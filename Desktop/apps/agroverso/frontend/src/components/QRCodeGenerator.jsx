// =====================================================================================
// 📄 QRCodeGenerator.tsx (v3.3)
// 📁 src/components
// ✍️ Refatorado por: Graciliano Tolentino
// 📅 Atualizado em: 25/05/2025
// 🎯 Gera QR Code seguro, confiável e acessível com suporte total a TypeScript
//
// 🌍 Framework Agroverso — Interoperabilidade visual com sabedoria, força e beleza
// =====================================================================================

import React from 'react';
import { QRCode } from 'qrcode.react';

export interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  className?: string;
  ariaLabel?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 150,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  level = 'M',
  className = '',
  ariaLabel,
}) => {
  const label = ariaLabel || `QR Code contendo: ${value}`;

  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    console.warn('[QRCodeGenerator] QR Code não renderizado: valor ausente ou inválido.');
    return (
      <div
        className={`text-center text-xs text-red-500 italic ${className}`}
        role="status"
        aria-live="polite"
      >
        ⚠️ QR Code indisponível: valor não fornecido.
      </div>
    );
  }

  return (
    <div
      className={`inline-block ${className}`}
      role="img"
      aria-label={label}
      aria-hidden={false}
    >
      <QRCode
        value={value}
        size={size}
        level={level}
        fgColor={fgColor}
        bgColor={bgColor}
        includeMargin
        renderAs="svg"
      />
    </div>
  );
};

export default QRCodeGenerator;
