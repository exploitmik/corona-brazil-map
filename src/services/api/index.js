import axios from 'axios';

export const api1 = axios.create({
  baseURL: 'https://api.coronaanalytic.com/journal',
  headers: {                  
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8"                   
  },
});

export const api2 = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://covid19.mathdro.id/api/countries/BR',
  headers: {                  
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8"                   
  },
});