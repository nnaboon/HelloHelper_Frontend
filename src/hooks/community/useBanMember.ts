import useAxios from 'axios-hooks';

export const useBanMember = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'PUT' },
    { manual: true }
  );

  //data = userId
  const execute = (communityId: string, userId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/community/ban/${communityId}/${userId}`,
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