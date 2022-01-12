import useAxios from 'axios-hooks';

export const useDeleteCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'PUT' },
    { manual: true }
  );

  //Data = userId
  const execute = (communityId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/community/delete/${communityId}`,
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
