import useAxios from 'axios-hooks';

export const useAddCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (data: object) => {
    return fire({ url: `http://localhost:5000/community`, data });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
