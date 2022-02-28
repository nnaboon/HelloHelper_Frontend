import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddMember = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
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
