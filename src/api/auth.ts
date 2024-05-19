import {
  AxiosError,
  AxiosInstance,
  isAxiosError as isErrorfromAxios,
} from 'axios';
import {client} from './axiosClient';
interface ErrorResponse {
  // data: string;
  error: {
    status_code: number;
    system_code: string | null;
    system_message: string | null;
    user_message: string;
  };
}

interface AuthProps {
  email: string;
  password: string;
}

// interface authProps extends authEmailProps {
//   password: string;
// }

interface authNumberProps extends authEmailProps {
  auth_number: number;
}

interface authEmailProps {
  email: string;
  instance: AxiosInstance;
}

interface userInfoProps {
  nickname: string;
  position: number[];
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

export async function loginEmail({email, password}: AuthProps) {
  const data = {
    email,
    password,
  };

  try {
    const res = await client.post('user/email/login', data, {
      authorization: false,
    });

    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function signUp({email, password}: AuthProps) {
  const data = {
    email,
    password,
  };

  try {
    const res = await client.post('user/email/register', data, {
      authorization: false,
    });
    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function getUserInfo() {
  try {
    const res = await client.get('user/me');

    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function updateUserInfo({
  nickname,
  position,
  instance,
}: userInfoProps) {
  const data = {
    nickname,
    position,
  };
  try {
    const res = await instance.patch('user/me', data);
    return res.data;
  } catch (err) {
    if (isErrorfromAxios(err)) {
      console.log(err);
      return isAxiosError(err);
    }
    console.error(err);
  }
}

export async function checkEmail({email}: AuthProps) {
  try {
    const res = await client.post(
      'user/email/request/verify/code',
      {email},
      {authorization: false},
    );

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

export async function resetPassword({email, password, instance}: AuthProps) {
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
