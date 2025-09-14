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

const getAppointmentsByPatient = async (patientId: number) => {
  return axiosInstance
    .get('appointment/getAllByPatient/' + patientId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAppointmentsByDoctor = async (doctorId: number) => {
  return axiosInstance
    .get('appointment/getAllByDoctor/' + doctorId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const createAppointmentReport = async (data: any) => {
  return axiosInstance
    .post('/appointment/report/create', data)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const isReportExists = async (appointmentId: number) => {
  return axiosInstance
    .get('/appointment/report/isRecordExists/' + appointmentId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getReportsByPatientId = async (patientId: number) => {
  return axiosInstance
    .get('/appointment/report/getRecordsByPatientId/' + patientId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getPrescriptionsByPatientId = async (patientId: number) => {
  return axiosInstance
    .get('/appointment/report/getPrescriptionsByPatientId/' + patientId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export {
  cancelAppointment,
  getAppointment,
  getAppointmentDetails,
  scheduleAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  createAppointmentReport,
  isReportExists,
  getReportsByPatientId,
  getPrescriptionsByPatientId,
};
