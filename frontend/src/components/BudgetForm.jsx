import React, { useState } from "react";

function BudgetForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    propriedade: "",
    tipoSistema: "",
    mensagem: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envio para API será implementado futuramente
    console.log("Formulário enviado:", form);
    setEnviado(true);
    setForm({
      nome: "",
      email: "",
      telefone: "",
      propriedade: "",
      tipoSistema: "",
      mensagem: "",
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Solicite um Orçamento Personalizado
      </h2>

      {enviado && (
        <p className="text-green-700 font-medium mb-4">
          Obrigado! Sua solicitação foi enviada com sucesso.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome completo"
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Telefone com DDD"
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          name="propriedade"
          value={form.propriedade}
          onChange={handleChange}
          placeholder="Nome ou tipo da propriedade rural/urbana"
          className="w-full p-3 border rounded-lg"
        />
        <select
          name="tipoSistema"
          value={form.tipoSistema}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Selecione o sistema desejado</option>
          <option value="irrigacao">Irrigação Inteligente</option>
          <option value="hidroponia">Hidroponia Automatizada</option>
          <option value="fotovoltaico">Energia Fotovoltaica</option>
          <option value="completo">Sistema completo Agroverso</option>
        </select>
        <textarea
          name="mensagem"
          value={form.mensagem}
          onChange={handleChange}
          placeholder="Descreva suas necessidades, localização ou dúvidas..."
          rows="4"
          className="w-full p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-700 text-white py-3 px-6 rounded-xl hover:bg-green-800 transition-all"
        >
          Enviar solicitação
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;
