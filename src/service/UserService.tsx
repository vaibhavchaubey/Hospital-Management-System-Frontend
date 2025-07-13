import axiosInstance from '../Interceptor/AxiosInterceptor';
import type { RegisterUserInput } from '../types';

const registerUser = async (user: RegisterUserInput) => {
  return axiosInstance
    .post('user/register', user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { registerUser };
