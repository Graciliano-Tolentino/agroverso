/*
  ==============================================================================
  📄 Testes: AvisoRedirecionamento.test.jsx
  🎯 Verifica acessibilidade, redirecionamento, contagem e mensagem visual
  🧪 Frameworks: React Testing Library + Jest
  ==============================================================================
*/

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import AvisoRedirecionamento from '../AvisoRedirecionamento';

// 🧪 Mock para navegação do react-router-dom
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: jest.fn(),
  };
});

describe('AvisoRedirecionamento', () => {
  const navigateMock = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('deve renderizar a mensagem personalizada', () => {
    render(
      <MemoryRouter>
        <AvisoRedirecionamento mensagem="Acesso negado." />
      </MemoryRouter>
    );
    expect(screen.getByText(/acesso negado/i)).toBeInTheDocument();
  });

  it('deve exibir contador regressivo visível', () => {
    render(
      <MemoryRouter>
        <AvisoRedirecionamento tempo={4000} />
      </MemoryRouter>
    );

    expect(screen.getByText(/você será redirecionado em 4 segundos/i)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/em 3 segundos/i)).toBeInTheDocument();
  });

  it('deve redirecionar após o tempo configurado', () => {
    render(
      <MemoryRouter>
        <AvisoRedirecionamento destino="/admin" tempo={3000} />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(navigateMock).toHaveBeenCalledWith('/admin', { replace: true });
  });

  it('deve conter atributos de acessibilidade obrigatórios', () => {
    render(
      <MemoryRouter>
        <AvisoRedirecionamento />
      </MemoryRouter>
    );

    const container = screen.getByRole('alert');
    expect(container).toHaveAttribute('aria-live', 'assertive');
    expect(container).toHaveAttribute('tabindex', '-1');
  });
});
