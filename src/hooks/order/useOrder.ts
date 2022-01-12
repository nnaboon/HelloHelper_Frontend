import useAxios from 'axios-hooks';
import { OrderGetDto } from 'models/OrderGetDto';

export type OrderResponse = {
  data: OrderGetDto;
  message: string;
};

export const useOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios<OrderResponse>(
    {},
    { manual: true }
  );

  const execute = (orderId: string) => {
    return fire({ url: `http://localhost:5000/order/${orderId}` });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
