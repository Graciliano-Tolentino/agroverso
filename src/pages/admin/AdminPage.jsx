// ===================================================================
// 📄 AdminPage.jsx | Agroverso – Painel Administrativo Protegido
// 📁 Diretório: src/pages/
// 🔐 Acesso restrito via AuthContext – rotas protegidas
// 🎯 Permite geração de certificados digitais com QR Code
// 🧠 Padronizado como Page para integração fluida com AppRoutes
// 🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ===================================================================
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import CertificadoComExportacao from '@/components/CertificadoComExportacao';
import AvisoRedirecionamento from '@/components/ui/AvisoRedirecionamento';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

export default function AdminPage() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [certData, setCertData] = useState({
    nome: '',
    curso: '',
    data: new Date().toLocaleDateString('pt-BR'),
    qrCodeUrl: ''
  });

  const [certGerado, setCertGerado] = useState(false);
  const [erroFormulario, setErroFormulario] = useState('');
  const [acessoNegado, setAcessoNegado] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setAcessoNegado(true);
      const timeout = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, navigate]);

  if (acessoNegado) {
    return <AvisoRedirecionamento mensagem="🔒 Acesso negado. Redirecionando para login..." />;
  }

  const handleChange = (e) => {
    setCertData({ ...certData, [e.target.name]: e.target.value });
    setErroFormulario('');
  };

  const gerarCertificado = (e) => {
    e.preventDefault();
    const { nome, curso, data, qrCodeUrl } = certData;

    if (!nome || !curso || !data || !qrCodeUrl) {
      setErroFormulario('⚠️ Preencha todos os campos antes de gerar o certificado.');
      setCertGerado(false);
      return;
    }

    setCertGerado(true);
    setErroFormulario('');

    const toast = document.createElement('div');
    toast.innerText = '✅ Certificado gerado com sucesso!';
    toast.className =
      'fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg text-sm animate-fadeInOut z-50';
    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2500);
  };

  return (
    <section className="min-h-screen px-6 py-20 bg-gray-50 font-opensans">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
        {/* 🔐 Cabeçalho com sessão e logout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Sessão ativa: <span className="text-green-700 font-bold">{user?.email}</span>
          </h2>
          <button
            onClick={logout}
            aria-label="Encerrar sessão"
            className="mt-4 md:mt-0 text-sm text-red-600 hover:text-red-800 font-medium transition"
          >
            Sair da sessão
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* 🎯 Formulário de entrada */}
          <form onSubmit={gerarCertificado} className="md:w-1/2 space-y-4">
            <h3 className="text-lg font-bold text-gray-700 mb-2">📄 Gerar Certificado Digital</h3>

            {erroFormulario && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
                {erroFormulario}
              </div>
            )}

            <FormInput
              label="Nome completo"
              name="nome"
              value={certData.nome}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Nome do curso"
              name="curso"
              value={certData.curso}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Data de emissão"
              name="data"
              value={certData.data}
              onChange={handleChange}
              required
            />

            <FormInput
              label="URL do QR Code"
              name="qrCodeUrl"
              value={certData.qrCodeUrl}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="primary" ariaLabel="Gerar certificado digital">
              Gerar Certificado
            </Button>
          </form>

          {/* 📜 Exibição do certificado gerado */}
          <div className="md:w-1/2 overflow-x-auto">
            {certGerado && (
              <>
                <p className="text-sm text-gray-600 mb-4 mt-2">✅ Certificado gerado abaixo.</p>
                <CertificadoComExportacao
                  nome={certData.nome}
                  curso={certData.curso}
                  data={certData.data}
                  qrCodeUrl={certData.qrCodeUrl}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
// ===================================================================
// 🔚 Fim do Componente: AdminPage.jsx
// 🔐 Página protegida com emissão de certificados e QR Code integrado
// 🧱 Estrutura modular com uso de AuthContext, FormInput e CertificadoComExportacao
// 🧠 Sessão autenticada com logout funcional e seguro via contexto global
// 🎨 Layout claro, responsivo e acessível – padrão High Tech Agroverso
// 🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
// 📆 Última atualização: 10/05/2025
// ===================================================================
