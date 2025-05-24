/*
  ==============================================================================
  📄 error_pages.cy.js | Cypress E2E – Testes de Páginas de Erro Agroverso
  📁 Diretório: cypress/e2e/
  🎯 Finalidade:
       Validar estrutura semântica, fallback visual e comportamento realista
       em situações de erro e falha de segurança (404, 403, /nao-encontrado).

  🧠 Destaques técnicos:
       • Substituição de validação textual por seletor acessível (`[role="alert"]`)
       • Interceptação de erro 403 com simulação de API
       • Cronometragem do tempo de exibição do fallback
       • Validação automática de acessibilidade (WCAG 2.1 AA)

  📆 Atualizado: 21/05/2025
  ✨ Desenvolvido com sabedoria, força e beleza
  ==============================================================================
*/

describe('🚫 Rotas de Erro e Comportamentos de Falha', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('📛 Rota inexistente exibe 404 com alerta semântico', () => {
    cy.visit('/rota-que-nao-existe', { failOnStatusCode: false });

    cy.get('[role="alert"]').should('exist');
    cy.get('[role="alert"]').invoke('text').should('include', 'Página não encontrada');

    cy.injectAxe();
    cy.checkA11y();
  });

  it('🚨 /nao-encontrado se comporta como 404 padrão', () => {
    cy.visit('/nao-encontrado', { failOnStatusCode: false });

    cy.get('[role="alert"]').should('exist');
    cy.get('[role="alert"]').invoke('text').should('include', 'Página não encontrada');

    cy.injectAxe();
    cy.checkA11y();
  });
  it('🚷 Intercepta erro 403 com fallback visual acessível e cronometrado', () => {
    // 🔁 Simula uma API protegida com resposta 403 após atraso
    cy.intercept('GET', '/api/admin/usuarios', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000); // ⏳ atraso de 1 segundo para testar fallback UX
      });
      req.reply({
        statusCode: 403,
        body: {
          mensagem: 'Acesso negado',
        },
      });
    }).as('403demorado');

    cy.loginAs('admin'); // Mesmo com papel correto, a API simulará erro
    const start = Date.now();

    cy.visit('/admin/usuarios');
    cy.wait('@403demorado');

    // 🔍 Verifica estrutura acessível
    cy.get('[role="alert"]').should('exist');
    cy.get('[role="alert"]').invoke('text').should('include', 'Acesso negado');

    // ⏱️ Cronometragem do tempo de exibição do alerta
    cy.get('[role="alert"]').then(() => {
      const elapsed = Date.now() - start;
      expect(elapsed).to.be.lessThan(2000); // UX deve responder antes de 2s
    });

    cy.injectAxe();
    cy.checkA11y();
  });
});
