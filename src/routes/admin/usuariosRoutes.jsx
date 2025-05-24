// ==============================================================================
// 📄 usuariosRoutes.jsx | Agroverso – Rotas de usuários no painel administrativo
// 📁 Diretório: src/routes/admin/
// 🛡️ Blindado com JSX válido e RBAC preparado
// ==============================================================================

import React from 'react';
import AdminUsuariosPage from '../../pages/admin/AdminUsuariosPage';

export const usuariosRoutes = [
  {
    key: 'usuarios',
    path: ROUTES.ADMIN.USUARIOS, // 'usuarios'
    element: <AdminUsuariosPage />,
    meta: {
      id: 'usuarios',
      order: 1,
      title: 'Usuários',
      icon: <Users />,
      roles: ['admin'],
      breadcrumb: 'Gestão de Usuários'
    }
  }
];

// ==============================================================================
// 🔚 Fim do arquivo usuariosRoutes.jsx – Arquitetura modular, escalável e rastreável
// 📌 Pronto para integração com RBAC, menus dinâmicos e fallback de roteamento
// ==============================================================================
