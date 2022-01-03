import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';

export type ProvideResponse = {
  data: Array<ProvideGetDto>;
  message: string;
};

export const useProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios<ProvideResponse>(
    {},
    { manual: true }
  );

  const execute = (provideId: string) => {
    return fire({ url: `http://localhost:5000/provide/${provideId}` });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
