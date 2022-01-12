import useAxios from 'axios-hooks';

export const useAddRequesterUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (requestId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/request/requester/${requestId}`,
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
