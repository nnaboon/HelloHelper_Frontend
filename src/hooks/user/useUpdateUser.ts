import useAxios from 'axios-hooks';

export const useUpdateUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (userId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/user/${userId}`,
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
