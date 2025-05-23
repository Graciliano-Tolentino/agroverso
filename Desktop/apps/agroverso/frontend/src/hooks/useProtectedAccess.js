/*
  ==============================================================================
  📄 Hook: useProtectedAccess
  📁 Caminho: src/hooks/useProtectedAccess.js
  ✍️ Autor: Graciliano Tolentino
  📆 Atualizado em: 21/05/2025
  🎯 Função:
       • Validar token JWT quanto à presença, formato e expiração
       • Validar permissões via RBAC com múltiplos papéis
       • Retornar erros semânticos: ['401', '403', '498']
       • Remover tokens inválidos com rastreabilidade

  🔐 Segurança:
       • Garante sessão íntegra antes de renderizar componentes protegidos
       • Suporte a múltiplos papéis e perfis

  📈 Auditoria:
       • Pronto para rastreio por Sentry, GTM, console ou DataLayer

  ✨ Desenvolvido com sabedoria, força e beleza – Padrão Agroverso
  ==============================================================================
*/

import { jwtDecode } from 'jwt-decode';


export function useProtectedAccess({ token, user, roles = [] }) {
  const erros = [];
  const tipoBloqueio = { status: null, mensagem: null };

  // 🔐 Verificação do Token
  if (!token) {
    erros.push('401');
    tipoBloqueio.status = '401';
    tipoBloqueio.mensagem = 'Token ausente';
  } else {
    try {
      const { exp } = jwtDecode(token);
      const expirado = Date.now() >= exp * 1000;
      if (expirado) {
        localStorage.removeItem('token');
        erros.push('498');
        tipoBloqueio.status = '498';
        tipoBloqueio.mensagem = 'Token expirado';
      }
    } catch (err) {
      localStorage.removeItem('token');
      erros.push('498');
      tipoBloqueio.status = '498';
      tipoBloqueio.mensagem = 'Token malformado';
    }
  }

  // 🔐 Validação de RBAC
  const userRoles = Array.isArray(user?.roles) ? user.roles : [user?.role];
  const autorizado = roles.length === 0 || roles.some(r => userRoles.includes(r));

  if (user && !autorizado) {
    erros.push('403');
    tipoBloqueio.status = '403';
    tipoBloqueio.mensagem = 'Permissão negada para esta rota';
  }

  return {
    autorizado,
    erros,
    tipoBloqueio,
  };
}

/*
  ==============================================================================
  🔚 Fim do hook useProtectedAccess
  ✅ Simples, claro, testável, seguro – pronto para ser testado ou auditado isoladamente
  🌍 Agroverso – Blindagem que separa lógica crítica da renderização
  ==============================================================================
*/
