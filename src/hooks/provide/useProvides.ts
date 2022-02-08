import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';
import { REACT_APP_API } from 'config';

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
    return fire({ url: `${REACT_APP_API}/provide` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
