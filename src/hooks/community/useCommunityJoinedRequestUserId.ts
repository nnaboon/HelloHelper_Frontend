import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useCommunityJoinedRequestUserId = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  const execute = (communityId: string, data: any) => {
    if (data.joinedRequestUserId.length > 0) {
      return fire({
        url: `${REACT_APP_API}/community/${communityId}/joined`,
        data
      });
    } else {
      return null;
    }
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
