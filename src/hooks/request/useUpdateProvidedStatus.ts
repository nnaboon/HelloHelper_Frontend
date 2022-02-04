import useAxios from 'axios-hooks';

export const useUpdateProvidedStatus = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (requestId: string, provideId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/request/provided/${requestId}/${provideId}`,
      data
    });
  };
  return {
    data: response,
    loading,
    error,
    execute
  };
};
