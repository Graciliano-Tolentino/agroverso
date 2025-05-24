// =====================================================================================
// 📄 MemberCard.jsx | Agroverso – Cartão Modular de Membro com Acessibilidade Real
// =====================================================================================
// 🎯 Finalidade:
//     • Exibir perfil de membros da comunidade com semântica, acessibilidade e tokens visuais.
//     • Estruturado para reuso, testabilidade e integração com Design System institucional.
// =====================================================================================

import PropTypes from 'prop-types';

const MemberCard = ({ membro, onVerPerfil, label = 'Ver Perfil' }) => {
  const idTitulo = `membro-nome-${membro.id}`;
  const idDescricao = `membro-bio-${membro.id}`;

  return (
    <div
      role="group"
      aria-labelledby={idTitulo}
      aria-describedby={idDescricao}
      tabIndex={0}
      className="card-entity focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 transition-all"
      data-testid={`comunidade:membro-${membro.id}`}
    >
      <h3
        id={idTitulo}
        className="card-heading"
        data-testid={`comunidade:nome-${membro.id}`}
      >
        {membro.nome}
      </h3>

      <p
        id={idDescricao}
        className="mt-2 card-body"
        data-testid={`comunidade:bio-${membro.id}`}
      >
        {membro.bio}
      </p>

      <div className="mt-4">
        <button
          type="button"
          className="action-button"
          aria-label={`${label} – ${membro.nome}`}
          onClick={() => onVerPerfil?.(membro)}
          data-testid={`comunidade:botao-${membro.id}`}
        >
          {label}
        </button>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  membro: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
  onVerPerfil: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default React.memo(MemberCard);
