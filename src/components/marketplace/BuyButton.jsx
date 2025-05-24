// 📄 src/components/marketplace/BuyButton.jsx
import PropTypes from 'prop-types';

const BuyButton = ({ nome }) => (
  <button
    type="button"
    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:scale-105 hover:bg-green-700 transition"
    onClick={() => console.log(`Comprar: ${nome}`)}
    aria-label={`Comprar ${nome}`}
    data-testid={`comprar-${nome}`}
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 13l4 4L19 7" />
    </svg>
    Comprar
  </button>
);

BuyButton.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default BuyButton;
