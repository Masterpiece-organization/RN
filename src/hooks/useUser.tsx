import {useMutation} from '@tanstack/react-query';
import {
  signUp,
  loginEmail,
  checkEmail,
  checkEmailPassword,
  verifyAuthCode,
  resetPassword,
} from '@/api/auth';
import {useApiContext} from '@/contexts/ApiContext';
import {useMainContext} from '@/contexts/MainContext';
import {AxiosInstance} from 'axios';
import {setGenericPassword} from 'react-native-keychain';

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
  const contexts = useApiContext();
  const mainContexts = useMainContext();
  // const authInstance = contexts?.authInstance;
  const instance = contexts?.instance as AxiosInstance;

  const loginQuery = useMutation(
    async (data: userProps) => {
      const {email, password} = data;
      return await loginEmail({email, password, instance});
    },
    {
      onSuccess: async res => {
        const {access_token: accessToken, refresh_token: refreshToken} = res;

        mainContexts?.setAuthState({
          accessToken,
          refreshToken,
          authenticated: true,
        });

        await setGenericPassword(
          'token',
          JSON.stringify({
            accessToken,
            refreshToken,
          }),
        );
      },
    },
  );

  const signUpQuery = useMutation(
    async (data: userProps) => {
      const {email, password} = data;
      await signUp({email, password, instance});
    },
    {
      onSuccess: res => console.log(res),
    },
  );

  const checkEmailQuery = useMutation(
    async (data: emailProps) => {
      const {email} = data;
      await checkEmail({email, instance});
    },
    {
      onSuccess: res => res,
    },
  );

  const checkEmailPasswordQuery = useMutation(
    async (data: emailProps) => {
      const {email} = data;
      await checkEmailPassword({email, instance});
    },
    {
      onSuccess: res => res,
    },
  );

  const verifyAuthCodeQuery = useMutation(
    async (data: authProps) => {
      const {email, auth_number} = data;
      await verifyAuthCode({email, auth_number, instance});
    },
    {
      onSuccess: res => res,
    },
  );

  const resetPasswordQuery = useMutation(
    async (data: userProps) => {
      const {email, password} = data;
      await resetPassword({email, password, instance});
    },
    {
      onSuccess: res => res,
    },
  );

  return {
    loginQuery,
    signUpQuery,
    checkEmailQuery,
    checkEmailPasswordQuery,
    verifyAuthCodeQuery,
    resetPasswordQuery,
  };
}
