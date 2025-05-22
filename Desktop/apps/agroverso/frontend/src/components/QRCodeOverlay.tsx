// =====================================================================================
// 📄 QRCodeOverlay.tsx
// 📁 src/components
// ✍️ Desenvolvido por: Graciliano Tolentino
// 📅 Atualizado em: 25/05/2025
// 🎯 Componente fullscreen de QR Code com download em PNG
//
// 🌍 Framework Agroverso — Acessibilidade visual com sabedoria, força e beleza
// =====================================================================================

import React, { useRef } from 'react';
import QRCode from 'qrcode.react';

interface QRCodeOverlayProps {
  value: string;
  onClose: () => void;
  size?: number;
  label?: string;
}

const QRCodeOverlay: React.FC<QRCodeOverlayProps> = ({
  value,
  onClose,
  size = 256,
  label = 'QR Code',
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `QRCode-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg text-center max-w-sm shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{label}</h2>
        <div ref={qrRef} className="mb-4 inline-block">
          <QRCode
            value={value}
            size={size}
            level="H"
            includeMargin={true}
            renderAs="canvas"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={downloadQRCode}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
          >
            ⬇️ Baixar PNG
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-2 px-4 rounded"
          >
            ✖ Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeOverlay;
