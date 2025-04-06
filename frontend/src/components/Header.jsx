import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo Agroverso" className="h-10 w-auto" />
          <span className="text-green-800 font-bold text-xl">Agroverso</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-green-700 underline" : "hover:text-green-700"}>
            Início
          </NavLink>
          <NavLink to="/cursos" className={({ isActive }) => isActive ? "text-green-700 underline" : "hover:text-green-700"}>
            Cursos
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? "text-green-700 underline" : "hover:text-green-700"}>
            Blog
          </NavLink>
          <NavLink to="/equipe" className={({ isActive }) => isActive ? "text-green-700 underline" : "hover:text-green-700"}>
            Equipe
          </NavLink>
          <NavLink to="/painel" className={({ isActive }) => isActive ? "text-green-700 underline" : "hover:text-green-700"}>
            Painel
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
