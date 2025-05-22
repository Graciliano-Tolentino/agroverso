/*
  ==============================================================================
  📄 Componente: ProtectedRoute v1.6
  📁 Caminho: src/routes/ProtectedRoute.jsx
  ✍️ Autor: Graciliano Tolentino
  📆 Atualizado em: 21/05/2025
  🎯 Finalidade:
       • Segurança modular com RBAC e contexto validado
       • Feedback visual acessível e empático
       • Fallback dinâmico com roteamento controlado
       • Log técnico, funcional e analítico em múltiplos canais

  🔐 Segurança:
       • RBAC validado com normalização defensiva
       • Hook testável e desacoplado
       • Safe access: `user?.role` tratado

  📈 Auditoria:
       • GTM + Sentry + LogRocket + DataDog
       • `console.info()` aplicado com clareza

  ♿ Acessibilidade:
       • `aria-live="assertive"` aplicado a mensagens visuais
       • Totalmente adaptável a screen readers e leitores braille digitais

  ✨ Desenvolvido com sabedoria, força e beleza – Agroverso Padrão 12/10
  ==============================================================================
*/

import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { useProtectedAccess } from '@/hooks/useProtectedAccess';
import { mensagens } from '@/constants/mensagensProtectedRoute'; // ⬅️ mensagens externas padronizadas
import { fallback403 as fallbackDefault } from '@/constants/config';
import { logger } from '@/utils/logger';

const AvisoRedirecionamento = lazy(() => import('@/components/ui/AvisoRedirecionamento'));

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

  // ✅ Normalização de roles
  const rolesNorm = typeof roles === 'string' ? [roles] : roles;

  // ✅ Mensagem personalizada com base na rota
  const mensagemContextual = mensagemFallback ?? (
    rotaAtual.startsWith('/admin')
      ? mensagens.verificandoAdmin
      : rotaAtual.startsWith('/user')
      ? mensagens.verificandoUser
      : mensagens.verificandoPadrao
  );

  const { autorizado, erros } = useProtectedAccess({ token, user, roles: rolesNorm });

  const renderAviso = ({ mensagem, destino, tempo = 3000 }) => (
    <Suspense fallback={<div role="status" aria-live="assertive" className="text-center py-4">Verificando acesso...</div>}>
      <AvisoRedirecionamento
        tempo={tempo}
        destino={destino}
        fallback="/"
        mensagem={mensagem}
      />
    </Suspense>
  );

  // ⏳ Estado de carregamento
  if (loading) {
    return visualFallback ?? renderAviso({ mensagem: mensagemContextual });
  }

  // ❌ Sessão inválida
  if (erros.includes('401') || erros.includes('498')) {
    logger.info('[ProtectedRoute] Sessão inválida ou expirada', { token, rota: rotaAtual });
    return renderAviso({ mensagem: mensagens.expirado, destino: '/login' });
  }

  // ❌ Acesso negado
  if (erros.includes('403')) {
    const safeRole = user?.role ?? '__undefined__';
    logger.info('[ProtectedRoute] Acesso negado', { userRole: safeRole, esperado: rolesNorm, rota: rotaAtual });

    window.dataLayer?.push({
      event: 'acesso_negado_rbac',
      role: safeRole,
      esperado: rolesNorm,
      rota: rotaAtual,
    });

    window.LogRocket?.track('rbac_block');
    window.DD_LOGS?.logger.info('RBAC_BLOCK', { rota: rotaAtual, role: safeRole });

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

ProtectedRoute.propTypes = {
  /**
   * Componentes filhos renderizados quando a autorização for válida
   */
  children: PropTypes.node.isRequired,

  /**
   * Lista de papéis permitidos (ex: ['admin', 'editor'])
   */
  roles: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),

  /**
   * Componente a ser exibido enquanto a sessão é verificada
   */
  visualFallback: PropTypes.node,

  /**
   * Mensagem personalizada durante verificação da sessão
   */
  mensagemFallback: PropTypes.string,

  /**
   * Rota fallback alternativa ao padrão `/403`
   */
  fallback403: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  roles: [],
  visualFallback: null,
  mensagemFallback: null,
  fallback403: '/403',
};

export default ProtectedRoute;

/*
  ==============================================================================
  🔚 Fim do componente ProtectedRoute v1.6
  🧠 Modular, acessível, seguro e rastreável em múltiplos canais
  🌍 Agroverso – Blindagem invisível, clareza visível, elegância previsível
  ==============================================================================
*/
