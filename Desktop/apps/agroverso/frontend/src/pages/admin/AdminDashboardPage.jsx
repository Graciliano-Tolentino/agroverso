// =====================================================================================
// 📄 AdminDashboardPage.jsx | Agroverso – Painel Administrativo Principal (v3.0)
// =====================================================================================
// 📊 Painel com métricas estratégicas – A11Y + i18n + Telemetria + Tooltips + Dark Mode
// ✅ Exportação default obrigatória para lazy() e React Router
// ✨ Desenvolvido com sabedoria, força e beleza – Padrão Técnico 12/10
// =====================================================================================

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTelemetry from '@/hooks/useTelemetry';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const { logEvent } = useTelemetry();

  useEffect(() => {
    logEvent('dashboard_view', {
      timestamp: Date.now(),
      userRole: 'admin'
    });
  }, []);

  const stats = [
    {
      id: 1,
      label: t('dashboard.usuarios_ativos'),
      valor: 124,
      cor: 'text-green-600',
      tooltip: t('dashboard.tooltip.usuarios_ativos'),
    },
    {
      id: 2,
      label: t('dashboard.cursos_publicados'),
      valor: 9,
      cor: 'text-blue-600',
      tooltip: t('dashboard.tooltip.cursos_publicados'),
    },
    {
      id: 3,
      label: t('dashboard.certificados_emitidos'),
      valor: 57,
      cor: 'text-yellow-600',
      tooltip: t('dashboard.tooltip.certificados_emitidos'),
    },
    {
      id: 4,
      label: t('dashboard.acessos_mes'),
      valor: 1420,
      cor: 'text-purple-600',
      tooltip: t('dashboard.tooltip.acessos_mes'),
    },
  ];

  return (
    <section className="p-6 space-y-6">
      {/* Cabeçalho do Painel */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('dashboard.titulo')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {t('dashboard.descricao')}
        </p>
      </div>

      {/* Blocos de Métricas com A11Y e Tooltips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            role="status"
            aria-label={`${item.label}: ${item.valor}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-start justify-center"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400 cursor-help"
                  id={`metric-label-${item.id}`}
                >
                  {item.label}
                </p>
              </TooltipTrigger>
              <TooltipContent side="top">
                {item.tooltip}
              </TooltipContent>
            </Tooltip>
            <p className={`text-2xl font-bold mt-1 ${item.cor}`}>
              {item.valor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
