import React from "react";
import CertificateGenerator from "../components/CertificateGenerator";
import courses from "../data/courses";

function Dashboard() {
  // Simulação de dados do usuário logado
  const usuario = {
    nome: "Graciliano Tolentino",
    cursosConcluidos: [1], // IDs dos cursos concluídos
  };

  const cursosConcluidos = courses.filter((curso) =>
    usuario.cursosConcluidos.includes(curso.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-green-800">
        Painel do Aluno
      </h1>

      <p className="text-lg text-gray-700">
        Bem-vindo, <span className="font-semibold">{usuario.nome}</span>!
      </p>

      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Cursos Concluídos
        </h2>
        {cursosConcluidos.length === 0 ? (
          <p className="text-gray-600">Você ainda não concluiu nenhum curso.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {cursosConcluidos.map((curso) => (
              <li key={curso.id}>{curso.titulo}</li>
            ))}
          </ul>
        )}
      </section>

      {cursosConcluidos.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Emissão de Certificado
          </h2>
          <CertificateGenerator
            nomeAluno={usuario.nome}
            curso={cursosConcluidos[0].titulo}
            cargaHoraria={cursosConcluidos[0].cargaHoraria}
          />
        </section>
      )}
    </div>
  );
}

export default Dashboard;
