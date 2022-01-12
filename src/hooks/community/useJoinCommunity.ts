import useAxios from 'axios-hooks';

export const useJoinCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({
      url: `http://localhost:5000/community/join`
    });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
