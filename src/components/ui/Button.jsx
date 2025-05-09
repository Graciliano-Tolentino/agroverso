/*
  ============================================
  📄 Projeto: Agroverso
  📁 Arquivo: src/components/ui/Button.jsx
  ✍️ Autor: Equipe Agroverso
  📅 Criado em: 07/05/2025
  🔄 Última atualização: 07/05/2025
  📝 Descrição:
     Componente de botão reutilizável da aplicação Agroverso.
     Suporta variantes, acessibilidade, estados e integração
     com dark mode. Desenvolvido com sabedoria, força e beleza.
  ============================================
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-semibold text-sm px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

  const variantClasses = {
    primary: 'bg-greenRegenerative text-white hover:bg-green-600 focus:ring-greenRegenerative',
    secondary: 'bg-blueWisdom text-white hover:bg-blue-700 focus:ring-blueWisdom',
    outline: 'border border-gray-300 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
  };

  const combined = classNames(
    baseClasses,
    variantClasses[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  disabled: false,
  onClick: undefined,
  className: '',
};

/*
  ============================================
  🔚 Fim do arquivo src/components/ui/Button.jsx
  🔒 Protegido por sabedoria, força e beleza
  🌱 Agroverso – Todos os direitos reservados
  ============================================
*/
