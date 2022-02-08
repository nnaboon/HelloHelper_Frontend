import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useCommunities = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/community` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
