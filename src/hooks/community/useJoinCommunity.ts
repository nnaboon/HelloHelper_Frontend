import useAxios from 'axios-hooks';

export const useJoinCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (data: object) => {
    return fire({
      url: `http://localhost:5000/community/join`,
      data
    });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
