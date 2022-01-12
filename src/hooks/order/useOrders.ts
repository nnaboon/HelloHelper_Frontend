import useAxios from 'axios-hooks';
import { OrderGetDto } from 'models/OrderGetDto';

export type OrdersListResponse = {
  data: Array<OrderGetDto>;
  message: string;
};

export const useOrders = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<OrdersListResponse>({}, { manual: true });

  const execute = () => {
    return fire({ url: `http://localhost:5000/order` });
  };

  return {
    data: response?.data as OrderGetDto[],
    loading: loading,
    error,
    execute
  };
};
