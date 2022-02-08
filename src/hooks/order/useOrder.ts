import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (orderId: string) => {
    return fire({ url: `${REACT_APP_API}/order/${orderId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
