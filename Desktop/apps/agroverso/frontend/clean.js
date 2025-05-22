#!/usr/bin/env node

/**
 * =============================================================================
 * 🧹 clean.js | Agroverso – Script de Limpeza Automatizada em Node.js
 * 📁 Local de Execução: raiz do frontend (agroverso/frontend)
 * ✨ Desenvolvido com sabedoria, força e beleza
 * =============================================================================
 */

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const dirName = path.basename(cwd);
const packageJsonPath = path.join(cwd, "package.json");

// 🛡️ Validação de ambiente correto
if (dirName !== "frontend" || !fs.existsSync(packageJsonPath)) {
  console.error("❌ Este script deve ser executado dentro do diretório 'frontend' do projeto Agroverso.");
  process.exit(1);
}

// 🗂️ Log persistente com timestamp
const logFilePath = path.join(cwd, "clean.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
const log = (msg) => {
  const timestamp = new Date().toISOString();
  console.log(msg);
  logStream.write(`[${timestamp}] ${msg}\n`);
};

log("🔍 Iniciando limpeza do frontend Agroverso...");
// 🔁 Função para remoção segura (pastas e arquivos no nível raiz)
const safeRemove = (target) => {
  const fullPath = path.join(cwd, target);
  if (fs.existsSync(fullPath)) {
    try {
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        log(`🚮 Diretório removido: ${target}`);
      } else {
        fs.unlinkSync(fullPath);
        log(`🚮 Arquivo removido: ${target}`);
      }
    } catch (err) {
      log(`⚠️ Erro ao remover ${target}: ${err.message}`);
    }
  } else {
    log(`ℹ️ Não encontrado: ${target}`);
  }
};

// 📁 1. Diretórios de controle de versão
safeRemove(".git");

// 📄 2. Arquivos redundantes
[".gitignore", ".env.exemple", "package.notes.md", "Vercel.json"].forEach(safeRemove);

// 📦 3. Pastas de build e dependências
["node_modules", "dist", "build", ".eslintcache"].forEach(safeRemove);

// 🧼 4. Função recursiva para remover arquivos específicos em qualquer profundidade
const deleteSystemFiles = (dir, targetName, countObj) => {
  try {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        deleteSystemFiles(fullPath, targetName, countObj);
      } else if (entry.name === targetName) {
        try {
          fs.unlinkSync(fullPath);
          countObj.count++;
          log(`🧹 Arquivo removido: ${fullPath}`);
        } catch (err) {
          log(`⚠️ Falha ao remover ${fullPath}: ${err.message}`);
        }
      }
    });
  } catch (err) {
    log(`⚠️ Erro ao acessar ${dir}: ${err.message}`);
  }
};

// 🧾 5. Executar limpeza de arquivos do sistema com contador
const dsStoreCount = { count: 0 };
const thumbsCount = { count: 0 };

deleteSystemFiles(cwd, ".DS_Store", dsStoreCount);
deleteSystemFiles(cwd, "Thumbs.db", thumbsCount);

// 📊 Feedback semântico com contador
log(dsStoreCount.count > 0
  ? `✅ ${dsStoreCount.count} arquivos .DS_Store removidos`
  : `ℹ️ Nenhum arquivo .DS_Store encontrado`);

log(thumbsCount.count > 0
  ? `✅ ${thumbsCount.count} arquivos Thumbs.db removidos`
  : `ℹ️ Nenhum arquivo Thumbs.db encontrado`);
// 🎯 Finalização com assinatura, horário e encerramento de log
log("");
log("✅ Limpeza concluída com sucesso!");
log(`📂 Diretório atual: ${cwd}`);
log(`📅 Execução finalizada em: ${new Date().toLocaleString()}`);
log("✨ Obrigado por manter o projeto Agroverso limpo, modular e belo.");
logStream.end();
