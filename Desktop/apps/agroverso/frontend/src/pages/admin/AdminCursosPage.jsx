// =====================================================================================
// 📄 AdminCursosPage.jsx | Agroverso – Gestão de Cursos (v3.1)
// =====================================================================================
// 🎓 Listagem dinâmica e gerenciamento refinado de cursos com acessibilidade total
// 🌐 i18n integrado | 🔍 UX com tooltips acessíveis | 📈 Telemetria ativa | 🔄 API REST
// ✅ Exportação default compatível com lazy() + React Router
// ✨ Desenvolvido com sabedoria, força e beleza — Padrão Técnico 12/10 Agroverso
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
  const { logEvent } = useTelemetry();

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    logEvent('admin_cursos_view', {
      timestamp: Date.now(),
      userRole: 'admin',
    });

    fetch('/api/cursos')
      .then((res) => res.json())
      .then((data) => {
        setCursos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErro(t('erros.falha_ao_carregar'));
        setLoading(false);
      });
  }, []);

  function alternarStatusCurso(id, novoStatus) {
    fetch(`/api/cursos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicado: novoStatus }),
    })
      .then(() => {
        setCursos((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, publicado: novoStatus } : c
          )
        );
      })
      .catch((err) => {
        console.error('Erro ao alterar status do curso', err);
      });
  }

  if (loading) return <p>{t('geral.carregando')}</p>;
  if (erro) return <p className="text-red-600">{erro}</p>;

  return (
    <section className="p-6 space-y-6">
      {/* 🔰 Cabeçalho da Página */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('cursos.titulo')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {t('cursos.descricao')}
        </p>
      </div>

      {/* 📋 Tabela de Cursos com Legenda Acessível */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <caption className="text-left text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t('cursos.legenda')}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('cursos.coluna.titulo')}
              </th>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('cursos.coluna.instrutor')}
              </th>
              <th scope="col" className="text-left px-4 py-2 text-gray-700 dark:text-gray-300">
                {t('cursos.coluna.status')}
              </th>
            </tr>
          </thead>

          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-white">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className="cursor-help focus:outline-none focus:ring-2 focus:ring-blue-500"
                        tabIndex="0"
                        aria-label={`${t('cursos.tooltip.titulo')}: ${curso.titulo}`}
                      >
                        {curso.titulo}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t('cursos.tooltip.titulo')}
                    </TooltipContent>
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{curso.instrutor}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-sm rounded-full font-semibold ${
                      curso.publicado
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                    aria-label={
                      curso.publicado ? t('cursos.publicado') : t('cursos.rascunho')
                    }
                  >
                    {curso.publicado ? t('cursos.publicado') : t('cursos.rascunho')}
                  </span>
                  <button
                    onClick={() => alternarStatusCurso(curso.id, !curso.publicado)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                  >
                    {curso.publicado ? t('cursos.despublicar') : t('cursos.publicar')}
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

