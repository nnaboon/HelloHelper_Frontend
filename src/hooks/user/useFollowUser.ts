import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useFollowUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `${REACT_APP_API}/user/${userId}/follow` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
