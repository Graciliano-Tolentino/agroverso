import React from 'react';
import { QRCode } from 'qrcode.react';

interface QRCodeGeneratorProps {
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
  size = 128,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  level = 'Q',
  className,
  ariaLabel = 'QR Code',
}) => {
  return (
    <div className={className} aria-label={ariaLabel}>
      <QRCode value={value} size={size} fgColor={fgColor} bgColor={bgColor} level={level} />
    </div>
  );
};

export default QRCodeGenerator;
