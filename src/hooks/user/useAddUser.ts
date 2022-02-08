import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (userId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/user`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
