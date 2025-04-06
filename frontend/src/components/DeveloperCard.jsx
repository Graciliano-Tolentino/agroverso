import React from "react";
import { Link } from "react-router-dom";

function DeveloperCard({ id, nome, foto, cargo, linkedin }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center transition-transform hover:scale-[1.02]">
      <img
        src={foto}
        alt={`Foto de ${nome}`}
        className="w-24 h-24 rounded-full object-cover border-4 border-green-700 mb-3"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold text-green-800">{nome}</h3>
      <p className="text-sm text-gray-600">{cargo}</p>

      <div className="flex gap-3 mt-3">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline text-sm"
        >
          LinkedIn
        </a>
        <Link
          to={`/equipe/${id}`}
          className="text-green-700 hover:underline text-sm"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}

export default DeveloperCard;
