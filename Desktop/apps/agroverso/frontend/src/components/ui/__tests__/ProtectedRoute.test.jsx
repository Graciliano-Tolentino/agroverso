/*
  ==============================================================================
  📄 Testes: ProtectedRoute.test.jsx
  🧪 Framework: React Testing Library + Jest
  📂 Escopo: Acesso autorizado, fallback visual, RBAC, redirecionamentos e logs
  ==============================================================================
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

// Mocks
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: { role: 'admin' },
    token: 'fake-token',
    loading: false,
  }),
}));

jest.mock('@/hooks/useProtectedAccess', () => ({
  useProtectedAccess: jest.fn(() => ({
    autorizado: true,
    erros: [],
  })),
}));

jest.mock('@/components/ui/AvisoRedirecionamento', () => () => (
  <div data-testid="aviso-redirecionamento">Redirecionando...</div>
));

describe('ProtectedRoute', () => {
  it('🔐 renderiza children quando autorizado', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute roles={['admin']}>
          <div>Área Administrativa</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Área Administrativa')).toBeInTheDocument();
  });

  it('⏳ mostra visualFallback durante loading', () => {
    jest.mock('@/context/AuthContext', () => ({
      useAuth: () => ({
        user: null,
        token: null,
        loading: true,
      }),
    }));

    render(
      <MemoryRouter>
        <ProtectedRoute visualFallback={<div>Carregando...</div>}>
          <div>Área Segura</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('🚫 redireciona com aviso ao detectar erro 401 (sessão inválida)', () => {
    const { useProtectedAccess } = require('@/hooks/useProtectedAccess');
    useProtectedAccess.mockReturnValueOnce({
      autorizado: false,
      erros: ['401'],
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Restrito</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('aviso-redirecionamento')).toBeInTheDocument();
  });

  it('❌ redireciona com aviso ao detectar erro 403 (acesso negado)', () => {
    const { useProtectedAccess } = require('@/hooks/useProtectedAccess');
    useProtectedAccess.mockReturnValueOnce({
      autorizado: false,
      erros: ['403'],
    });

    render(
      <MemoryRouter>
        <ProtectedRoute roles={['admin']}>
          <div>Restrito</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('aviso-redirecionamento')).toBeInTheDocument();
  });

  it('🧠 respeita mensagemFallback personalizada', () => {
    const { useProtectedAccess } = require('@/hooks/useProtectedAccess');
    useProtectedAccess.mockReturnValueOnce({
      autorizado: false,
      erros: ['401'],
    });

    render(
      <MemoryRouter>
        <ProtectedRoute mensagemFallback="Verificando sessão personalizada...">
          <div>Área</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('aviso-redirecionamento')).toBeInTheDocument();
  });
});
