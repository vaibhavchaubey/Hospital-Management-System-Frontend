import axiosInstance from '../Interceptor/AxiosInterceptor';

const addSales = async (data: any) => {
  return axiosInstance
    .post('pharmacy/sales/create', data)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getSales = async (id: number) => {
  return axiosInstance
    .get('pharmacy/sales/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAllSaleItems = async (id: number) => {
  return axiosInstance
    .get('pharmacy/sales/getSaleItems/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const updateSales = async (data: any) => {
  return axiosInstance
    .put('pharmacy/sales/update', data)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAllSales = async () => {
  return axiosInstance
    .get('pharmacy/sales/getAll')
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { addSales, getSales, getAllSaleItems, updateSales, getAllSales };
