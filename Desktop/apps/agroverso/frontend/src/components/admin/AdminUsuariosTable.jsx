// =====================================================================================
// 📄 AdminUsuariosTable.jsx | Agroverso – Tabela de Usuários Administrativos (v1.0)
// =====================================================================================
// ✔️ Estrutura modular, reutilizável e responsiva
// ✔️ Pronto para integração com dados reais via API
// =====================================================================================

import React from 'react';

export default function AdminUsuariosTable({ usuarios = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">Nome</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">E-mail</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">Permissão</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-white">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{usuario.nome}</td>
              <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{usuario.email}</td>
              <td className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400">{usuario.permissao}</td>
              <td className="px-4 py-2 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${usuario.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {usuario.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
