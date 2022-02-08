import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDeleteProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (provideId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/provide/delete/${provideId}`,
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
