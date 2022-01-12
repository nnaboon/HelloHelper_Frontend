import useAxios from 'axios-hooks';

export const useUpdateRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (requestId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/request/${requestId}`,
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
