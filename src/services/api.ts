import axios from 'axios';
import { MenuItem } from '../types/menu';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchMenuItems = async () => {
  const response = await api.get<MenuItem[]>('/menu');
  return response.data;
};

export const submitOrder = async (order: any) => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const fetchKitchenOrders = async () => {
  const response = await api.get('/orders/kitchen');
  return response.data;
};