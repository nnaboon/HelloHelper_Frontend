import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UserGetDto';
import { REACT_APP_API } from 'config';

export type UsersResponse = {
  data: UsersGetDto;
  message: string;
};

export const useVerifyToken = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      }
    },
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/user/verify` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
