import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useJoinCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
    { manual: true }
  );

  const execute = (data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/join`,
      data
    });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
