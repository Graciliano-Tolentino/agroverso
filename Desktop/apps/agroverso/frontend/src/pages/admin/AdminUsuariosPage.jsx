// =====================================================================================
// 📄 AdminUsuariosPage.jsx | Agroverso – Gestão de Usuários (v3.0)
// =====================================================================================
// 🧑‍💼 Listagem de usuários com i18n, A11Y, UX e telemetria integrada
// ✅ Exportação default compatível com lazy() + React Router
// ✨ Desenvolvido com sabedoria, força e beleza – Padrão Técnico 12/10
// =====================================================================================

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTelemetry from '@/hooks/useTelemetry';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';

export default function AdminUsuariosPage() {
  const { t } = useTranslation();
  const { logEvent } = useTelemetry();

  useEffect(() => {
    logEvent('admin_usuarios_view', {
      timestamp: Date.now(),
      userRole: 'admin',
    });
  }, []);

  const usuarios = [
    { id: 1, nome: 'Maria Oliveira', email: 'maria@agroverso.tec.br', ativo: true },
    { id: 2, nome: 'João Silva', email: 'joao@agroverso.tec.br', ativo: false },
    { id: 3, nome: 'Ana Costa', email: 'ana@agroverso.tec.br', ativo: true },
  ];

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('usuarios.titulo')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {t('usuarios.descricao')}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">{t('usuarios.coluna.nome')}</th>
              <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">{t('usuarios.coluna.email')}</th>
              <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">{t('usuarios.coluna.status')}</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-white">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help" aria-label={`${t('usuarios.tooltip.nome')}: ${usuario.nome}`}>
                        {usuario.nome}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{t('usuarios.tooltip.nome')}</TooltipContent>
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{usuario.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      usuario.ativo ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                    aria-label={usuario.ativo ? t('usuarios.ativo') : t('usuarios.inativo')}
                  >
                    {usuario.ativo ? t('usuarios.ativo') : t('usuarios.inativo')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
