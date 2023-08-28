import {useMutation} from '@tanstack/react-query';
import {signUp, loginEmail, checkEmail, verifyAuthCode} from '@/api/auth';

interface userProps {
  email: string;
  password: string;
}

interface emailProps {
  email: string;
}

interface authProps extends emailProps {
  auth_number: number;
}

export default function useUser() {
  const loginQuery = useMutation(
    async (data: userProps) => await loginEmail(data.email, data.password),
    {
      onSuccess: res => console.log(res),
    },
  );

  const signUpQuery = useMutation(
    async (data: userProps) => await signUp(data.email, data.password),
    {
      onSuccess: res => console.log(res),
    },
  );

  const checkEmailQuery = useMutation(
    async (data: emailProps) => await checkEmail(data.email),
    {
      onSuccess: res => res,
    },
  );

  const verifyAuthCodeQuery = useMutation(
    async (data: authProps) =>
      await verifyAuthCode(data.email, data.auth_number),
    {
      onSuccess: res => res,
    },
  );

  return {
    loginQuery,
    signUpQuery,
    checkEmailQuery,
    verifyAuthCodeQuery,
  };
}
