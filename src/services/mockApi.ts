import productsData from '../data/products.json';
import { ProductsResponse } from '../types/Product';

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(() => resolve(undefined), ms));

const data = productsData as ProductsResponse;

export const mockApi = {
  getProducts: async (page = 1, limit = 10) => {
    await delay(500);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: data.products.slice(startIndex, endIndex),
      hasMore: endIndex < data.products.length,
      total: data.products.length,
    };
  },

  getProductById: async (id: number) => {
    await delay(300);
    return data.products.find(product => product.id === id);
  },
};
