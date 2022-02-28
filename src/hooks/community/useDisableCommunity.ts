import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDisableCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  //Data = userId
  const execute = (communityId: string) => {
    return fire({
      url: `${REACT_APP_API}/community/${communityId}/disable`
    });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
