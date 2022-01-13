import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';

export const useMyProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `http://localhost:5000/provide/me/${userId}` });
  };

  return {
    data: response || {},
    loading: loading,
    error,
    execute
  };
};
