
### 📄 `ERROR_LOGGING_GUIDE.md`

````markdown
# 🧠 Agroverso – Guia Oficial de Logging e Tratamento de Erros com `useLogger` + `ErrorBoundary`

## 🎯 Objetivo

Este documento orienta o uso correto do sistema de logging avançado (`logger.js`) integrado com o componente de contenção de erros (`ErrorBoundary.jsx`) e o hook reativo (`useLogger.js`), aplicando `fallbackRender` para controle visual em tempo real, rastreamento técnico completo e tolerância a falhas.

---

## 📌 1. Como aplicar em componentes de layout (ex: `SidebarWrapper.jsx`)

### ✅ Passo 1 – Envolver com `ErrorBoundary`

```jsx
import ErrorBoundary from '@/components/common/ErrorBoundary';

<ErrorBoundary componentName="SidebarWrapper">
  <SidebarWrapper />
</ErrorBoundary>
````

> O `componentName` será enviado no log como identificador da falha.

---

### ✅ Passo 2 – Usar `fallbackRender` para visual customizado

```jsx
<ErrorBoundary
  componentName="SidebarWrapper"
  fallbackRender={({ error, resetError }) => (
    <div className="p-4 bg-red-50 text-red-800 text-sm rounded-xl shadow">
      <strong>Erro no menu lateral</strong>
      <p>{error?.message || 'Erro desconhecido'}</p>
      <button
        className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
        onClick={resetError}
      >
        Tentar novamente
      </button>
    </div>
  )}
/>
```

> `error.message` e `error.stack` serão automaticamente **capturados e enviados** via `logger.js` para Sentry, Datadog, LogRocket e console.

---

## 🧩 2. Integração com `useLogger` (opcional)

Você também pode adicionar o hook `useLogger` se desejar logar *contextos específicos* dentro do wrapper:

```jsx
import useLogger from '@/hooks/useLogger';

function SidebarWrapper() {
  useLogger({
    component: 'SidebarWrapper',
    context: 'Renderização e carregamento de menus laterais',
    offlineFallback: true,
  });

  return <aside>{/* conteúdo */}</aside>;
}
```

---

## 📡 3. Destinos dos Logs

O sistema `logger.js` distribui os logs para:

* 🖥️ `console` (dev)
* 📡 `Sentry`
* 🔍 `LogRocket`
* 📈 `Datadog`
* 🧠 `GTM`
* 💾 `localStorage` (em fallback)

---

## 🔒 4. Conformidade Técnica

* ✔️ Captura `error.message`, `error.stack`, `component`, `context`, `timestamp`
* ✔️ Permite `fallbackRender` com `resetError`
* ✔️ Compatível com SSR e ambientes PWA
* ✔️ Compatível com testes automatizados (Jest, Playwright, Cypress)
* ✔️ Desenvolvido com princípios de acessibilidade, UX emocional e robustez técnica

---

## 🛡️ 5. Exemplo Real – Em Produção

```jsx
<ErrorBoundary
  componentName="SidebarWrapper"
  fallbackRender={({ error, resetError }) => {
    console.error('Erro crítico:', error.message);
    return (
      <div role="alert">
        <p>Falha no menu lateral.</p>
        <button onClick={resetError}>Tentar novamente</button>
      </div>
    );
  }}
>
  <SidebarWrapper />
</ErrorBoundary>
```

---

## 🔚 Conclusão

O sistema de tratamento de erros Agroverso está preparado para fornecer **resiliência visual**, **rastreamento técnico profundo** e **recuperação inteligente**.

> Em caso de dúvidas, consulte o time técnico ou acesse os logs via Sentry/Datadog.

```
