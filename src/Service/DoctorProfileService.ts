import axiosInstance from '../Interceptor/AxiosInterceptor';

const getDoctor = async (id: number) => {
  return axiosInstance
    .get('profile/doctor/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const updateDoctor = async (doctor: any) => {
  return axiosInstance
    .put('profile/doctor/update', doctor)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getDoctorDropdowns = async () => {
  return axiosInstance
    .get('profile/doctor/dropdowns')
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getDoctor, updateDoctor, getDoctorDropdowns };
