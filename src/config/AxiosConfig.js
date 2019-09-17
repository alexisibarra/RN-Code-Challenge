import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'http://www.thecocktaildb.com/api/json/v1/1',
  headers: {
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default AXIOS;
