import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  // data = userId
  const execute = (communityId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}/member`,
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
