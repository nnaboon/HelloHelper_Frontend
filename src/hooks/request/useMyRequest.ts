import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useMyRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `${REACT_APP_API}/request/user/${userId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
