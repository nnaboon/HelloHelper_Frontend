import useAxios from 'axios-hooks';

export const useDeleteProvide = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  // data = userId (deleted by who)
  const execute = (provideId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/provide/delete/${provideId}`,
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
