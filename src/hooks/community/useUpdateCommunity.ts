import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (communityId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}`,
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
