import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useMyProvideOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `${REACT_APP_API}/order/provide/${userId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
