/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/ValidadorCertificado.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente de validação de certificados digitais
     emitidos pela plataforma Agroverso. Permite ao usuário
     inserir o código e consultar a veracidade do certificado
     via integração com o backend.
     Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React, { useState } from 'react';
import { api } from '../services/api';
import Loader from './Loader';

export default function ValidadorCertificado() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setResultado(null);

    if (!codigo.trim()) {
      setErro('Por favor, insira um código de certificado.');
      return;
    }

    setCarregando(true);
    try {
      const resposta = await api.validateCertificate(codigo);
      setResultado(resposta);
    } catch (err) {
      setErro(err.message || 'Certificado não encontrado ou código inválido.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section
      className="max-w-xl mx-auto py-12 px-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
      aria-label="Validador de certificados digitais"
    >
      <h2 className="text-2xl font-montserrat font-bold text-center text-greenRegenerative mb-6">
        Validar Certificado
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Formulário de validação de certificado">
        <label htmlFor="codigo" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Código do Certificado:
        </label>
        <input
          id="codigo"
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ex: AGRO-2025-XYZ123"
          className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-greenRegenerative"
          aria-required="true"
        />

        <button
          type="submit"
          className="mt-2 bg-greenRegenerative text-white font-semibold px-6 py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-greenRegenerative focus:ring-offset-2"
        >
          Validar
        </button>
      </form>

      {carregando && (
        <div className="mt-6" role="status" aria-live="polite">
          <Loader label="Consultando certificado..." />
        </div>
      )}

      {erro && (
        <p className="mt-6 text-sm text-red-600 dark:text-red-400" role="alert">
          {erro}
        </p>
      )}

      {resultado && (
        <div className="mt-8 p-4 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 shadow">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Certificado Válido</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Nome:</strong> {resultado.nome}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Curso:</strong> {resultado.curso}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Data de Emissão:</strong> {resultado.data}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Código:</strong> {resultado.codigo}
          </p>
        </div>
      )}
    </section>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/components/ValidadorCertificado.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
