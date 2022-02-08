import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';
import { REACT_APP_API } from 'config';

export type ProvideResponse = {
  data: ProvideGetDto;
  message: string;
};

export const useUpdateProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (provideId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/provide/${provideId}`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
