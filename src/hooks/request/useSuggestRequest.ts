import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';
import { REACT_APP_API } from 'config';

export const useSuggestRequests = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/request/top/suggest` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
