import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get all products
export const getAllProducts = async () => {
  return axios.get(`${BASE_URL}/products`);
};

// Get single product
export const getProductById = async (productId: string) => {
  return axios.get(`${BASE_URL}/products/${productId}`);
};
