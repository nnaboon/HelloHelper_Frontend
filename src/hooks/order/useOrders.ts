import useAxios from 'axios-hooks';
import { OrderGetDto } from 'models/OrderGetDto';
import { REACT_APP_API } from 'config';

export type OrdersListResponse = {
  data: Array<OrderGetDto>;
  message: string;
};

export const useOrders = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<OrdersListResponse>({}, { manual: true });

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/order` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
