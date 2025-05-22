// ===================================================================
// 📄 FormInput.jsx | Agroverso – Componente Reutilizável de Input
// 📁 Diretório: src/components/ui/
// 🎯 Finalidade:
//     Criar um campo de formulário padronizado, com label, input/textarea,
//     mensagem de erro e estilos consistentes, acessíveis e reutilizáveis.
// 🧭 Justificativa:
//     Substitui inputs manuais por componente unificado nos formulários,
//     melhorando a consistência visual e acessibilidade da interface.
// 🛠️ Ação:
//     Criação do componente e posterior uso nos formulários de Login, Contato etc.
// 🌟 Desenvolvido por Agroverso
// ===================================================================
import React from 'react';

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  textarea = false
}) {
  const baseClasses =
    'w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all duration-200';
  const errorClasses = error ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-300';
  const inputClasses = `${baseClasses} ${errorClasses}`;

  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700 font-roboto"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${inputClasses} resize-none h-32`}
          disabled={disabled}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          required={required}
        />
      )}

      {error && (
        <p className="mt-1 text-xs text-red-600 font-opensans">
          {error}
        </p>
      )}
    </div>
  );
}
// ===================================================================
// 🔚 Fim do Componente: FormInput.jsx
// 🧩 Componente reutilizável para inputs e textareas em formulários
// 🎨 Padroniza estilo, acessibilidade, mensagens de erro e UX visual
// ♿ Acessível com labels, feedback visual e estrutura semântica adequada
// 🧠 Mantenedor: Equipe Agroverso | https://agroverso.tec.br
// 📆 Última atualização: 10/05/2025
// ===================================================================
