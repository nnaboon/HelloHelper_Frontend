import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UserGetDto';
import { REACT_APP_API } from 'config';

export type UsersResponse = {
  data: UsersGetDto;
  message: string;
};

export const useUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `${REACT_APP_API}/user/${userId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
