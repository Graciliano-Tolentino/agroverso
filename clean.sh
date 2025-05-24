#!/bin/bash

# ==============================================================================
# 🧹 clean.sh | Agroverso – Script de Limpeza Automatizada de Projeto Frontend
# 📁 Local: raiz do frontend (agroverso/frontend)
# 🔐 Segurança integrada | 📜 Logging com timestamp | 🌿 Arquitetura modular
# ✨ Desenvolvido com sabedoria, força e beleza
# ==============================================================================

# 🛡️ Validação de diretório correto (proteção contra execuções indevidas)
dir_name=$(basename "$PWD")
if [ "$dir_name" != "frontend" ] || [ ! -f "package.json" ]; then
  echo "❌ Este script deve ser executado DENTRO do diretório 'frontend' do projeto Agroverso."
  exit 1
fi

# 🗂️ Logging com timestamp ISO em cada linha (stdout + log persistente)
exec > >(awk '{ print strftime("[%Y-%m-%dT%H:%M:%S%z]"), $0; fflush(); }' | tee -a clean.log) 2>&1

echo "🔍 Iniciando limpeza do frontend Agroverso..."

# ==============================================================================
# 🧩 Funções reutilizáveis – sabedoria aplicada à estrutura
# ==============================================================================

# 🔁 remove_item: Remove um item (arquivo ou diretório) com feedback semântico
remove_item() {
  local target="$1"
  if [ -e "$target" ]; then
    if rm -rf "$target" 2>/dev/null; then
      echo "🚮 Removido: $target"
    else
      echo "⚠️ Falha ao remover: $target"
    fi
  else
    echo "ℹ️ Não encontrado: $target"
  fi
}

# 🔁 clean_list: Aplica remove_item a uma lista nomeada de arquivos/diretórios
clean_list() {
  local label="$1"
  shift
  local items=("$@")
  echo "📦 Limpando: $label"
  for item in "${items[@]}"; do
    remove_item "$item"
  done
}

# 🔍 scan_and_clean_system_files: Varre o sistema e remove arquivos por nome
scan_and_clean_system_files() {
  local filename="$1"
  local count=0

  while IFS= read -r file; do
    if rm -f "$file" 2>/dev/null; then
      echo "🧹 Removido: $file"
      ((count++))
    else
      echo "⚠️ Falha ao remover: $file"
    fi
  done < <(find . -type f -name "$filename")

  if [ "$count" -gt 0 ]; then
    echo "✅ $count arquivos $filename removidos"
  else
    echo "ℹ️ Nenhum arquivo $filename encontrado"
  fi
}

# ==============================================================================
# 🚀 Execução das rotinas de limpeza com funções reutilizáveis
# ==============================================================================

# 📁 1. Diretórios de controle de versão
clean_list "Controle de Versão" ".git"

# 📄 2. Arquivos redundantes e supérfluos
clean_list "Arquivos Supérfluos" \
  ".gitignore" \
  ".env.exemple" \
  "package.notes.md" \
  "Vercel.json"

# 📦 3. Pastas de build e dependências locais
clean_list "Build e Dependências Locais" \
  "node_modules" \
  "dist" \
  "build" \
  ".eslintcache"

# 🧼 4. Arquivos do sistema (macOS/Windows)
scan_and_clean_system_files ".DS_Store"
scan_and_clean_system_files "Thumbs.db"

# ==============================================================================
# 🎯 Encerramento com assinatura simbólica Agroverso
# ==============================================================================

echo ""
echo "✅ Limpeza concluída com sucesso!"
echo "📂 Diretório atual: $(pwd)"
echo "🗂️  Log completo salvo em: clean.log"
echo "📅 Data e hora de execução: $(date '+%Y-%m-%d %H:%M:%S')"
echo "✨ Obrigado por manter o projeto Agroverso limpo, modular e belo."

# 🛑 Fim do script
exit 0
