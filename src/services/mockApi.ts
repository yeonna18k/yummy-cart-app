import productsData from '../data/products.json';

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), ms));

const products = productsData.products;

export const mockApi = {
  getProducts: async (page = 1, limit = 10) => {
    await delay(500);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: products.slice(startIndex, endIndex),
      hasMore: endIndex < products.length,
      total: products.length,
    };
  },

  getProductById: async (id: number) => {
    await delay(300);
    return products.find(product => product.id === id);
  },
};
