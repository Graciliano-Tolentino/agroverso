/*
  ==============================================================================
  📄 useRetryOnError.js
  📁 src/hooks
  ✍️ Desenvolvido por: Graciliano Tolentino
  📅 Atualizado em: 22/05/2025
  🎯 Hook genérico para retry automático de imports falhos (React.lazy)

       • Compatível com SSR e SPA
       • Permite fallback visual + botão de tentativa
       • Ideal para carregamento resiliente de componentes críticos

  🌍 Framework Agroverso — Sabedoria, Força e Beleza no tratamento de erro
  ==============================================================================
*/

import { useEffect, useState, useCallback } from 'react';

export function useRetryOnError({ importFn, maxRetries = 3, delay = 1000 }) {
  const [Component, setComponent] = useState(() => () => null);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState(null);

  const retry = useCallback(() => {
    setAttempt((prev) => prev + 1);
    setError(null);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadComponent = async () => {
      try {
        const mod = await importFn();
        if (!isCancelled) {
          setComponent(() => mod.default ?? mod);
        }
      } catch (err) {
        console.error(`[useRetryOnError] Erro ao carregar componente. Tentativa ${attempt + 1}`, err);
        setError(err);

        if (attempt < maxRetries && !isCancelled) {
          setTimeout(() => retry(), delay);
        }
      }
    };

    loadComponent();

    return () => {
      isCancelled = true;
    };
  }, [attempt, importFn, maxRetries, delay, retry]);

  return { Component, error, retry, attempt };
}
