import useAxios from 'axios-hooks';

export const useAddProvidedUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
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
