import React from "react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

function Courses() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-green-800 text-center">
        Cursos com Certificação Gratuita
      </h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        Participe da formação profissional oferecida pelo Agroverso com emissão
        automática de certificado digital, assinado pela equipe fundadora e
        pelo Instituto Graciliana Maria da Conceição.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((curso) => (
          <CourseCard key={curso.id} {...curso} />
        ))}
      </div>
    </div>
  );
}

export default Courses;
