import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useRequests = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/request` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
