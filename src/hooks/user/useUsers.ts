import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UserGetDto';

export type UsersListResponse = {
  data: Array<UsersGetDto>;
  message: string;
};

export const useUsers = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<UsersListResponse>({}, { manual: true });

  const execute = () => {
    return fire({ url: `http://localhost:5000/user` });
  };

  return {
    data: response?.data as UsersGetDto[],
    loading: loading,
    error,
    execute
  };
};
