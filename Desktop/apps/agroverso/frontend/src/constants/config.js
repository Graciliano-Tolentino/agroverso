// =====================================================================================
// 📄 config.js | Agroverso – Configuração Global de Rotas Protegidas
// =====================================================================================
// 🔐 Finalidade:
//     • Armazena configurações sensíveis ou chaveadas que controlam rotas protegidas.
//     • Pode ser expandido para lidar com domínios, tokens públicos ou modo de autenticação fake.
// =====================================================================================

export const config = {
  modoFakeAutenticacao: false,
  nomeAplicacao: 'Agroverso',
  urlPadrao: 'https://agroverso.tec.br',
  fallback403: {
    titulo: 'Acesso negado',
    mensagem: 'Você não possui permissão para acessar esta área.',
  },
};
