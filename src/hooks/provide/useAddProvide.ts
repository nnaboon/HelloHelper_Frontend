import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );
  const execute = (data: object) => {
    return fire({
      url: `${REACT_APP_API}/provide`,
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
