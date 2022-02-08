import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (orderId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/order/status/${orderId}`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
