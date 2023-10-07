import {useMutation} from '@tanstack/react-query';
import {
  signUp,
  loginEmail,
  getUserInfo,
  updateUserInfo,
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

interface userInfoProps {
  nickname: string;
  position: number[];
}

export default function useUser() {
  const contexts = useApiContext();
  const mainContexts = useMainContext();
  const authInstance = contexts?.authInstance as AxiosInstance;
  const instance = contexts?.instance as AxiosInstance;

  const loginQuery = useMutation(
    async (data: userProps) => {
      const {email, password} = data;
      return await loginEmail({email, password, instance});
    },
    {
      onSuccess: async res => {
        const {access_token: accessToken, refresh_token: refreshToken} = res;
        console.log(res);

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

        await getUserInfoQuery();
      },
    },
  );

  const getUserInfoQuery = async () => {
    const res = await getUserInfo(authInstance);

    mainContexts?.setUser({
      email: res?.email,
      nickname: res.profile[0].nickname,
      join_profile: res.profile[0].join_profile,
    });
  };

  // const getUserInfoQuery = useMutation(
  //   async () => {
  //     return await getUserInfo(authInstance);
  //   },
  //   {
  //     onSuccess: async res => {
  //       console.log('호출이되야하는데?');
  //       console.log(res);

  //       mainContexts?.setUser({
  //         email: res?.email,
  //         nickname: res.profile[0].nickname,
  //         join_profile: res.profile[0].join_profile,
  //       });
  //     },
  //   },
  // );

  const updateUserInfoQuery = useMutation(
    async (data: userInfoProps) => {
      const {nickname, position} = data;

      return await updateUserInfo({nickname, position, instance: authInstance});
    },
    {
      onSuccess: res => res,
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
    getUserInfoQuery,
    updateUserInfoQuery,
    signUpQuery,
    checkEmailQuery,
    checkEmailPasswordQuery,
    verifyAuthCodeQuery,
    resetPasswordQuery,
  };
}
