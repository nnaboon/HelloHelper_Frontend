import useAxios from 'axios-hooks';

export const useAddProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );
  const execute = (data: object) => {
    return fire({
      url: `http://localhost:5000/provide`,
      data
    });
  };
  return {
    data: response?.data,
    loading,
    error,
    execute
  };
};
