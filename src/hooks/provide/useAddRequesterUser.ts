import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddRequesterUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (provideId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/provide/requester/${provideId}`,
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
