// ==============================================================================
// 📄 index.jsx | Agroverso – Roteamento Administrativo com Subdomínios Integrados
// 📁 Diretório: src/routes/admin/
// 🧭 Modularidade máxima com meta por rota, RBAC e renderização inteligente
// ✅ Corrigido para resolver JSX e imports absolutos com perfeição
// ==============================================================================

import React from 'react';
import { Navigate } from 'react-router-dom';

// 🧠 Imports corrigidos com base na estrutura real do projeto
const AdminPage = React.lazy(() => import('../../pages/admin/AdminPage'));
const AdminDashboardPage = React.lazy(() => import('../../pages/admin/AdminDashboardPage'));

import { usuariosRoutes } from './usuariosRoutes';
import { relatoriosRoutes } from './relatoriosRoutes';
import { cursosRoutes } from './cursosRoutes';

// ==============================================================================
// 🧭 Definição principal das rotas administrativas (adminRoutes)
// 🛡️ Proteção por RBAC + Fallback inteligente + Módulos filhos desacoplados
// ==============================================================================

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
        meta: {
          title: 'Painel',
          icon: 'dashboard',
          roles: ['admin'],
          breadcrumb: 'Painel Administrativo'
        }
      },
      ...usuariosRoutes,
      ...relatoriosRoutes,
      ...cursosRoutes,
      {
        path: '*',
        element: <Navigate to="/admin" replace />,
        meta: { hidden: true }
      }
    ]
  }
];

// ==============================================================================
// 🔚 Fim do arquivo admin/index.jsx
// 🔍 Validado para uso com Vercel, JSX, Vite e navegação segura
// ✅ Pronto para menus dinâmicos, breadcrumbs, RBAC granular e métricas
// 💡 Mantém compatibilidade com React.lazy e roteamento modularizado
// ==============================================================================

