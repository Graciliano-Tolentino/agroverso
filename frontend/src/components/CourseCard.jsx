import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ id, titulo, imagem, descricao, cargaHoraria }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden flex flex-col">
      <img
        src={imagem}
        alt={titulo}
        className="w-full h-44 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-green-800 mb-1">{titulo}</h2>
        <p className="text-sm text-gray-600 flex-grow">{descricao}</p>
        <p className="text-sm text-gray-500 mt-2">
          Carga horária: <span className="font-medium">{cargaHoraria}h</span>
        </p>
        <Link
          to={`/cursos/${id}`}
          className="inline-block mt-4 text-center bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Acessar Curso
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
