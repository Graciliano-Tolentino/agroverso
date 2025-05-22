import React from 'react';
const HomePage         = React.lazy(() => import('../pages/HomePage'));
const SobrePage        = React.lazy(() => import('../pages/SobrePage'));
const ContatoPage      = React.lazy(() => import('../pages/ContatoPage'));
const CertificadosPage = React.lazy(() => import('../pages/CertificadosPage'));
const ValidarPage      = React.lazy(() => import('../pages/ValidarPage'));
import LoginPage       from '../pages/LoginPage';
import NotFoundPage    from '../pages/NotFoundPage';

export const publicRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: '/sobre',
    element: <SobrePage />,
  },
  {
    path: '/contato',
    element: <ContatoPage />,
  },
  {
    path: '/certificados',
    element: <CertificadosPage />,
  },
  {
    path: '/validar/:codigo',
    element: <ValidarPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
