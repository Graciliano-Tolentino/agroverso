// 📄 src/services/marketplaceService.js
export async function getProdutos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', nome: 'Trator X', descricao: 'Potência e eficiência', preco: '100000.00' },
        { id: '2', nome: 'Sementes', descricao: 'Orgânicas e certificadas', preco: '50.00' },
      ]);
    }, 800);
  });
}
