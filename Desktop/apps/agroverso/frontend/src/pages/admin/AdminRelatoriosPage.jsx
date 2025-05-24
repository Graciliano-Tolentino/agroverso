// =====================================================================================
// 📄 AdminsRelatoriosPage.jsx | Agroverso – Painel de Relatórios com Acessibilidade Total
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir e gerenciar relatórios administrativos com acessibilidade, UX e rastreamento.
//     • Compatível com dark mode, i18n, testabilidade e exportação padronizada.
// =====================================================================================

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTelemetry from '@/hooks/useTelemetry';
import { FaDownload } from 'react-icons/fa';

export default function AdminsRelatoriosPage() {
  const { t } = useTranslation();
  const { logEvent } = useTelemetry('admin:relatorios');

  const [relatorios, setRelatorios] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    logEvent('admin_relatorios_view', {
      timestamp: Date.now(),
      userRole: 'admin',
    });

    // Simula fetch
    setTimeout(() => {
      try {
        setRelatorios([
          { id: 1, nome: t('relatorios.usuarios'), data: '2025-05-01', tipo: 'PDF' },
          { id: 2, nome: t('relatorios.cursos'), data: '2025-05-02', tipo: 'CSV' },
          { id: 3, nome: t('relatorios.acessos'), data: '2025-05-03', tipo: 'PDF' },
        ]);
      } catch {
        setErro(t('erros.falha_ao_carregar'));
      }
    }, 600);
  }, []);

  return (
    <section
      className="p-6 space-y-6"
      role="region"
      aria-label={t('relatorios.aria.secao', 'Painel de relatórios administrativos')}
    >
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 card-heading">
          {t('relatorios.titulo', 'Relatórios')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 card-body">
          {t('relatorios.descricao', 'Acompanhe e exporte relatórios importantes.')}
        </p>
      </header>

      {erro && (
        <p className="text-sm text-red-600" role="alert" aria-live="polite">
          {erro}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md" aria-label={t('relatorios.aria.tabela')}>
          <caption className="text-left text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t('relatorios.legenda', 'Histórico de relatórios disponíveis para exportação')}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-left px-4 py-2">{t('relatorios.coluna.nome', 'Nome')}</th>
              <th scope="col" className="text-left px-4 py-2">{t('relatorios.coluna.data', 'Data')}</th>
              <th scope="col" className="text-left px-4 py-2">{t('relatorios.coluna.tipo', 'Tipo')}</th>
              <th scope="col" className="text-left px-4 py-2">{t('relatorios.coluna.acao', 'Ação')}</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.map((relatorio) => (
              <tr key={relatorio.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-white">{relatorio.nome}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{relatorio.data}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{relatorio.tipo}</td>
                <td className="px-4 py-2">
                  <button
                    className="action-button bg-green-100 text-green-800 hover:bg-green-200 text-sm"
                    onClick={() => handleDownload(relatorio)}
                    aria-label={`${t('relatorios.baixar')} ${relatorio.nome}`}
                  >
                    <FaDownload className="w-4 h-4" />
                    {t('relatorios.baixar', 'Baixar')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ✅ Função de download com feedback e logging
function handleDownload(relatorio) {
  const msg = `⬇️ Baixando relatório: ${relatorio.nome} (${relatorio.tipo})`;
  console.info('[Relatórios] Exportação iniciada:', msg);
  alert(msg);
}
