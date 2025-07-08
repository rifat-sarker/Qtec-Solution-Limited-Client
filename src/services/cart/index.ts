import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Get Cart
export const getCart = async () => {
  return axios.get(`${BASE_URL}/cart`);
};

//  Add to Cart
export const addToCart = async (productId: string) => {
  return axios.post(`${BASE_URL}/cart`, { productId });
};

// Update Quantity
export const updateQuantity = async (productId: string, quantity: number) => {
  return axios.patch(`${BASE_URL}/cart/${productId}`, { quantity });
};
