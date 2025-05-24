// =====================================================================================
// 📄 AdminUsuariosPage.jsx | Agroverso – Painel Administrativo: Usuários (v3.0)
// =====================================================================================
// ✅ Integração completa com API real utilizando AuthService.axiosInstance
// ✅ Fallback para loading + rastreabilidade com console.group por sessão
// =====================================================================================

import React, { useEffect, useState } from 'react';
import AdminUsuariosTable from '@/components/admin/AdminUsuariosTable';
import { AuthService } from '@/services/auth/authService';
import { v4 as uuidv4 } from 'uuid';

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const traceId = uuidv4();

  useEffect(() => {
    const fetchUsuarios = async () => {
      console.group(`[AdminUsuariosPage] Carregando usuários [traceId: ${traceId}]`);
      try {
        const response = await AuthService.axiosInstance.get('/admin/usuarios');
        setUsuarios(response.data || []);
        console.info('[OK] Dados carregados:', response.data);
      } catch (err) {
        console.error('[ERRO] Falha ao carregar usuários:', err);
      } finally {
        setLoading(false);
        console.groupEnd();
      }
    };

    fetchUsuarios();
  }, [traceId]);

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Visualize, edite e controle permissões dos usuários cadastrados.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
          ⏳ Carregando usuários...
        </div>
      ) : (
        <AdminUsuariosTable usuarios={usuarios} />
      )}
    </section>
  );
}
