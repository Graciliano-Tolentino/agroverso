import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

const TestComponent = () => {
  const { user, login } = useAuth();
  React.useEffect(() => {
    login('joana@agroverso.tec.br', '123456');
  }, []);
  return <div data-testid="nome">{user?.nome || 'sem usuário'}</div>;
};

test('login fake simulado com sucesso', async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await waitFor(() =>
    expect(screen.getByTestId('nome').textContent).toBe('Joana Silva')
  );
});
