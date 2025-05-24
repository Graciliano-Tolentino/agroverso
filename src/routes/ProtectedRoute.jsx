// =====================================================================================
// 📄 ProtectedRoute.jsx | Agroverso – Roteamento Protegido Universal (v2.1)
// =====================================================================================
// ✨ Refatorado com sabedoria, força e beleza – Padrão Técnico Agroverso 12/10
// =====================================================================================

import React, { lazy, Suspense, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { useProtectedAccess } from '@/hooks/useProtectedAccess';
import { mensagens } from '@/constants/mensagensProtectedRoute';
import { config } from '@/constants/config';
import { logger } from '@/utils/logger';
import { trackAccessDenied } from '@/utils/telemetry/trackAccessDenied';

const fallbackDefault = config.fallback403 ?? '/403';
const AvisoRedirecionamento = lazy(() => import('@/components/ui/AvisoRedirecionamento'));

function getMensagemContextual(pathname) {
  if (pathname.startsWith('/admin')) return mensagens.verificandoAdmin;
  if (pathname.startsWith('/user')) return mensagens.verificandoUser;
  return mensagens.verificandoPadrao;
}

const ProtectedRoute = ({
  children,
  roles = [],
  visualFallback = null,
  mensagemFallback,
  fallback403 = fallbackDefault,
}) => {
  const location = useLocation();
  const { user, token, loading } = useAuth();
  const rotaAtual = location.pathname;

  // ✅ Memoização de roles
  const rolesNorm = useMemo(() => (
    typeof roles === 'string' ? [roles] : roles
  ), [roles]);

  // ✅ Mensagem contextual por padrão
  const mensagemContextual = mensagemFallback ?? getMensagemContextual(rotaAtual);

  const { autorizado, erros } = useProtectedAccess({ token, user, roles: rolesNorm });

  const renderAviso = ({ mensagem, destino, tempo = 3000 }) => (
    <Suspense fallback={
      <div role="status" aria-live="assertive" className="text-center py-4 text-gray-600 dark:text-gray-400">
        Verificando acesso...
      </div>
    }>
      <AvisoRedirecionamento
        tempo={tempo}
        destino={destino}
        fallback="/"
        mensagem={mensagem}
      />
    </Suspense>
  );

  // ⏳ Sessão em verificação
  if (loading) {
    return visualFallback ?? renderAviso({ mensagem: mensagemContextual });
  }

  const erroSet = new Set(erros);

  // ❌ Sessão expirada
  if (erroSet.has('401') || erroSet.has('498')) {
    logger.info('[ProtectedRoute] Sessão inválida ou expirada', {
      token,
      rota: rotaAtual,
    });

    return renderAviso({ mensagem: mensagens.expirado, destino: '/login' });
  }

  // ❌ RBAC negado
  if (erroSet.has('403')) {
    const safeRole = user?.role ?? '__undefined__';

    trackAccessDenied({
      userRole: safeRole,
      esperado: rolesNorm,
      rota: rotaAtual,
    });

    return renderAviso({ mensagem: mensagens.negado, destino: fallback403 });
  }

  // ✅ Acesso autorizado
  return visualFallback ? (
    <Suspense fallback={visualFallback}>
      {children}
    </Suspense>
  ) : (
    children
  );
};

// 📘 Tipagem exportada para documentação automática (Agroverso DX)
export const ProtectedRoutePropTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  visualFallback: PropTypes.node,
  mensagemFallback: PropTypes.string,
  fallback403: PropTypes.string,
};

ProtectedRoute.propTypes = ProtectedRoutePropTypes;

// 🔧 Padrões seguros
ProtectedRoute.defaultProps = {
  roles: [],
  visualFallback: null,
  mensagemFallback: null,
  fallback403: '/403',
};

// 🧠 Ajuda no React DevTools, testes, e debug visual
ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
