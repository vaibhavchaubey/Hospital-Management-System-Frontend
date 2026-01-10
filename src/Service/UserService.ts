import axiosInstance from '../Interceptor/AxiosInterceptor';
import type { LoginUserInput, RegisterUserInput } from '../types';

const registerUser = async (user: RegisterUserInput) => {
  return axiosInstance
    .post('user/register', user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const loginUser = async (user: LoginUserInput) => {
  return axiosInstance
    .post('user/login', user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getUserProfile = async (id: number) => {
  return axiosInstance
    .get('user/getProfile/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { registerUser, loginUser, getUserProfile };
