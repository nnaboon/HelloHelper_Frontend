import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDeleteProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (provideId: string) => {
    return fire({
      url: `${REACT_APP_API}/provide/${provideId}/delete`
    });
  };

  return {
    data: response,
    loading,
    error,
    execute
  };
};
