import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useProtectedAccess } from '@/hooks/useProtectedAccess';

// ✅ Mocks de contexto
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useProtectedAccess', () => ({
  useProtectedAccess: jest.fn(),
}));

jest.mock('@/components/ui/AvisoRedirecionamento', () => () => (
  <div data-testid="aviso-redirecionamento">Redirecionando...</div>
));

describe('ProtectedRoute', () => {
  const children = <div>Conteúdo protegido</div>;

  it('exibe loading quando `loading=true`', () => {
    useAuth.mockReturnValue({ user: null, token: null, loading: true });
    useProtectedAccess.mockReturnValue({ autorizado: false, erros: [] });

    render(
      <MemoryRouter>
        <ProtectedRoute>{children}</ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/Verificando acesso/i)).toBeInTheDocument();
  });

  it('exibe fallback 403 quando usuário não tem permissão', () => {
    useAuth.mockReturnValue({ user: { role: 'viewer' }, token: 'fake-token', loading: false });
    useProtectedAccess.mockReturnValue({ autorizado: false, erros: ['403'] });

    render(
      <MemoryRouter>
        <ProtectedRoute roles="admin">{children}</ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('aviso-redirecionamento')).toBeInTheDocument();
  });

  it('exibe conteúdo quando usuário está autorizado', () => {
    useAuth.mockReturnValue({ user: { role: 'admin' }, token: 'valid-token', loading: false });
    useProtectedAccess.mockReturnValue({ autorizado: true, erros: [] });

    render(
      <MemoryRouter>
        <ProtectedRoute roles="admin">{children}</ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
  });
});
