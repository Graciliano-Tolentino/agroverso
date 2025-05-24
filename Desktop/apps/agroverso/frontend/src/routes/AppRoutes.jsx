// ==============================================================================
// 📄 AppRoutes.jsx | Agroverso – Sistema de Roteamento Modular com Transições
// 📁 Diretório: src/routes/
// ✨ Estrutura com meta, layouts dinâmicos, subrotas, animações e preload
// 🧭 Padrão Agroverso – Sabedoria, Força e Beleza aplicada à navegação
// ==============================================================================

import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './admin';
import { layouts } from './layouts';
import ProtectedRoute from './ProtectedRoute';

/* ⏳ Fallback padrão */
const LoadingPage = () => (
  <div className="flex h-screen w-full items-center justify-center text-lg text-gray-700">
    Carregando…
  </div>
);

/* 🌟 Transição visual entre páginas */
const RouteWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function AppRoutes() {
  // ✅ Preloading inteligente sob ociosidade
  useEffect(() => {
    const idle = setTimeout(() => {
      import('../pages/CertificadosPage');
      import('../pages/ValidarPage');
    }, 1200);
    return () => clearTimeout(idle);
  }, []);

  return (
    <Routes>
      {/* 🌐 Rotas Públicas */}
      <Route
        element={
          <Suspense fallback={<LoadingPage />}>
            {layouts.public}
          </Suspense>
        }
      >
        {publicRoutes.map((route, index) => (
          <Route
            key={`public-${index}`}
            path={route.path}
            index={route.index}
            element={
              <Suspense fallback={<LoadingPage />}>
                <RouteWrapper>{route.element}</RouteWrapper>
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* 🔐 Rotas Administrativas */}
      {adminRoutes.map((route, index) => (
        <Route
          key={`admin-${index}`}
          path={route.path}
          element={
            <ProtectedRoute roles={['admin']} visualFallback={<LoadingPage />}>
              <Suspense fallback={<LoadingPage />}>
                {route.element}
              </Suspense>
            </ProtectedRoute>
          }
        >
          {route.children?.map((child, i) => (
            <Route
              key={`admin-child-${i}`}
              path={child.path}
              index={child.index}
              element={
                <Suspense fallback={<LoadingPage />}>
                  <RouteWrapper>{child.element}</RouteWrapper>
                </Suspense>
              }
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
}

// ==============================================================================
// 🔚 Fim do AppRoutes – Navegação escalável, animada, segura e com observabilidade
// ==============================================================================
