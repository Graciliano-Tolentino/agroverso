import React from 'react';

export default function MarketplaceSection({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((produto) => (
        <div
          key={produto.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {produto.name}
          </h3>
          <p className="text-lg font-bold text-green-600 dark:text-green-300">{produto.price}</p>
        </div>
      ))}
    </div>
  );
}
