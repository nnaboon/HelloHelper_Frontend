import useAxios from 'axios-hooks';

export const useUpdateCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (communityId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/community/${communityId}`,
      data
    });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
