import React from 'react';
const DefaultLayout = React.lazy(() => import('../components/layout/DefaultLayout'));
const AdminLayout   = React.lazy(() => import('../components/layout/AdminLayout'));

export const layouts = {
  public: <DefaultLayout />,
  admin: <AdminLayout />,
};
