import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDisableUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({
      url: `${REACT_APP_API}/user/${userId}/disable`
    });
  };

  return {
    data: response,
    loading,
    error,
    execute
  };
};
