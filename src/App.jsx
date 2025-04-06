import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout principal
import MainLayout from "./layout/MainLayout";

// Páginas
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Developers from "./pages/Developers";
import DeveloperProfile from "./pages/DeveloperProfile";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";

// Componentes Globais
import WhatsAppChat from "./components/WhatsAppChat";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/cursos/:id" element={<CourseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Article />} />
          <Route path="/equipe" element={<Developers />} />
          <Route path="/equipe/:id" element={<DeveloperProfile />} />
          <Route path="/painel" element={<Dashboard />} />
        </Routes>
        <WhatsAppChat />
      </MainLayout>
    </Router>
  );
}

export default App;
