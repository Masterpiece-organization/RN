import axios from 'axios';
import {SERVER_URL} from '@env';

const baseURL = SERVER_URL;

const instance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});

const authInstance = axios.create({
  baseURL,
  timeout: 6000,
});

export {instance, authInstance};
