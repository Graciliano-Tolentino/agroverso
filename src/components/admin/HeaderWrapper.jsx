/*
  ==============================================================================
  📄 HeaderWrapper.jsx
  📁 src/components/admin
  ✍️ Refatorado por: Graciliano Tolentino
  📅 Atualizado em: 22/05/2025
  🎯 Wrapper com retry automático para o Header

       • Usa React.lazy com Suspense e fallback
       • Retry manual com botão e controle de chave
       • Logging de erro e tentativa
       • Substitui Header direto no AdminLayout

  🌍 Resiliência Agroverso — Sabedoria, Força e Beleza
  ==============================================================================
*/

import React, { useEffect, useState, Suspense } from 'react';
import SkeletonHeader from '@/components/skeletons/SkeletonHeader';
import FallbackHeader from '@/components/fallbacks/FallbackHeader';
import { useLogger } from '@/hooks/useLogger';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const LazyHeader = React.lazy(() => import('./Header'));

const HeaderWrapper = () => {
  const logger = useLogger();
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    logger.info('[HeaderWrapper] Resetando tentativa de carregamento...');
  }, [retryKey]);

  return (
    <ErrorBoundary
      fallbackRender={() => (
        <FallbackHeader
          onRetry={() => {
            logger.warn('[HeaderWrapper] Falha ao carregar Header. Recarregando tentativa...');
            setRetryKey((prev) => prev + 1);
          }}
        />
      )}
    >
      <Suspense fallback={<SkeletonHeader />}>
        <LazyHeader key={retryKey} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default HeaderWrapper;
