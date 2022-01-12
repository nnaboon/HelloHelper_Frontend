import useAxios from 'axios-hooks';

export const useAddRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );
  const execute = (data: object) => {
    return fire({
      url: `http://localhost:5000/request`,
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
