import React from "react";
import BudgetForm from "../components/BudgetForm";

function Orcamento() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-green-800 text-center">
        Solicitação de Orçamento
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        Preencha o formulário abaixo com os dados da sua propriedade e suas necessidades específicas.
        Entraremos em contato com uma proposta personalizada para você adotar as tecnologias do Agroverso.
      </p>

      <BudgetForm />

      {/* Placeholder para mensagem futura de sucesso */}
      {/* <p className="text-green-600 font-semibold text-center mt-6">Orçamento enviado com sucesso!</p> */}
    </div>
  );
}

export default Orcamento;
