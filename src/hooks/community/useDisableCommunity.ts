import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDisableCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'PUT' },
    { manual: true }
  );

  //Data = userId
  const execute = (communityId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}/disable`,
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