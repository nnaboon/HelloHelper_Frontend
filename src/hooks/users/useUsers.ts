import useAxios from 'axios-hooks';
import { UsersGetDto } from 'models/UsersGetDto';

export type UsersListResponse = {
  data: Array<UsersGetDto>;
  message: string;
};

export const useUsers = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<UsersListResponse>({}, { manual: true });

  const execute = () => {
    return fire({ url: `http://localhost:5000/users` });
  };

  return {
    data: response?.data as UsersGetDto[],
    loading: loading,
    error,
    execute
  };
};
