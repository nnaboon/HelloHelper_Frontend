import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';

export type ProvidesListResponse = {
  data: Array<ProvideGetDto>;
  message: string;
};

export const useProvides = () => {
  const [{ data: response, loading, error }, fire] = useAxios<ProvideGetDto[]>(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `http://localhost:5000/provide` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
