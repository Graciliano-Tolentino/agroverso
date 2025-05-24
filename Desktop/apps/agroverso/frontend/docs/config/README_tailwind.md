### ✅ `README_tailwind.md` — Guia de Manutenção do Design System Agroverso

**📁 Local sugerido:** `frontend/docs/config/README_tailwind.md`
**🎯 Finalidade:** Documentar boas práticas, estrutura modular e instruções claras para manutenção do sistema de design Tailwind CSS do Agroverso.

````md
# 📘 Tailwind CSS — Design System Agroverso

Este documento orienta a manutenção, expansão e padronização da configuração Tailwind CSS do projeto Agroverso. Toda modificação deve seguir os princípios de **Sabedoria, Força e Beleza**, com foco em acessibilidade, modularidade e identidade visual regenerativa.

---

## 📁 Estrutura Modular

A configuração foi dividida em arquivos reutilizáveis para facilitar expansão e manutenção:

```plaintext
frontend/
├── tailwind.config.js               # Arquivo principal de configuração
├── tailwind/
│   ├── colors.extend.js            # Paleta visual modular
│   ├── fonts.extend.js             # Tipografia semântica
│   └── spacing.extend.js           # Espaçamentos adicionais
└── docs/
    └── config/
        └── README_tailwind.md      # Este guia
````

---

## 🎨 Paleta de Cores (`colors.extend.js`)

As cores seguem um padrão semântico (ex: `primary`, `danger`, `neutral`) para facilitar manutenção futura.

> Nunca adicione cores com nomes ambíguos como `blue1` ou `green-dark`. Prefira nomes que indiquem propósito ou emoção visual.

---

## ✍️ Tipografia (`fonts.extend.js`)

Fontes definidas:

* `sans`: Fonte padrão (interface geral)
* `heading`: Títulos e chamadas
* `body`: Parágrafos e textos longos

**Importante:**
Evite adicionar novas famílias sem justificativa de identidade visual e sem carregamento explícito via CDN ou CSS.

---

## 📏 Espaçamentos (`spacing.extend.js`)

Espaçamentos definidos com nomes semânticos como `section`, `hero` e `footer`, além dos equivalentes numéricos (`72`, `84`, `96`).

> Use `px-section` ao invés de `px-72` para manter clareza visual e semântica no layout.

---

## 🧱 Boas Práticas de Manutenção

| Ação                         | Recomendações                                                                |
| ---------------------------- | ---------------------------------------------------------------------------- |
| ✨ Adição de temas            | Criar novos arquivos `colors.brand-x.js`, `fonts.partner-x.js`, etc.         |
| 🚫 Remoção de estilos        | Verificar se não estão em uso real antes de excluir (usar grep ou build log) |
| 🧪 Teste de mudanças visuais | Validar em modo escuro/claro e em responsividade                             |
| 🧩 Plugins Tailwind          | Adicionar apenas se houver uso concreto no projeto                           |
| 📝 Comentários               | Manter comentários breves no código e documentações completas neste README   |

---

## 🌗 Tema Escuro

O modo escuro é ativado por `class`:

```html
<html class="dark">
```

Toda classe deve ser escrita com prefixo `dark:`.
**Exemplo:**

```html
<div class="bg-surface dark:bg-dark text-neutral dark:text-background"></div>
```

---

## 🔍 Auditoria Periódica Recomendada

* Verifique `tailwind.config.js` e os módulos estendidos a cada novo ciclo de design.
* Rode o comando `npm run build` com análise de peso final de CSS.
* Avalie se `@tailwindcss/typography` está realmente sendo utilizado. Se não, remova-o.

---

## 🧠 Responsável Técnico

> Graciliano Tolentino
> Projeto Agroverso
> [https://agroverso.tec.br](https://agroverso.tec.br)
> Última revisão: 21/05/2025

---

**Lembre-se: Cada linha deve carregar um propósito. Cada cor deve comunicar. Cada fonte deve respirar.**

---
