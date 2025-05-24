// =====================================================================================
// 📄 AdminUsuariosPage.jsx | Agroverso – Gestão de Usuários com Acessibilidade e RBAC
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir e gerenciar usuários com telemetria, i18n, tokens visuais e acessibilidade plena.
//     • Compatível com dark mode, testabilidade e design system institucional.
// =====================================================================================

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTelemetry from '@/hooks/useTelemetry';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@radix-ui/react-tooltip';

export default function AdminUsuariosPage() {
  const { t } = useTranslation();
  const { logEvent } = useTelemetry('admin:usuarios');

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    logEvent('admin_usuarios_view', {
      timestamp: Date.now(),
      origem: 'Admin > Usuários',
    });

    const timeout = setTimeout(() => {
      setUsuarios([
        { id: 1, nome: 'João da Silva', email: 'joao@agroverso.tec.br', papel: 'Administrador', ativo: true },
        { id: 2, nome: 'Ana Beatriz', email: 'ana@agroverso.tec.br', papel: 'Moderadora', ativo: false },
        { id: 3, nome: 'Carlos Eduardo', email: 'carlos@agroverso.tec.br', papel: 'Usuário', ativo: true },
      ]);
      setCarregando(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  if (carregando) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-300" role="status">
        {t('geral.carregando', 'Carregando usuários...')}
      </p>
    );
  }

  return (
    <section
      className="p-6 space-y-6"
      role="region"
      aria-label={t('usuarios.aria.secao', 'Painel de usuários cadastrados')}
    >
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 card-heading">
          {t('usuarios.titulo', 'Usuários')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 card-body">
          {t('usuarios.descricao', 'Gerencie permissões, status e acesso de usuários.')}
        </p>
      </header>

      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md"
          aria-label={t('usuarios.aria.tabela')}
        >
          <caption className="text-left text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t('usuarios.legenda', 'Tabela com dados dos usuários do sistema')}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="px-4 py-2 text-left">{t('usuarios.coluna.nome')}</th>
              <th scope="col" className="px-4 py-2 text-left">{t('usuarios.coluna.email')}</th>
              <th scope="col" className="px-4 py-2 text-left">{t('usuarios.coluna.papel')}</th>
              <th scope="col" className="px-4 py-2 text-left">{t('usuarios.coluna.status')}</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t border-gray-200 dark:border-gray-700" data-testid={`usuario:linha-${usuario.id}`}>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{usuario.nome}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{usuario.email}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{usuario.papel}</td>
                <td className="px-4 py-2">
                  <span
                    className={`badge ${usuario.ativo ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                    role="status"
                    aria-label={usuario.ativo ? t('usuarios.ativo') : t('usuarios.inativo')}
                    data-testid={`usuario:status-${usuario.id}`}
                  >
                    {usuario.ativo ? t('usuarios.ativo', 'Ativo') : t('usuarios.inativo', 'Inativo')}
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
