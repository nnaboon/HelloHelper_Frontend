import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useCommunityMember = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (communityId: string) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}/member`
    });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
