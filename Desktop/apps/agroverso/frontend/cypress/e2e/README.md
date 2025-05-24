---

### 📄 `cypress/e2e/README.md`

📁 Diretório: `cypress/e2e/`
🧭 Propósito: Documentação oficial dos testes end-to-end com Cypress e acessibilidade automatizada

````md
# 🧪 Cypress E2E – Agroverso

Este diretório contém a suíte de **testes end-to-end (E2E)** da aplicação Agroverso, projetada para validar a experiência real do usuário em rotas públicas e protegidas, com foco em:

- 🧠 Proteção por RBAC (roles de usuário)
- ♿ Acessibilidade automatizada (WCAG 2.1 AA)
- 🌿 Lazy loading e fallback visual
- 🔐 Segurança de rotas e headers
- 📊 Cobertura funcional real em ambiente navegável

---

## 📂 Estrutura de Arquivos

```bash
cypress/
└── e2e/
    ├── protected_route.cy.js      # Testes de rotas com proteção RBAC
    ├── public_pages.cy.js         # Testes de rotas públicas (certificados, contato, validar)
    ├── error_pages.cy.js          # [Opcional] Testes de rotas 404, 403, etc.
    └── login_flow.cy.js           # [Opcional] Testes do fluxo de login e logout
````

---

## 🧰 Tecnologias Utilizadas

* [Cypress](https://www.cypress.io/) – Testes e2e modernos e automatizados
* [axe-core](https://www.deque.com/axe/) – Engine de verificação de acessibilidade
* [cypress-axe](https://github.com/component-driven/cypress-axe) – Integração entre Cypress e a11y

---

## 🚀 Como Rodar os Testes

### 1. Instale as dependências

```bash
npm install
```

### 2. Execute os testes com interface

```bash
npm run cy:open
```

> Ou diretamente via CLI:

```bash
npx cypress run --e2e
```

---

## ♿ Acessibilidade (axe-core)

Todos os testes utilizam:

```js
cy.injectAxe();
cy.checkA11y();
```

Isso garante validação automática de:

* Contraste de cores
* Atributos `aria`
* Campos com `label` visível
* Navegabilidade por teclado

---

## 🔐 Comandos Personalizados

```js
cy.loginAs('admin');             // Simula autenticação
cy.assertRedirectedToLogin();    // Verifica se foi redirecionado corretamente
```

> Todos definidos em `cypress/support/commands.js`

---

## 🧪 Estratégia de Teste

| Arquivo                 | Cobertura                                                |
| ----------------------- | -------------------------------------------------------- |
| `protected_route.cy.js` | /admin, /admin/usuarios — RBAC, fallback visual          |
| `public_pages.cy.js`    | /certificados, /validar/\:codigo, /contato — UX completa |
| `error_pages.cy.js`     | /404, /403 — comportamento em rotas inválidas            |
| `login_flow.cy.js`      | /login, /logout — autenticação e persistência de sessão  |

---

## ✅ Checklist de Qualidade

* [x] Fallback visual testado
* [x] Campos acessíveis validados
* [x] Redirecionamento testado
* [x] Sessões simuladas com segurança
* [x] Interceptação de APIs protegidas
* [x] Uso de comandos semânticos reutilizáveis

---

## 📦 Requisitos para CI/CD

Adicionar ao `package.json`:

```json
"scripts": {
  "test:e2e": "cypress run --e2e"
}
```

> Pode ser adicionado a workflows GitHub Actions, GitLab CI ou Vercel Preview Checks.

---

## 🌍 Padrão Agroverso

> Desenvolvido com sabedoria, força e beleza.

Este conjunto de testes segue os princípios fundamentais do Agroverso: **qualidade progressiva, empatia na experiência do usuário e estrutura modular para escalabilidade internacional.**

---

📧 Em caso de dúvidas técnicas, consulte o time de engenharia ou acesse:
[https://agroverso.tec.br](https://agroverso.tec.br)

```

---

