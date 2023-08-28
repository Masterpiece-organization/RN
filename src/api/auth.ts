import {SERVER_URL} from '@env';
import axios from 'axios';

const baseURL = SERVER_URL;

const instance = axios.create({
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

export async function signUp(email: string, password: string) {
  const data = {
    email,
    password,
  };

  console.log('----data----', data);

  try {
    const res = await instance.post('user/email/register', data);
    return res.data;
  } catch (err) {
    console.log('----err----', err);
    console.error(err);
  }
}

export async function loginEmail(email: string, password: string) {
  const data = {
    email,
    password,
  };

  try {
    const res = await instance.post('user/email/login', data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function checkEmail(email: string) {
  try {
    const res = await instance.post('user/email/request/verify/code', {email});

    return res.data;
  } catch (err) {
    // return (err as Error).message;
    throw new Error(err as any);
  }
}

export async function verifyAuthCode(email: string, auth_number: number) {
  const data = {
    email,
    auth_number,
  };

  console.log(data);

  try {
    const res = await instance.post('user/email/verify/auth/code', data);

    return res.data;
  } catch (err) {
    // return (err as Error).message;
    throw new Error(err as any);
  }
}
