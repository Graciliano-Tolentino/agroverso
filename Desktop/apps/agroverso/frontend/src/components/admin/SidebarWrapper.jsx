// ==============================================================================
// 📄 SidebarWrapper.jsx | Agroverso – Wrapper com Reset Moderno e Logging Semântico
// 📁 Diretório: src/components/admin
// ✨ Refatorado com:
//     • resetBoundary() via useErrorBoundary()
//     • Logging desacoplado (logWarn/logError)
//     • Timeout previsível + acessibilidade real
//     • Tracking GTM de retry com estado desacoplado
// ==============================================================================

import React, { useEffect, useState, Suspense } from 'react';
import SkeletonSidebar from '@/components/skeletons/SkeletonSidebar';
import FallbackSidebar from '@/components/fallbacks/FallbackSidebar';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { logError, logWarn } from '@/hooks/useLogger';
import mensagens from '@/constants/mensagensSistema';

const LazySidebar = React.lazy(() => import('./Sidebar'));

const SidebarContent = () => {
  const { resetBoundary } = useErrorBoundary();
  const [retryKey, setRetryKey] = useState(0);
  const [hasError, setHasError] = useState(false);

  // ⏱ Timeout para fallback de segurança
  useEffect(() => {
    const timeout = setTimeout(() => setHasError(true), 4000);
    return () => clearTimeout(timeout);
  }, [retryKey]);

  const handleRetry = () => {
    logWarn({
      message: mensagens.sidebar.retrying,
      component: 'SidebarWrapper',
      context: 'useErrorBoundary → retry',
    });

    window.dataLayer?.push({
      event: 'tentativa_retry_sidebar',
      component: 'SidebarWrapper',
      timestamp: new Date().toISOString(),
    });

    setRetryKey((prev) => prev + 1);
    resetBoundary(); // 🔁 reset moderno
  };

  return (
    <Suspense fallback={<SkeletonSidebar />}>
      {!hasError && <LazySidebar key={retryKey} />}
      {hasError && (
        <div role="alert" aria-live="assertive">
          <FallbackSidebar onRetry={handleRetry} />
        </div>
      )}
    </Suspense>
  );
};

const SidebarWrapper = () => (
  <ErrorBoundary
    fallback={<SidebarContent />} // Fallback é o próprio componente interno
    onError={(error, info) => {
      logError({
        error,
        component: 'SidebarWrapper',
        context: 'ErrorBoundary → onError',
      });
    }}
  >
    <SidebarContent />
  </ErrorBoundary>
);

export default SidebarWrapper;

// ==============================================================================
// 🔚 Fim do componente SidebarWrapper
// 🚀 Refatorado para o padrão resetBoundary() com logging e UX acessível
// ==============================================================================
