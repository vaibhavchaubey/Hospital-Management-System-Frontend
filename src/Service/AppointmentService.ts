import axiosInstance from '../Interceptor/AxiosInterceptor';
import type { ScheduleAppointmentInput } from '../types';

const scheduleAppointment = async (data: ScheduleAppointmentInput) => {
  return axiosInstance
    .post('appointment/schedule')
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { scheduleAppointment };