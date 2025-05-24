import PropTypes from 'prop-types';
import BuyButton from './BuyButton';

const ProductCard = ({ produto }) => (
  <article
    role="group"
    tabIndex={0}
    itemScope
    itemType="https://schema.org/Product"
    aria-label={`Produto: ${produto.nome}`}
    className="card-product focus:outline-none focus:ring-2 focus:ring-green-500 transition"
    data-testid={`produto-${produto.id}`}
  >
    <h3 itemProp="name" className="text-lg font-semibold text-gray-900 dark:text-white">
      {produto.nome}
    </h3>
    <p itemProp="description" className="mt-2 text-sm text-gray-600 dark:text-gray-300">
      {produto.descricao}
    </p>
    <p itemProp="offers" itemScope itemType="https://schema.org/Offer" className="mt-2 text-sm font-bold text-green-700 dark:text-green-400">
      <meta itemProp="priceCurrency" content="BRL" />
      <span itemProp="price">{produto.preco}</span>
    </p>
    <div className="mt-4">
      <BuyButton nome={produto.nome} />
    </div>
  </article>
);

ProductCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    preco: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(ProductCard);
