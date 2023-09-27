import {
  AxiosError,
  AxiosInstance,
  isAxiosError as isErrorfromAxios,
} from 'axios';

interface ErrorResponse {
  // data: string;
  error: {
    status_code: number;
    system_code: string | null;
    system_message: string | null;
    user_message: string;
  };
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

const isAxiosError = (err: AxiosError) => {
  if (isErrorfromAxios(err)) {
    const error = err as AxiosError<ErrorResponse>;
    if (error && error.response) {
      // TODO 에러메시지 확인후수정
      throw new Error(error.response.data.error.user_message);
    }
  }
};

export async function signUp({email, password, instance}: authProps) {
  const data = {
    email,
    password,
  };

  try {
    const res = await instance.post('user/email/register', data);
    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
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
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function getUserInfo(instance: AxiosInstance) {
  try {
    const res = await instance.get('user/me');

    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function checkEmail({email, instance}: authEmailProps) {
  try {
    const res = await instance.post('user/email/request/verify/code', {email});

    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function checkEmailPassword({email, instance}: authEmailProps) {
  try {
    const res = await instance.post('user/email/request/password/reset', {
      email,
    });

    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
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
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
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
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}
