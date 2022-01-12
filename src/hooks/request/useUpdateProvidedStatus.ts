import useAxios from 'axios-hooks';

export const useUpdateProvidedStatus = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (requestId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/request/provided/${requestId}`,
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
