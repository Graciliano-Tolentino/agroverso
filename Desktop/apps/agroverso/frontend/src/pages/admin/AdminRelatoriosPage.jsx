// =====================================================================================
// 📄 AdminsRelatoriosPage.jsx | Agroverso – Painel de Relatórios Administrativos (v1.0)
// =====================================================================================
// 📊 Geração, visualização e exportação de relatórios administrativos
// 🌐 Suporte a i18n | ♿ Acessibilidade | 📈 Telemetria integrada | 📄 Exportação PDF
// ✅ Exportação default compatível com lazy() + React Router
// ✨ Desenvolvido com sabedoria, força e beleza — Padrão Técnico 12/10 Agroverso
// =====================================================================================

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTelemetry from '@/hooks/useTelemetry';
import { FaDownload } from 'react-icons/fa';

export default function AdminsRelatoriosPage() {
  const { t } = useTranslation();
  const { logEvent } = useTelemetry();

  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    logEvent('admin_relatorios_view', { timestamp: Date.now(), userRole: 'admin' });

    // Simula chamada para API de relatórios
    setTimeout(() => {
      setRelatorios([
        { id: 1, nome: t('relatorios.usuarios'), data: '2025-05-01', tipo: 'PDF' },
        { id: 2, nome: t('relatorios.cursos'), data: '2025-05-02', tipo: 'CSV' },
        { id: 3, nome: t('relatorios.acessos'), data: '2025-05-03', tipo: 'PDF' },
      ]);
    }, 500);
  }, []);

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('relatorios.titulo')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {t('relatorios.descricao')}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <caption className="text-left text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t('relatorios.legenda')}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('relatorios.coluna.nome')}
              </th>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('relatorios.coluna.data')}
              </th>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('relatorios.coluna.tipo')}
              </th>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('relatorios.coluna.acao')}
              </th>
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
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                    onClick={() => handleDownload(relatorio)}
                    aria-label={`${t('relatorios.baixar')} ${relatorio.nome}`}
                  >
                    <FaDownload />
                    {t('relatorios.baixar')}
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

// 🔽 Simula função de download
function handleDownload(relatorio) {
  alert(`Baixando ${relatorio.nome} (${relatorio.tipo})`);
}
