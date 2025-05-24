// ==============================================================================
// 📄 themeToggle.cy.js | Cypress E2E – Validação do Componente ThemeToggle
// ==============================================================================
// 🎯 Verifica: alternância de tema, persistência em localStorage, acessibilidade
// ✅ Desenvolvido com sabedoria, força e beleza — Padrão Técnico 12/10 Agroverso
// ==============================================================================

describe('🔁 Componente ThemeToggle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve alternar para o modo escuro e salvar no localStorage', () => {
    cy.get('button[aria-label*="escuro"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.window().its('localStorage.agroverso_tema').should('eq', 'dark');
  });

  it('deve alternar para o modo claro e atualizar localStorage', () => {
    // Primeiro força o modo escuro
    cy.get('button[aria-label*="escuro"]').click();
    // Agora alterna para claro
    cy.get('button[aria-label*="claro"]').click();
    cy.get('html').should('not.have.class', 'dark');
    cy.window().its('localStorage.agroverso_tema').should('eq', 'light');
  });

  it('deve respeitar a preferência armazenada ao recarregar', () => {
    cy.get('button[aria-label*="escuro"]').click();
    cy.reload();
    cy.get('html').should('have.class', 'dark');
  });

  it('deve ter foco visível e aria-label corretamente definido', () => {
    cy.get('button')
      .focus()
      .should('have.attr', 'aria-label')
      .and('match', /tema/i);
    cy.focused().should('have.css', 'outline-style', 'solid');
  });
});
