import useAxios from 'axios-hooks';

export const useDeleteUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (requestId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/delete/${requestId}`,
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
