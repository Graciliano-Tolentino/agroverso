/*
  ==============================================================================
  📄 protected_route.cy.js | Cypress E2E – Testes de Rotas Protegidas Agroverso
  📁 Diretório: cypress/e2e/
  🎯 Finalidade:
       Validar proteção, fallback visual, autorização e requisições seguras.
       Testa a experiência do usuário, o comportamento do sistema e o fluxo RBAC.

  🔐 Coberturas:
       • Sessão inválida (sem login)
       • Papel não autorizado (user)
       • Acesso autorizado (admin)
       • Feedback visual empático
       • Headers seguros (Authorization)
       • Modularização por comandos personalizados

  📆 Atualizado: 21/05/2025
  ✨ Desenvolvido com sabedoria, força e beleza
  ==============================================================================
*/

describe('🔐 Acesso à Rota Protegida /admin e /admin/usuarios', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('❌ Redireciona para /login se não autenticado', () => {
    cy.visit('/admin');
    cy.assertRedirectedToLogin();
  });

  it('🚫 Bloqueia acesso se papel for inválido (user)', () => {
    cy.loginAs('user');
    cy.visit('/admin');
    cy.contains('Acesso negado').should('be.visible');
    cy.contains(/redirecionado em \d+ segundos?/i).should('exist');
    cy.url().should('not.include', '/admin');
  });

  it('✅ Acesso permitido a /admin para papel admin', () => {
    cy.loginAs('admin');
    cy.visit('/admin');
    cy.contains('Dashboard Administrativo').should('be.visible');
    cy.url().should('include', '/admin');
  });

  it('✅ Acesso permitido a /admin/usuarios para papel admin', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/admin/usuarios',
      },
      (req) => {
        expect(req.headers).to.have.property('authorization');
        expect(req.headers.authorization).to.include('Bearer');
      }
    ).as('getUsuarios');

    cy.loginAs('admin');
    cy.visit('/admin/usuarios');
    cy.wait('@getUsuarios');
    cy.contains('Usuários').should('be.visible');
    cy.url().should('include', '/admin/usuarios');
  });
  it('🔁 Exibe fallback visual com contador regressivo (UX acessível)', () => {
    cy.loginAs('user');
    cy.visit('/admin');

    cy.contains('Acesso negado').should('be.visible');
    cy.contains(/Você será redirecionado em \d+ segundo/).should('be.visible');

    cy.get('[role="alert"]')
      .should('have.attr', 'aria-live', 'assertive')
      .invoke('text')
      .should('include', 'redirecionado');

    cy.wait(3100); // ⏳ aguarda para garantir o redirecionamento automático
    cy.url().should('not.include', '/admin');
  });
});
