import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';

export const useProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (provideId: string) => {
    return fire({ url: `http://localhost:5000/provide/${provideId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
