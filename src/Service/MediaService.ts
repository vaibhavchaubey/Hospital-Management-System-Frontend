import axiosInstance from '../Interceptor/AxiosInterceptor';

const uploadMedia = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getMedia = async (id: number) => {
  return axiosInstance
    .get('/media/' + id, { responseType: 'blob' })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { uploadMedia, getMedia };
