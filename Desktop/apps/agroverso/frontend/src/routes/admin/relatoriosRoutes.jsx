import React from 'react';
const AdminRelatoriosPage = React.lazy(() => import('../../pages/AdminRelatoriosPage'));

export const relatoriosRoutes = [
  {
    path: 'relatorios',
    element: <AdminRelatoriosPage />,
    meta: {
      title: 'Relatórios',
      icon: 'bar-chart',
      roles: ['admin'],
      breadcrumb: 'Relatórios do Sistema',
    },
  },
];
