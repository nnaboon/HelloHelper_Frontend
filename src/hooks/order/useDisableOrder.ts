import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDisableOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data: userId
  const execute = (orderId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/order/${orderId}/disable`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
