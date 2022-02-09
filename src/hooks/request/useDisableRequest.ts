import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDisableRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (requestId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/request/${requestId}/disable`,
      data
    });
  };

  return {
    data: response,
    loading,
    error,
    execute
  };
};
