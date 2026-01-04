import axiosInstance from '../Interceptor/AxiosInterceptor';
import type { PatientProfile } from '../types';

const getPatient = async (id: number) => {
  return axiosInstance
    .get('profile/patient/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const updatePatient = async (patient: Partial<PatientProfile>) => {
  return axiosInstance
    .put('profile/patient/update', patient)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAllPatients = async () => {
  return axiosInstance
    .get('profile/patient/getAll')
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getPatient, updatePatient, getAllPatients };
