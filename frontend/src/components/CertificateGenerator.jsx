import React, { useState } from "react";

function CertificateGenerator() {
  const [nome, setNome] = useState("");
  const [gerado, setGerado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula geração de certificado
    console.log("Certificado gerado para:", nome);

    // Futuro: Enviar `nome` para API que gera PDF com QR
    setGerado(true);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Emissão de Certificado Digital
      </h2>

      {!gerado ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-green-700 text-white py-3 px-6 rounded-xl hover:bg-green-800 transition-all"
          >
            Gerar Certificado
          </button>
        </form>
      ) : (
        <div className="text-center text-green-700">
          <p className="text-lg font-semibold">Certificado gerado com sucesso!</p>
          <p className="text-sm mt-2">Em breve você receberá o download automático do seu certificado.</p>
          <a
            href="/src/assets/pdf/modelo-certificado.pdf"
            download={`certificado-${nome.replace(/\s+/g, "_")}.pdf`}
            className="mt-4 inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Baixar Certificado
          </a>
        </div>
      )}
    </div>
  );
}

export default CertificateGenerator;
