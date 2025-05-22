// ==================================================================
// 📄 AdminLayout.jsx | Agroverso – Componente de Layout Admin
// 📁 Diretório: src/components/layout/
// 🧭 Finalidade:
//     Estruturar visualmente a interface das páginas administrativas.
//     Fornece cabeçalho funcional e (opcionalmente) menu lateral,
//     distinto do layout público da plataforma Agroverso.
// 🎯 Justificativa:
//     Isola visualmente o módulo administrativo com navegação própria,
//     permitindo estilos independentes e foco em usabilidade do painel.
// 🛠️ Ação:
//     Criação do componente de layout exclusivo para rotas protegidas.
// ♿ Acessibilidade: aprimorada com aria-label no botão de logout.
// 🌟 Desenvolvido com sabedoria, força e beleza – padrão High Tech Agroverso
// ==================================================================
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ou outro mecanismo de autenticação
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-roboto">
      {/* Cabeçalho administrativo */}
      <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          aria-label="Sair da conta"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Sair
        </button>
      </header>

      {/* Conteúdo da página */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

      {/* Rodapé opcional */}
      <footer className="bg-white text-center py-3 text-sm text-gray-400 border-t">
        © {new Date().getFullYear()} Agroverso – Todos os direitos reservados.
      </footer>
    </div>
  );
}
// ==================================================================
// 🔚 Fim do Componente: AdminLayout.jsx
// 🧩 Componente de layout exclusivo para área administrativa
// 🔐 Integrado a rotas protegidas e controle de sessão (logout)
// ♿ Acessibilidade elevada com uso de aria-label no botão de saída
// 🎨 Permite organização modular, visual e técnica da aplicação
// 🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
// 📆 Última atualização: 10/05/2025
// ==================================================================
