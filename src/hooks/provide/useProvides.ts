import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';

export type ProvidesListResponse = {
  data: Array<ProvideGetDto>;
  message: string;
};

export const useProvides = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<ProvidesListResponse>({}, { manual: true });

  const execute = () => {
    return fire({ url: `http://localhost:5000/provide` });
  };

  return {
    data: response?.data as ProvideGetDto[],
    loading: loading,
    error,
    execute
  };
};
