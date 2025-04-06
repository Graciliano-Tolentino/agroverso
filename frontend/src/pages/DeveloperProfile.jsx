import React from "react";
import { useParams } from "react-router-dom";
import developers from "../data/developers";

function DeveloperProfile() {
  const { id } = useParams();
  const dev = developers.find((d) => d.id === Number(id));

  if (!dev) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Desenvolvedor não encontrado</h2>
        <p className="text-gray-600">Verifique o link ou selecione um membro válido da equipe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center text-center space-y-6">
      <img
        src={dev.foto}
        alt={dev.nome}
        className="w-40 h-40 object-cover rounded-full shadow-lg"
      />
      <h1 className="text-3xl font-bold text-green-800">{dev.nome}</h1>
      <p className="text-gray-600">{dev.cargo}</p>
      <a
        href={dev.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        LinkedIn
      </a>
      <div className="max-w-2xl text-left text-gray-700 mt-6 whitespace-pre-line">
        {dev.biografia}
      </div>
    </div>
  );
}

export default DeveloperProfile;
