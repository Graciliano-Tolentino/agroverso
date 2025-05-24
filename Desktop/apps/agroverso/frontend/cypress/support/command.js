/*
  ==============================================================================
  📄 commands.js | Comandos Customizados – Cypress
  📁 Diretório: cypress/support/
  ✨ Adicionado: assertRedirectedToLogin() – Redirecionamento semântico para /login
  ==============================================================================
*/

Cypress.Commands.add('assertRedirectedToLogin', () => {
  cy.url().should('include', '/login');
  cy.contains('Login').should('be.visible');
});
