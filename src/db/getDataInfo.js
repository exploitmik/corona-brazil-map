import { api1, api2 } from '../services/api';

export async function getDataInfo(){
  const response = await api1.get('/');
  return response;
}

export async function getSecondInfo(){
  const response = await api2.get('/');
  return response;
}