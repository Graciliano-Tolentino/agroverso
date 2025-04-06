import React from "react";

function MissionVisionValues() {
  return (
    <section className="bg-gray-50 py-12 px-6 rounded-2xl shadow-md max-w-5xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-10">
        Missão, Visão e Valores
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">🌱 Missão</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Promover a democratização da tecnologia no campo, integrando soluções inteligentes
            de irrigação, hidroponia e energia fotovoltaica com formação profissional gratuita e
            acessível, contribuindo para um futuro mais sustentável e autossuficiente.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">🔭 Visão</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Ser referência internacional em agricultura inteligente e educação tecnológica
            para o campo, transformando realidades através da inovação e do conhecimento.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">💡 Valores</h3>
          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
            <li>Compromisso com a sustentabilidade</li>
            <li>Educação gratuita e de qualidade</li>
            <li>Inovação acessível e inclusiva</li>
            <li>Respeito às comunidades rurais</li>
            <li>Responsabilidade social e ambiental</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MissionVisionValues;
