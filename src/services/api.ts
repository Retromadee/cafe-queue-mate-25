import axios from 'axios';
import { MenuItem } from '../types/menu';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const response = await api.get<MenuItem[]>('/menu');
  return response.data;
};