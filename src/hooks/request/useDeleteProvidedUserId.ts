import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDeletedProvidedUserId = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'DELETE'
    },
    { manual: true }
  );

  // data = userId of owner
  const execute = (requestId: string) => {
    return fire({
      url: `${REACT_APP_API}/request/${requestId}/provided`
    });
  };
  return {
    data: response,
    loading,
    error,
    execute
  };
};
