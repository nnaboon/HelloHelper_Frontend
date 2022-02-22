import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UserGetDto';
import { REACT_APP_API } from 'config';

export type UsersResponse = {
  data: UsersGetDto;
  message: string;
};

export const useVerifyToken = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (data: object) => {
    return fire({ url: `${REACT_APP_API}/user/verify`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
