import React from "react";
import developers from "../data/developers";
import DeveloperCard from "../components/DeveloperCard";

function Developers() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-green-800 text-center">
        Equipe de Desenvolvimento
      </h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        Conheça os profissionais responsáveis pela construção do Agroverso —
        uma equipe comprometida com inovação, tecnologia social e soluções para
        um mundo mais sustentável.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {developers.map((dev) => (
          <DeveloperCard key={dev.id} {...dev} />
        ))}
      </div>
    </div>
  );
}

export default Developers;
