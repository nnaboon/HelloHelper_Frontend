import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UserGetDto';
import { REACT_APP_API } from 'config';

export type UsersListResponse = {
  data: Array<UsersGetDto>;
  message: string;
};

export const useUsers = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<UsersListResponse>({}, { manual: true });

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/user` });
  };

  return {
    data: response?.data as UsersGetDto[],
    loading: loading,
    error,
    execute
  };
};
