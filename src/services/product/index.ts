import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data.data; 
};

// Get single product
export const getProductById = async (productId: string) => {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  return response.data.data; 
};
