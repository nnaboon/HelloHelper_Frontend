import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateUserRank = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (userId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/user/${userId}/rank`,
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
