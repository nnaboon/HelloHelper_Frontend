import useAxios from 'axios-hooks';

export const useAddRequesterUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (provideId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/provide/requester/${provideId}`,
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
