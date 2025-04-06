import React from "react";
import { useParams } from "react-router-dom";
import courses from "../data/courses";

function CourseDetail() {
  const { id } = useParams();
  const curso = courses.find((curso) => curso.id === Number(id));

  if (!curso) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Curso não encontrado</h2>
        <p className="text-gray-600">Verifique se o endereço está correto.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">{curso.titulo}</h1>
      <img
        src={curso.imagem}
        alt={curso.titulo}
        className="w-full rounded-xl shadow-md object-cover"
      />
      <p className="text-gray-700 text-lg">{curso.descricao}</p>
      <p className="text-sm text-gray-500">
        Carga horária: {curso.cargaHoraria} horas
      </p>
      <hr className="border-gray-300" />
      <div className="whitespace-pre-line text-gray-800">{curso.conteudo}</div>
    </div>
  );
}

export default CourseDetail;
