import React from 'react';
const AdminCursosPage = React.lazy(() => import('../../pages/AdminCursosPage'));

export const cursosRoutes = [
  {
    path: 'cursos',
    element: <AdminCursosPage />,
    meta: {
      title: 'Cursos',
      icon: 'book',
      roles: ['admin', 'instrutor'],
      breadcrumb: 'Gerenciar Cursos',
    },
  },
];
