import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddProvidedUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (requestId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/request/provided/${requestId}`,
      data
    });
  };
  return {
    data: response?.data,
    loading,
    error,
    execute
  };
};
