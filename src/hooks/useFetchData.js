/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/hooks/useFetchData.js
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Hook React para busca de dados com controle de estado,
     tratamento de erros e cancelamento com AbortController.
     Integração com o apiService para manter coesão e reuso.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function useFetchData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await api.request(endpoint, 'GET', null, signal);
        setData(response);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Erro ao carregar dados.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);
  return { data, loading, error };
}

/*
  ============================================
  🔚 Fim do arquivo src/hooks/useFetchData.js
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
