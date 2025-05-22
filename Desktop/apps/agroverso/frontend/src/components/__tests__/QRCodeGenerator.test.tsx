// =====================================================================================
// 📄 QRCodeGenerator.test.tsx
// 📁 src/components/__tests__
// ✍️ Testado por: Graciliano Tolentino
// 📅 Atualizado em: 25/05/2025
// 🎯 Testes unitários para o componente QRCodeGenerator Agroverso
//
// 🌍 Framework Agroverso — Rastreabilidade visual com sabedoria, força e beleza
// =====================================================================================

import React from 'react';
import { render, screen } from '@testing-library/react';
import QRCodeGenerator from '../QRCodeGenerator';

describe('QRCodeGenerator', () => {
  test('renderiza corretamente com valor válido', () => {
    render(<QRCodeGenerator value="https://agroverso.tec.br" />);
    const qr = screen.getByRole('img');
    expect(qr).toBeInTheDocument();
    expect(qr).toHaveAttribute('aria-label', expect.stringContaining('https://agroverso.tec.br'));
  });

  test('não renderiza QRCode quando o valor é vazio', () => {
    render(<QRCodeGenerator value="" />);
    expect(screen.getByText(/QR Code indisponível/i)).toBeInTheDocument();
  });

  test('não renderiza QRCode quando o valor é undefined', () => {
    // @ts-expect-error - testando valor inválido
    render(<QRCodeGenerator />);
    expect(screen.getByText(/QR Code indisponível/i)).toBeInTheDocument();
  });

  test('aceita customização de tamanho e cores', () => {
    render(
      <QRCodeGenerator
        value="https://agroverso.tec.br"
        size={200}
        fgColor="#FF0000"
        bgColor="#00FF00"
      />
    );
    const svg = screen.getByRole('img').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '200');
  });

  test('usa aria-label customizado se fornecido', () => {
    render(
      <QRCodeGenerator
        value="https://agroverso.tec.br"
        ariaLabel="QRCode personalizado para Agroverso"
      />
    );
    const qr = screen.getByRole('img');
    expect(qr).toHaveAttribute('aria-label', 'QRCode personalizado para Agroverso');
  });

  test('fallback de acessibilidade é exibido se valor for inválido', () => {
    render(<QRCodeGenerator value="   " />);
    expect(screen.getByText(/QR Code indisponível/)).toBeInTheDocument();
  });
});
