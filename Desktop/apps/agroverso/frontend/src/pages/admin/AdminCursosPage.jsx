// =====================================================================================
// 📄 AdminCursosPage.jsx | Agroverso – Gestão de Cursos com Acessibilidade e Telemetria
// =====================================================================================
// 🎯 Finalidade:
//     • Permitir a administração de cursos com acessibilidade plena, UX refinada e rastreamento de ações.
//     • Compatível com i18n, dark mode, telemetria e design system institucional.
// =====================================================================================

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTelemetry from '@/hooks/useTelemetry';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';

export default function AdminCursosPage() {
  const { t } = useTranslation();
  const { logEvent } = useTelemetry('admin:cursos');

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    logEvent('admin_cursos_view', {
      userRole: 'admin',
      timestamp: Date.now(),
    });

    fetch('/api/cursos')
      .then((res) => res.json())
      .then((data) => {
        setCursos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[AdminCursosPage] erro ao carregar', err);
        setErro(t('erros.falha_ao_carregar', 'Erro ao carregar cursos.'));
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-sm text-gray-600">{t('geral.carregando', 'Carregando...')}</p>;
  if (erro) return <p className="text-red-600" role="alert">{erro}</p>;

  return (
    <section
      className="p-6 space-y-6"
      role="region"
      aria-label={t('cursos.aria.secao', 'Gestão de cursos disponíveis')}
    >
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 card-heading">
          {t('cursos.titulo', 'Cursos')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 card-body">
          {t('cursos.descricao', 'Gerencie os cursos da plataforma Agroverso.')}
        </p>
      </header>

      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md"
          aria-label={t('cursos.aria.tabela', 'Tabela de cursos')}
        >
          <caption className="text-left text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t('cursos.legenda', 'Lista de cursos publicados e rascunhos')}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="px-4 py-2 text-left">{t('cursos.coluna.titulo', 'Título')}</th>
              <th scope="col" className="px-4 py-2 text-left">{t('cursos.coluna.instrutor', 'Instrutor')}</th>
              <th scope="col" className="px-4 py-2 text-left">{t('cursos.coluna.status', 'Status')}</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id} data-testid={`curso:linha-${curso.id}`} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-white">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className="cursor-help focus:outline-none focus-visible:ring-2 ring-blue-500"
                        tabIndex="0"
                        aria-label={`${t('cursos.tooltip.titulo')}: ${curso.titulo}`}
                      >
                        {curso.titulo}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {t('cursos.tooltip.titulo', 'Título completo do curso')}
                    </TooltipContent>
                  </Tooltip>
                </td>

                <td className="px-4 py-2 text-gray-800 dark:text-white">{curso.instrutor}</td>

                <td className="px-4 py-2 flex items-center gap-2">
                  <span
                    className={`badge ${curso.publicado ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                    aria-label={curso.publicado ? t('cursos.publicado') : t('cursos.rascunho')}
                  >
                    {curso.publicado ? t('cursos.publicado', 'Publicado') : t('cursos.rascunho', 'Rascunho')}
                  </span>
                  <button
                    onClick={() => {
                      fetch(`/api/cursos/${curso.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ publicado: !curso.publicado }),
                      }).then(() => {
                        setCursos((prev) =>
                          prev.map((c) =>
                            c.id === curso.id ? { ...c, publicado: !curso.publicado } : c
                          )
                        );
                      });
                    }}
                    className="action-button text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                    aria-label={curso.publicado ? t('cursos.despublicar') : t('cursos.publicar')}
                    data-testid={`curso:toggle-${curso.id}`}
                  >
                    {curso.publicado ? t('cursos.despublicar', 'Despublicar') : t('cursos.publicar', 'Publicar')}
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
