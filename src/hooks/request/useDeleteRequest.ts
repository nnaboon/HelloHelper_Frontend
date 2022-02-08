import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDeleteUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (requestId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/delete/${requestId}`,
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
