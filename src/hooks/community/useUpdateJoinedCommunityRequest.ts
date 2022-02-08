import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateJoinedCommunityRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = joinedRequestId, status, userId
  const execute = (communityId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/update/join/${communityId}`,
      data
    });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
