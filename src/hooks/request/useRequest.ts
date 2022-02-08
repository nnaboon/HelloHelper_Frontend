import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';
import { REACT_APP_API } from 'config';

export const useRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (requestId: string) => {
    return fire({ url: `${REACT_APP_API}/request/${requestId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
