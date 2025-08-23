import axiosInstance from '../Interceptor/AxiosInterceptor';
import type { ScheduleAppointmentPayload } from '../types';

const scheduleAppointment = async (data: ScheduleAppointmentPayload) => {
 
  return axiosInstance
    .post('appointment/schedule', data)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const cancelAppointment = async (id: number) => {
  return axiosInstance
    .put('appointment/cancel/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAppointment = async (id: number) => {
  return axiosInstance
    .get('appointment/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAppointmentDetails = async (id: number) => {
  return axiosInstance
    .get('appointment/get/details/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export {
    cancelAppointment,
    getAppointment,
    getAppointmentDetails, scheduleAppointment
};

