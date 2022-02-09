import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useBanMember = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'PUT' },
    { manual: true }
  );

  //data = userId
  const execute = (communityId: string, userId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}/ban/${userId}`,
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
