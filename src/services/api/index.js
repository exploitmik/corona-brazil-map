import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.coronaanalytic.com/journal',
  headers: {                  
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8"                   
  },
});