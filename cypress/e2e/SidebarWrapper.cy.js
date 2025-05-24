/*
  ==============================================================================
  📄 SidebarWrapper.cy.js | Cypress E2E – Retry Semântico, Fallback Acessível, GTM
  📁 Diretório: cypress/e2e/
  🎯 Finalidade:
       • Verificar fallback com mensagem clara
       • Executar retries múltiplos com `retry(times)`
       • Validar GTM com `expectRetryEvent(count)` sem `cy.wait`
  📆 Atualizado: 21/05/2025
  ✨ Desenvolvido com sabedoria, força e beleza
  ==============================================================================
*/

let originalLazy;
let retryCount = 0;

// 🔁 Retry genérico com controle de quantas vezes
function retry(times = 1) {
  for (let i = 0; i < times; i++) {
    cy.contains(/Tentar novamente/i).click();
  }
}

// 📊 Validador reativo do evento GTM de retry
function expectRetryEvent(expectedCount = 1) {
  cy.window().its('dataLayer').should((dataLayer) => {
    const eventos = dataLayer.filter((e) => e.event === 'tentativa_retry_sidebar');
    expect(eventos.length).to.be.gte(expectedCount);

    eventos.forEach((evento) => {
      expect(evento.component).to.equal('SidebarWrapper');
      expect(evento.timestamp).to.be.a('string');
    });
  });
}

describe('🧱 SidebarWrapper – Retry Múltiplos com GTM Tracking Reativo', () => {
  beforeEach(() => {
    cy.visit('/admin', {
      onBeforeLoad(win) {
        originalLazy = win.React.lazy;

        win.React.lazy = () => {
          retryCount += 1;
          if (retryCount === 1 || retryCount === 2) {
            throw new Error(`Erro simulado tentativa ${retryCount}`);
          }
          return originalLazy(() => import('@/components/admin/Sidebar'));
        };
      },
      failOnStatusCode: false,
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.React.lazy = originalLazy;
      retryCount = 0;
    });
  });

  it('💬 Exibe fallback com mensagem clara e acessível', () => {
    cy.get('[role="alert"]').should('exist');
    cy.get('[role="alert"]').should('contain.text', 'Erro ao carregar a barra lateral');
  });

  it('🔁 Executa retries múltiplos com controle reativo', () => {
    retry(1); // 1ª tentativa
    cy.get('[role="alert"]').should('exist');

    retry(1); // 2ª tentativa
    cy.get('[role="alert"]').should('not.exist');
    cy.get('[data-testid="sidebar"]').should('exist');
  });
  it('📊 Registra múltiplos eventos GTM após retries consecutivos (com expectRetryEvent)', () => {
    retry(2); // Executa duas tentativas seguidas

    // 📈 Verifica reativamente se o evento GTM foi registrado corretamente
    expectRetryEvent(2); // Espera pelo menos 2 eventos de retry no dataLayer
  });
});
