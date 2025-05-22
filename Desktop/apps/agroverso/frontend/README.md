## 📄 `README.md` – **Parte 1/3**

### Agroverso Frontend – Interface Web de Alta Tecnologia 🌱🚀

Bem-vindo ao repositório **Agroverso Frontend** – a interface oficial da plataforma Agroverso, desenvolvida com foco em tecnologia **regenerativa**, **baixo carbono** e **alta rastreabilidade**.

Este projeto adota o padrão **High Tech Agroverso**, onde cada componente é concebido com:

* **Sabedoria:** aplicação rigorosa de boas práticas e conhecimento acumulado.
* **Força:** arquitetura escalável, segura e resiliente.
* **Beleza:** estética visual alinhada à clareza do código.

---

## 📦 Estrutura de Arquivos

A organização do projeto segue a arquitetura recomendada pelo Vite e o padrão de separação de responsabilidades por domínio lógico:

```
📦 agroverso-frontend/
├── index.html                  # Entry point da aplicação (Vite SPA)
├── package.json                # Scripts, dependências e metadados do projeto
├── vite.config.js              # Configurações Vite (plugins, aliases, env)
├── 📁 src/                     # Código-fonte principal
│   ├── main.tsx                # Entrada React + bootstrap do app
│   ├── App.tsx                 # Componente raiz da aplicação
│   ├── 📁 components/          # Componentes UI reutilizáveis
│   ├── 📁 pages/               # Páginas e rotas
│   ├── 📁 context/             # Contextos globais (auth, tema, etc.)
│   ├── 📁 hooks/               # Hooks customizados (useAuth, useLogger, etc.)
│   └── 📁 assets/              # Imagens, ícones, estilos e fontes
├── 📁 public/                  # Arquivos estáticos acessíveis diretamente
├── .env.example                # Modelo base das variáveis de ambiente
├── README.md                   # Este arquivo
└── outros arquivos (.gitignore, tsconfig, etc.)
```

---

## 🔐 Configuração de Ambiente por Contexto

O Agroverso utiliza múltiplos ambientes de execução, cada um com sua respectiva configuração `.env`. As variáveis de ambiente **devem sempre começar com `VITE_`** para serem reconhecidas no build.

| Arquivo           | Ambiente        | Descrição                                                             |
| ----------------- | --------------- | --------------------------------------------------------------------- |
| `.env.local`      | Desenvolvimento | Dados simulados, SW desativado, recursos isolados                     |
| `.env.staging`    | Homologação     | API real, cache desativado, rastreabilidade ativa                     |
| `.env.production` | Produção final  | API real, PWA ativo, SEO indexável, versionamento e conformidade LGPD |

Para validar o ambiente antes do build, execute:

```bash
npm run check-env
```

## 🚀 Comandos de Desenvolvimento

Siga os comandos abaixo no terminal para iniciar, testar e gerar a aplicação:

```bash
# 1. Instala as dependências do projeto
npm install

# 2. Inicia o servidor de desenvolvimento com hot reload (porta padrão: 5173)
npm run dev

# 3. Gera build de produção otimizada para a pasta dist/
npm run build

# 4. Pré-visualiza o build localmente
npm run preview

# 5. Verifica se as variáveis de ambiente obrigatórias estão corretamente definidas
npm run check-env
```

---

## 🌐 Progressive Web App (PWA) e SEO

O Agroverso é uma **SPA otimizada como PWA**, com suporte a uso **offline**, **instalação em dispositivos móveis** e **indexação segura** em buscadores.

| Variável               | Função                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| `VITE_SW_ENABLED=true` | Ativa o Service Worker (cache inteligente + funcionamento offline) |
| `VITE_SEO_INDEX=true`  | Permite indexação por buscadores (Google, Bing, etc.)              |

⚠️ Em ambientes como `staging`, é recomendado:

```env
VITE_SEO_INDEX=false
VITE_SW_ENABLED=false
```

Para evitar indexação acidental e garantir testes limpos.

---

## 🎯 Feature Flags (Funcionalidades Ativáveis)

O sistema permite habilitar/desabilitar módulos específicos via `.env`, sem reimplantar o código. Use a variável:

```env
VITE_FEATURE_FLAGS=certificados,painelAI
```

No código, use:

```ts
const flags = import.meta.env.VITE_FEATURE_FLAGS?.split(',');
if (flags.includes('painelAI')) {
  renderPainelAI();
}
```

