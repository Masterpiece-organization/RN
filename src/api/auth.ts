import {AxiosError, AxiosInstance} from 'axios';

interface ErrorResponse {
  detail: string;
}

interface authProps extends authEmailProps {
  password: string;
}

interface authNumberProps extends authEmailProps {
  auth_number: number;
}

interface authEmailProps {
  email: string;
  instance: AxiosInstance;
}

export async function signUp({email, password, instance}: authProps) {
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

export async function loginEmail({email, password, instance}: authProps) {
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

export async function checkEmail({email, instance}: authEmailProps) {
  try {
    const res = await instance.post('user/email/request/verify/code', {email});

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
  }
}

export async function checkEmailPassword({email, instance}: authEmailProps) {
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

export async function verifyAuthCode({
  email,
  auth_number,
  instance,
}: authNumberProps) {
  const data = {
    email,
    auth_number,
  };

  try {
    const res = await instance.post('user/email/verify/auth/code', data);

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    throw new Error(error.response?.data.detail);
  }
}

export async function resetPassword({email, password, instance}: authProps) {
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
