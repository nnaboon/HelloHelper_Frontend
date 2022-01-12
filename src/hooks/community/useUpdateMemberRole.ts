import useAxios from 'axios-hooks';

export const useUpdateMemberRole = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'PUT' },
    { manual: true }
  );

  // data = role, userId
  const execute = (communityId: string, userId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/community/request/${communityId}/${userId}`,
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
