/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/routes/AppRoutes.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Arquivo de roteamento principal da SPA Agroverso.
     Define as rotas públicas e de fallback, utilizando
     o layout padrão. Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 📄 Páginas principais
import HomePage from '../pages/HomePage';
import SobrePage from '../pages/SobrePage';
import ContatoPage from '../pages/ContatoPage';
import CertificadosPage from '../pages/CertificadosPage';
import NotFoundPage from '../pages/NotFoundPage';

// 🧱 Layout padrão (Header + Footer)
import DefaultLayout from '../components/layout/DefaultLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🌿 Rotas públicas com layout institucional */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/certificados" element={<CertificadosPage />} />
        {/* Página 404 – rota curinga */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

/*
  ============================================
  🔚 Fim do arquivo src/routes/AppRoutes.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
