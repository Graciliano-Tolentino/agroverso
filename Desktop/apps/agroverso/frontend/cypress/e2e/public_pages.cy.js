/*
  ==============================================================================
  📄 public_pages.cy.js | Cypress E2E – Testes de Rotas Públicas Agroverso
  📁 Diretório: cypress/e2e/
  🎯 Finalidade:
       Validar carregamento visual, lazy loading, fallback acessível
       e resiliência UX em rotas públicas da aplicação.

  💡 Rotas testadas:
       • /certificados
       • /validar/:codigo (válido e inválido)
       • /contato

  📆 Atualizado: 21/05/2025
  ✨ Desenvolvido com sabedoria, força e beleza
  ==============================================================================
*/

describe('🌿 Acesso a Rotas Públicas com Lazy Loading, Fallback e Acessibilidade', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('✅ /certificados exibe conteúdo e acessibilidade garantida', () => {
    cy.visit('/certificados');
    cy.contains(/Carregando/i).should('exist');

    // 🔁 Substituição semântica por regex resiliente
    cy.contains(/Verificador.*Certificados/i).should('be.visible');

    // ♿ Validação automática de acessibilidade
    cy.injectAxe();
    cy.checkA11y();
  });

  it('🧾 /validar/:codigo com código válido mostra resultado positivo', () => {
    cy.visit('/validar/ABC123');
    cy.contains(/Carregando/i).should('exist');
    cy.contains(/Certificado válido/i).should('be.visible');

    // ♿ Garantia de estrutura acessível
    cy.injectAxe();
    cy.checkA11y();
  });

  it('🚫 /validar/:codigo com código inválido exibe fallback amigável', () => {
    cy.visit('/validar/INVALIDO999');
    cy.contains(/Certificado não encontrado/i).should('be.visible');
    cy.get('[role="alert"]').should('exist');

    cy.injectAxe();
    cy.checkA11y();
  });
  it('📬 /contato exibe formulário funcional e validado com acessibilidade', () => {
    cy.visit('/contato');
    cy.contains(/Carregando/i).should('exist');

    // 📄 Verificação estrutural do formulário
    cy.get('form').should('exist');
    cy.get('input[name="nome"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('textarea[name="mensagem"]').should('be.visible');

    // ♿ Validação de acessibilidade automatizada
    cy.injectAxe();
    cy.checkA11y();
  });
});
