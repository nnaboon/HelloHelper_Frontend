import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddRequesterUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (requestId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/request/requester/${requestId}`,
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
