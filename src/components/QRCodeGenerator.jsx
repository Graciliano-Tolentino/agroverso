// ==========================================
// 📄 QRCodeGenerator.jsx | Agroverso
// ==========================================
// 🧾 Componente utilitário de QR Code:
// - Gera códigos a partir de strings (URL, UUID, etc.)
// - Altamente personalizável (cores, tamanho, nível de correção)
// - Visualmente integrado e semanticamente acessível
// - Usado em certificados, dashboards, validadores públicos
// Criado com sabedoria, força e beleza – Padrão Agroverso High Tech
// ==========================================

import React from 'react';
import PropTypes from 'prop-types';
import { QRCode } from 'qrcode.react';

export default function QRCodeGenerator({
  value,
  size = 150,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  level = 'M',
  className = '',
  ariaLabel = null // permite sobrepor label padrão
}) {
  const label = ariaLabel || `QR Code para o conteúdo: ${value}`;

  if (!value || typeof value !== 'string' || value.trim().length === 0) {
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
        fgColor={fgColor}
        bgColor={bgColor}
        level={level}
        includeMargin={true}
        renderAs="svg"
      />
    </div>
  );
}

// ✅ Tipagem de propriedades (PropTypes)
QRCodeGenerator.propTypes = {
  value: PropTypes.string.isRequired,               // Conteúdo codificado no QR Code (URL, UUID, etc.)
  size: PropTypes.number,                           // Tamanho do QR Code (pixels)
  fgColor: PropTypes.string,                        // Cor do traçado
  bgColor: PropTypes.string,                        // Cor de fundo
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),     // Nível de correção de erro
  className: PropTypes.string,                      // Estilos adicionais
  ariaLabel: PropTypes.string                       // Acessibilidade: descrição alternativa
};

// ✅ Valores padrão
QRCodeGenerator.defaultProps = {
  size: 150,
  fgColor: '#000000',
  bgColor: '#FFFFFF',
  level: 'M',
  className: '',
  ariaLabel: null
};
