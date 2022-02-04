import useAxios from 'axios-hooks';

export const useUpdateJoinedCommunityRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = joinedRequestId, status, userId
  const execute = (communityId: string, data: object) => {
    return fire({
      url: `http://localhost:5000/community/update/join/${communityId}`,
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
