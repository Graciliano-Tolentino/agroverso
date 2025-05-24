// =============================================================================
// 📄 cypress.config.js | Configuração oficial do Cypress Agroverso 12/10
// 📁 Diretório: frontend/
// 🎯 Finalidade:
//     - Configurar ambiente base de testes E2E
//     - Integrar suporte a acessibilidade com cypress-axe
//     - Tornar a URL base flexível para qualquer ambiente (CI, staging, preview, dev)
//
// 🌱 Refatorado com sabedoria, força e beleza para máxima portabilidade
// =============================================================================

import { defineConfig } from 'cypress';

const baseUrl = process.env.CYPRESS_BASE_URL || 'http://localhost:3000';
console.log(`🌍 Cypress baseUrl detectado: ${baseUrl}`);

export default defineConfig({
  e2e: {
    baseUrl,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      // Ponto de entrada para hooks futuros (coverage, plugins, reporters)
      return config;
    }
  }
});
