import { api } from '../services/api';

export default async function getDataInfo(){
  const response = await api.get('/');
  return response;
}