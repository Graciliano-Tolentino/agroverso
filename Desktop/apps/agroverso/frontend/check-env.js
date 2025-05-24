// ==============================================================================
// 🧪 check-env.js | Agroverso – Verificador de Variáveis de Ambiente (.env)
// 📁 Local: raiz do frontend
// 🎯 Finalidade: impedir builds inseguros ou mal configurados via CI/CD ou local
// ✨ Desenvolvido com sabedoria, força e beleza – Padrão técnico 12/10 Agroverso
// ==============================================================================

// 🌿 Leitura avançada de múltiplos arquivos .env conforme ambiente
const dotenvFlow = require('dotenv-flow');
const fs = require('fs');

dotenvFlow.config(); // Lê automaticamente .env, .env.local, .env.staging etc.

console.log('\n🔍 Iniciando verificação das variáveis de ambiente (.env)...');

// =============================================================
// ✅ Definição das variáveis obrigatórias por qualquer ambiente
// =============================================================
const requiredVars = [
  'VITE_ENABLE_FAKE_DATA',
  'VITE_API_BASE_URL',
  'VITE_ENVIRONMENT',
  'VITE_PUBLIC_URL',
  'VITE_SW_ENABLED',
];

// =============================================================
// ⚙️ Variáveis opcionais (emitem alerta mas não bloqueiam build)
// =============================================================
const optionalVars = [
  'VITE_USE_MOCK_CERTIFICATES',
  'VITE_ANALYTICS_ID',
];

// =============================================================
// 🏷️ Adiciona variável de versão obrigatória para produção e staging
// =============================================================
const envContext = process.env.VITE_ENVIRONMENT || 'undefined';
if (['production', 'staging'].includes(envContext)) {
  requiredVars.push('VITE_APP_VERSION');
}

// ==============================================================================
// 🔍 Verificação e classificação das variáveis carregadas
// ==============================================================================

let missingRequired = [];
let missingOptional = [];

for (const key of requiredVars) {
  if (!process.env[key]) {
    missingRequired.push(key);
  }
}

for (const key of optionalVars) {
  if (!process.env[key]) {
    missingOptional.push(key);
  }
}

// ==============================================================================
// 🕵️ Impressão de variáveis carregadas (modo seguro – apenas STAGING)
// ==============================================================================
if (envContext === 'staging') {
  console.log('\n🧪 Variáveis carregadas no ambiente STAGING:');
  requiredVars.forEach((key) => {
    const value = process.env[key] || '(não definida)';
    console.log(`   ${key} = ${value}`);
  });
  optionalVars.forEach((key) => {
    const value = process.env[key] || '(não definida)';
    console.log(`   ${key} = ${value}`);
  });
  console.log('');
}

// ==============================================================================
// 📊 Resultado final e controle de saída
// ==============================================================================

if (missingRequired.length > 0) {
  console.error('\n❌ ERRO CRÍTICO: As seguintes variáveis obrigatórias estão ausentes:');
  missingRequired.forEach((key) => {
    console.error(`   - ${key}`);
  });
  console.error('\n💥 Build abortado. Corrija seu .env ou defina variáveis no ambiente antes de continuar.\n');
  process.exit(1); // ❌ Encerra com erro
}

if (missingOptional.length > 0) {
  console.warn('\n⚠️ Aviso: Variáveis opcionais não definidas (poderão usar fallback padrão):');
  missingOptional.forEach((key) => {
    console.warn(`   - ${key}`);
  });
  console.warn('');
}

console.log('✅ Ambiente verificado com sucesso.');
console.log(`📦 Modo atual: ${envContext}`);
if (process.env.VITE_APP_VERSION) {
  console.log(`🏷️ Versão da aplicação: ${process.env.VITE_APP_VERSION}`);
}
console.log('🚀 Verificação concluída com sabedoria, força e beleza.\n');
