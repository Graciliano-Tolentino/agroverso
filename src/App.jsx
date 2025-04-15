// 🌿 App.jsx – Estrutura principal da aplicação Agroverso com roteamento
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '@pages/Home'
import Sobre from '@pages/Sobre'
import Contato from '@pages/Contato'
import Admin from '@pages/Admin'
import Logout from '@pages/Logout'
import NotFound from '@pages/404'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
