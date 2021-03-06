import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (communityId: string) => {
    return fire({ url: `${REACT_APP_API}/community/${communityId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
