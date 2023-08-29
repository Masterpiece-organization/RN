import {SERVER_URL} from '@env';
import axios, {AxiosError} from 'axios';

interface ErrorResponse {
  detail: string;
}

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

  try {
    const res = await instance.post('user/email/register', data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
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
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
  }
}

export async function checkEmail(email: string) {
  try {
    const res = await instance.post('user/email/request/verify/code', {email});

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
  }
}

export async function checkEmailPassword(email: string) {
  try {
    const res = await instance.post('user/email/request/password/reset', {
      email,
    });

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
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
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
  }
}

export async function resetPassword(email: string, password: string) {
  const data = {
    email,
    password,
  };

  try {
    const res = await instance.post('user/password/reset', data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
  }
}
