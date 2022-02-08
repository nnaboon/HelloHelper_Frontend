import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';
import { REACT_APP_API } from 'config';

export const useProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (provideId: string) => {
    return fire({ url: `${REACT_APP_API}/provide/${provideId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
