/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/pages/LoginPage.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 08/05/2025
  📝 Descrição:
     Página de autenticação para administradores da plataforma Agroverso.
     Integra com AuthContext, valida credenciais e direciona ao painel Admin.
     Desenvolvida com sabedoria, força e beleza – padrão Agroverso High Tech.
  ============================================
*/

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated, error, loading, setError } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  // Redirecionar se já autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
    return () => {
      setError(null); // Limpar erro ao desmontar componente
    };
  }, [isAuthenticated, navigate, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // Limpar erro ao digitar
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    await login(form.email, form.senha);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 via-white to-green-100 p-6">
      <section className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6 tracking-tight">
          Acesso Administrativo – <span className="text-green-500">Agroverso</span>
        </h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm"
            aria-live="polite"
            role="alert"
          >
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-gray-700 font-semibold mb-1">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              value={form.senha}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 rounded-lg text-white transition duration-200 ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
            aria-busy={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-6">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Cadastre-se
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-xs text-gray-400 hover:text-green-600 transition"
            aria-label="Voltar para a página inicial"
          >
            ← Voltar para o site
          </Link>
        </div>
      </section>
    </main>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/pages/LoginPage.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
