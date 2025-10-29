import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scoreProduct = async (productData) => {
  try {
    const response = await api.post('/score', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to score product');
  }
};

export const getProductHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product history');
  }
};

export const getScoreSummary = async () => {
  try {
    const response = await api.get('/score-summary');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch score summary');
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error('API is not responding');
  }
};

export default api;