Essa abordagem é ideal para:

* *Progressive rollout*;
* Testes A/B;
* Ativação por cliente ou região;
* Reversão rápida de funcionalidades sem rebuild.

---

## 🏷️ Versionamento e Rastreabilidade de Build

Para cada build em produção, defina as variáveis:

```env
VITE_APP_VERSION=v1.0.3
VITE_BUILD_ID=vercel-main-commit-a1b2c3d4
VITE_PUBLIC_DEPLOY_TIMESTAMP=2025-05-22T17:00:00Z
```

Esses valores podem ser exibidos no painel admin ou logados no console:

```ts
console.info(`Agroverso ${import.meta.env.VITE_APP_VERSION} | Build: ${import.meta.env.VITE_BUILD_ID}`);
```

## ☁️ Deploy Seguro e Multiplataforma

Após gerar o build com `npm run build`, o conteúdo da pasta `dist/` estará pronto para deploy. O Agroverso é uma **Single Page Application (SPA)** e exige que o servidor esteja configurado para redirecionar todas as rotas para `index.html`.

| Provedor                | Instruções Específicas                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vercel**              | Deploy contínuo automático. Configure as variáveis de ambiente (`.env.production`) no painel. Ative redirecionamento SPA no `vercel.json` se necessário. |
| **Netlify**             | Configure `_redirects` com `/* /index.html 200`. Use a interface Netlify para definir variáveis `VITE_`.                                                 |
| **GitHub Pages**        | Requer ferramenta como `vite-plugin-gh-pages`. Habilite `base` em `vite.config.js`. Evite usar PWA ativa para evitar cache em CDN.                       |
| **AWS S3 + CloudFront** | Faça upload da pasta `dist/` no S3. No CloudFront, ative roteamento SPA. Use Secrets Manager para variáveis protegidas se necessário.                    |

---

## 🔄 CI/CD, Auditoria e Automação

* **Auditoria de Ambiente**: Execute `npm run check-env` em qualquer pipeline antes do build.
* **Versão e Build ID**: Use `VITE_APP_VERSION`, `VITE_BUILD_ID` e `VITE_PUBLIC_DEPLOY_TIMESTAMP`.
* **Observabilidade**: Configure `VITE_SENTRY_DSN` para rastreamento de erros e `VITE_ANALYTICS_ID` para métricas reais.
* **Segurança**: Nunca inclua `.env` em commits. Use `.env.production` somente via secrets do provedor.

---

## 🤝 Contribuição Técnica e Filosofia

### 🧪 Contribuição Técnica

Quer colaborar com o Agroverso Frontend?

1. Faça um fork do repositório.
2. Crie uma branch clara: `feat/nome-da-feature`, `fix/ajuste-nome`, etc.
3. Envie um Pull Request bem descrito e conciso.
4. Execute `npm run check-env` e `npm run build` antes de abrir o PR.
5. Escreva testes (se aplicável) e atualize a documentação relacionada.

> ✨ Todo código enviado será revisado por pares. Nosso foco é manter o padrão técnico de excelência Agroverso (12/10).

---

### 🌱 Filosofia Agroverso: Sabedoria, Força e Beleza

* **Sabedoria:** Domínio consciente das ferramentas, respeito às boas práticas, humildade para aprender e ensinar.
* **Força:** Arquiteturas resilientes, decisões técnicas seguras, escalabilidade, integridade e segurança.
* **Beleza:** Interfaces acessíveis, código legível, design emocional e construção cooperativa de futuro.

> Toda contribuição deve refletir esses três pilares, não apenas no código, mas nas intenções que o movem.

---

## 📜 Licença e Referências

Este projeto está licenciado sob a **Licença MIT**. Você pode usá-lo, modificá-lo e distribuí-lo livremente, desde que preserve os créditos originais.

### 🔗 Links Úteis

* 🌐 [Agroverso – Site Oficial](#) *(adicionar link quando disponível)*
* 🧠 [Documentação do Vite](https://vitejs.dev/)
* ⚛️ [Documentação do React](https://reactjs.org/)
* 🎨 [Design System Agroverso](#) *(caso aplicável)*
* 🔧 [Agroverso Backend (API)](#) *(link para o repositório ou docs da API)*

---

**Agroverso High Tech** – 🌾 Transformando o campo com inteligência, beleza e futuro.
Feito com 🌱 por pessoas que acreditam em um mundo regenerativo.

