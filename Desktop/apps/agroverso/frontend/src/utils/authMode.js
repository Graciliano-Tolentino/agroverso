/*
  ==============================================================================
  📄 authMode.js
  📁 src/utils
  ✍️ Desenvolvido por: Graciliano Tolentino
  📅 Atualizado em: 22/05/2025
  🎯 Define o modo atual de autenticação da aplicação

       • Pode ser usado em qualquer parte do sistema
       • Baseado em variável de ambiente ou override externo
       • Ideal para testes, simulações e ambientes controlados

  🌍 Framework Agroverso — Modularidade e Testabilidade com Clareza
  ==============================================================================
*/

let forcedMode = null;

/**
 * Define forçadamente o modo fake para teste
 * @param {boolean} value
 */
export function setFakeAuthMode(value) {
  forcedMode = value;
}

/**
 * Retorna se o modo fake está habilitado
 * @returns {boolean}
 */
export function isFakeAuthEnabled() {
  if (typeof forcedMode === 'boolean') return forcedMode;
  return import.meta.env.VITE_ENABLE_FAKE_DATA === 'true';
}
