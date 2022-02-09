import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddProvidedUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  // data = userId of owner
  const execute = (requestId: string, userId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/request/${requestId}/provided/${userId}`,
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
