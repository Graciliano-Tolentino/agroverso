// ==============================================================================
// 📄 adminRoutes.js | Agroverso – Roteamento Administrativo v1.6
// ==============================================================================

import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPage = React.lazy(() => import('../pages/AdminPage'));
const AdminWelcomePage = React.lazy(() => import('../pages/AdminWelcomePage'));
const AdminUsuariosPage = React.lazy(() => import('../pages/AdminUsuariosPage'));
const AdminRelatoriosPage = React.lazy(() => import('../pages/AdminRelatoriosPage'));
const AdminCursosPage = React.lazy(() => import('../pages/AdminCursosPage'));

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <AdminWelcomePage />,
      },
      {
        path: 'usuarios',
        element: <AdminUsuariosPage />,
      },
      {
        path: 'relatorios',
        element: <AdminRelatoriosPage />,
      },
      {
        path: 'cursos',
        element: <AdminCursosPage />,
      },
      {
        path: '*',
        element: <Navigate to="/admin" replace />,
      },
    ],
  },
];

// ==============================================================================
// 🔚 Fim do arquivo adminRoutes.js
// 🧠 Estrutura modular e extensível, pronta para menus, logs, auditorias e painéis
// ==============================================================================
