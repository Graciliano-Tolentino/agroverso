# 📄 Documento Técnico de Integração – Módulo de Autenticação (Agroverso)

🔐 **Versão High Tech – Modularização, Segurança e Escalabilidade**

Este documento fornece instruções detalhadas para integrar, manter e apresentar o sistema de autenticação da aplicação web **Agroverso**, incluindo suporte a:

- Sessões com JWT e validação segura
- Renovação automática via refresh token
- Modo de demonstração local (`admin.json`)
- Modularização em serviços reutilizáveis
- Padrão de excelência em segurança e escalabilidade

---

## ✅ Estrutura de Pastas Recomendada

```plaintext
src/
├── context/
│   └── AuthContext.jsx         # Provider global de autenticação
├── hooks/
│   └── useAuth.js              # Hook personalizado para consumir AuthContext
├── services/
│   └── auth/
│       ├── authService.js      # Lógica de login, refresh, logout (API)
│       └── authStorage.js      # Abstração de acesso ao localStorage
public/
└── data/
    └── admin.json              # Base de usuários para modo demonstração
docs/
└── auth/
    └── AUTH_DOC_INTEGRACAO_AGROVERSO.md  # ← Este documento
---

### 📘 Parte 2/4 — `AUTH_DOC_INTEGRACAO_AGROVERSO.md`

📌 **Variáveis de ambiente, segurança JWT e modo demo integrado**

````md
---

## 🚀 Configuração de Ambiente

### 🌐 Ambiente de Produção (`.env`)

Para utilizar o backend real com autenticação segura e renovação automática:

```env
VITE_API_BASE_URL=https://api.agroverso.tec.br
VITE_ENABLE_FAKE_DATA=false
````

> **Nota:** O backend deve suportar endpoints como `/auth/login`, `/auth/refresh` e `/auth/me`.

---

### 🧪 Ambiente de Demonstração (`.env`)

Para apresentações ou desenvolvimento sem backend, ativar modo local com JSON simulado:

```env
VITE_ENABLE_FAKE_DATA=true
```

Esse modo permite login com os dados presentes em `public/data/admin.json`, sem necessidade de servidor backend.

---

## 🔐 Segurança Profissional

O sistema está preparado para produção com os seguintes recursos de segurança:

* ✅ **JWT validado localmente** com `jwt-decode` antes de qualquer uso.
* ✅ **Interceptor Axios** renova tokens expirados automaticamente, de forma silenciosa.
* ✅ **Compatível com Cookies HttpOnly** via `withCredentials: true` no backend.
* ✅ **Logout automático** em caso de falha de renovação de sessão.

> **Recomendado:** ativar `SameSite=Strict` e `Secure` nos cookies de sessão quando disponível.

---

## 🌱 Modo Demo Integrado

Ideal para pitchs, apresentações públicas ou desenvolvimento offline:

* Usuários definidos em `public/data/admin.json`
* Tokens simulados (`fake-jwt-token`)
* Permite testes de login/logout sem backend real
* Código marcado claramente com fallback local (`ENABLE_FAKE_DATA`)

---

---

### 📘 Parte 3/4 — `AUTH_DOC_INTEGRACAO_AGROVERSO.md`

📌 **Testes recomendados, integração com rotas protegidas e roadmap técnico**

````md
---

## 🧪 Testes Recomendados

Para garantir qualidade e confiança no fluxo de autenticação, recomenda-se:

### ✅ Testes Unitários
- Ferramentas: **Jest** + **React Testing Library**
- Componentes-alvo:
  - `AuthContext.jsx`
  - `useAuth.js`
  - `authStorage.js`

### ✅ Testes de Integração (E2E)
- Ferramentas: **Cypress** ou **Playwright**
- Cenários recomendados:
  - Login com credenciais válidas e inválidas
  - Expiração de token e renovação silenciosa
  - Logout manual
  - Acesso a rotas protegidas com/sem autenticação

### ✅ Testes com Mocks
- Ferramenta: **MSW** (Mock Service Worker)
- Objetivo: interceptar chamadas reais e simular backend
- Endpoints a simular:
  - `/auth/login`
  - `/auth/refresh`
  - `/auth/me`

---

## 🔐 Integração com Rotas Protegidas

Para proteger páginas internas contra acesso não autorizado:

1. Crie um componente `PrivateRoute.jsx` com base em `useAuth()`:
   ```jsx
   import { useAuth } from '@/hooks/useAuth';
   import { Navigate, Outlet } from 'react-router-dom';

   const PrivateRoute = () => {
     const { isAuthenticated, loading } = useAuth();

     if (loading) return <div>Carregando...</div>;
     return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
   };

   export default PrivateRoute;
````

2. Use no roteamento:

   ```jsx
   <Route element={<PrivateRoute />}>
     <Route path="/admin" element={<AdminDashboard />} />
   </Route>
   ```

---

## 🧠 Roadmap Técnico – Próximas Etapas

* 🧩 **Controle de Acesso (RBAC)**: integração com níveis de permissão (ex: admin, técnico, visitante)
* 🛡️ **Armazenamento com Cookies HttpOnly** (backend configurado com `SameSite`, `Secure`, `HttpOnly`)
* 💠 **Separação de contextos** (ex: AuthContext, PermissionContext)
* ⏳ **Timer de expiração proativo**: renovação de token X segundos antes de expirar
* 🔄 **Tela de carregamento centralizada**: splash screen global durante `AuthProvider` inicial

---

---

### 📘 Parte 4/4 — `AUTH_DOC_INTEGRACAO_AGROVERSO.md`

📌 **Conclusão, instruções de colaboração e alinhamento com a visão Agroverso**

```md
---

## 📌 Conclusão

O módulo de autenticação do Agroverso está agora implementado segundo os **mais altos padrões da engenharia de software moderna**, oferecendo:

- 🔐 **Segurança real com JWT e Axios interceptor**
- 🌱 **Fallback local para apresentações e desenvolvimento offline**
- 🧩 **Modularização escalável e fácil manutenção**
- 🧪 **Pronto para testes unitários, mocks e E2E**
- 🚀 **Compatível com rotas protegidas, cookies seguros e renovação automática**

Este sistema atende com excelência aos critérios de:

> **Sabedoria** (clareza arquitetural e pedagógica)  
> **Força** (resiliência, segurança e robustez técnica)  
> **Beleza** (organização, semântica e legibilidade impecáveis)

---

## 🤝 Colaboração Técnica

Para contribuir com melhorias:

1. Clone o repositório oficial do Agroverso;
2. Crie um branch: `git checkout -b feat/auth-enhancements`;
3. Documente com clareza cada nova funcionalidade;
4. Mantenha o padrão de modularização, comentários e tipagens;
5. Atualize este documento em `/frontend/docs/auth/AUTH_DOC_INTEGRACAO_AGROVERSO.md` quando necessário.

> **Padrão de commits:**  
> `feat(auth): adiciona verificação de expiração no refresh token`

---

## 📬 Suporte

Dúvidas, sugestões ou colaborações avançadas devem ser encaminhadas à equipe técnica responsável ou via repositório oficial no GitHub:  
🔗 [https://github.com/Graciliano-Tolentino/agroverso](https://github.com/Graciliano-Tolentino/agroverso)

---

**🌾 Agroverso High Tech** – Transformando tecnologia em regeneração com sabedoria, força e beleza.

```

✅ Documento completo. Agora pronto para ser salvo em:

```plaintext
/frontend/docs/auth/AUTH_DOC_INTEGRACAO_AGROVERSO.md
```

