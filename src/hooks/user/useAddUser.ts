import useAxios from 'axios-hooks';

export const useAddCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (userId: string, data: object) => {
    return fire({ url: `http://localhost:5000/user/${userId}`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
