import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateMemberRole = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  // data = role, userId
  const execute = (communityId: string, userId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}/member/${userId}`,
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
