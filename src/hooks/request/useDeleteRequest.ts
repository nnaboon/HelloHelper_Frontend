import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDeleteRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  const execute = (requestId: string) => {
    return fire({
      url: `${REACT_APP_API}/request/${requestId}/delete`
    });
  };

  return {
    data: response,
    loading,
    error,
    execute
  };
};
