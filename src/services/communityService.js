// =====================================================================================
// 📄 communityService.js | Agroverso – Serviço de Membros da Comunidade
// =====================================================================================
// 🎯 Finalidade:
//     • Fornecer dados de membros reais ou simulados, com suporte a integração real com API externa.
//     • Compatível com mocks locais, fallback seguro, loading controlado e testes automatizados.
// =====================================================================================

/**
 * Simulação de dados locais
 * Pode ser substituído por uma chamada real com fetch/axios.
 */
const mockMembros = [
  { id: '1', nome: 'João', bio: 'Produtor rural há 20 anos em Goiás. Atua com práticas regenerativas e cultivo orgânico certificado.' },
  { id: '2', nome: 'Maria', bio: 'Especialista em agronomia digital e educadora em agroecologia no Nordeste.' },
  { id: '3', nome: 'Carlos', bio: 'Pesquisador de tecnologias verdes e entusiasta de agricultura de precisão.' },
];

/**
 * 🔁 Função principal de obtenção de membros da comunidade
 * Pode ser integrada a uma API real com `fetch` ou `axios` no futuro.
 */
export async function getMembros() {
  try {
    // Simula latência de rede
    const delay = 1000;

    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(mockMembros);
      }, delay)
    );

    console.info('[CommunityService] Membros carregados com sucesso:', response);
    return response;
  } catch (error) {
    console.error('[CommunityService] Falha ao carregar membros:', error);
    throw new Error('Erro ao buscar membros da comunidade.');
  }
}
