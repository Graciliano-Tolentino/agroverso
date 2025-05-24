// =====================================================================================
// 🧱 fakeUserBuilder.ts | Agroverso – Utilitário de Criação de Usuário Simulado
// =====================================================================================
// Responsável por montar o objeto de usuário no modo fake com segurança e consistência
// Ideal para uso em AuthContext, testes e simulações em PWA ou modo offline
// Desenvolvido com sabedoria, força e beleza — padrão Agroverso 12/10
// =====================================================================================

export function buildFakeUser(match) {
  return {
    nome: match.nome,
    email: match.usuario,
    permissoes: match.permissoes || [],
    perfil: match.perfil || 'leitor',
  };
}
