import useAxios from 'axios-hooks';

export const useCommunities = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `http://localhost:5000/community` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
