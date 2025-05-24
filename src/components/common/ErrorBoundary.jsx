// ==============================================================================
// 📄 ErrorBoundary.jsx | Agroverso – Componente de Contenção Visual e Técnica de Erros (v4.5)
// 📁 Diretório: src/components/common/
// 🔐 Compatível com fallbackRender, logger.js, SSR e auto-reset inteligente
// ✨ Desenvolvido com sabedoria, força e beleza – blindagem real 12/10
// ==============================================================================

import React from 'react';
import PropTypes from 'prop-types';
import FallbackErroPadrao from '@/components/common/FallbackErroPadrao';
import { logToDestinations, saveOfflineLog } from '@/utils/logger';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // 🧾 Construção do log completo com contexto e timestamp
    const logData = {
      level: 'error',
      message: error?.message || 'Erro desconhecido capturado por ErrorBoundary',
      stack: error?.stack || null,
      component: this.props.componentName || 'ErrorBoundary',
      context: errorInfo?.componentStack || 'sem rastreamento react',
      type: 'error-boundary',
      timestamp: new Date().toISOString(),
    };

    // 🧠 Permite tratamento adicional pelo consumidor
    if (typeof this.props.onError === 'function') {
      try {
        this.props.onError(error, errorInfo);
      } catch (e) {
        console.warn('onError falhou silenciosamente:', e);
      }
    }

    // 🚀 Dispara para múltiplos destinos
    try {
      logToDestinations(logData);
    } catch {
      saveOfflineLog(logData);
    }
  }
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallbackRender } = this.props;

    if (hasError) {
      // 🌱 Modo Dev: exibe stack trace formatado + fallback
      if (process.env.NODE_ENV !== 'production' && errorInfo) {
        return (
          <div className="p-4 font-mono bg-red-50 text-red-800 border border-red-300 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-2">🧱 Erro Capturado</h2>
            <pre className="overflow-auto whitespace-pre-wrap max-h-96">
              {errorInfo.componentStack}
            </pre>
            <FallbackErroPadrao />
          </div>
        );
      }

      // 🎨 fallbackRender personalizado via props
      if (typeof fallbackRender === 'function') {
        return fallbackRender({
          error,
          resetError: this.resetErrorBoundary,
        });
      }

      // 🌿 fallback padrão amigável (produção)
      return <FallbackErroPadrao />;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallbackRender: PropTypes.func,
  onError: PropTypes.func,
  componentName: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  fallbackRender: null,
  onError: null,
  componentName: 'ErrorBoundary',
};

// ==============================================================================
// 🔚 Fim do componente ErrorBoundary
// 🧠 Compatível com SSR, stack dev, retry manual, logger global e fallback visual
// ✨ Finalizado com sabedoria, força e beleza – padrão técnico 12/10 Agroverso
// ==============================================================================
