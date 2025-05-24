// =====================================================================================
// 🔐 auth.fake.ts | Agroverso – Autenticação Simulada (modo VITE_ENABLE_FAKE_DATA)
// =====================================================================================
// Responsável por validar credenciais locais com base em `admin.json`
// Verifica senha base64, permissões, perfil e status de ativação
// Desenvolvido com sabedoria, força e beleza — padrão técnico 12/10
// =====================================================================================

import { buildFakeUser } from './fakeUserBuilder';

export async function loginFake(email: string, senha: string) {
  const response = await fetch('/data/admin.json');
  if (!response.ok) {
    throw new Error(`[FAKE_LOGIN] Falha ao carregar admin.json: ${response.status}`);
  }

  const admins = await response.json();

  const match = admins.find(
    (adm) =>
      adm.usuario?.toLowerCase() === email.toLowerCase() &&
      atob(adm.senhaBase64) === senha
  );

  if (!match) {
    throw new Error('Credenciais inválidas (modo simulado)');
  }

  if (match.ativo === false) {
    throw new Error('Usuário inativo');
  }

  return {
    token: 'fake-jwt-token',
    user: buildFakeUser(match),
  };
}
