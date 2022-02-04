import useAxios from 'axios-hooks';

export const useCommunityJoinedRequestUserId = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'POST' },
    { manual: true }
  );

  const execute = (communityId: string, data: any) => {
    console.log(data.joinedRequestUserId);
    if (data.joinedRequestUserId.length > 0) {
      return fire({
        url: `http://localhost:5000/community/joined/${communityId}`,
        data
      });
    } else {
      return null;
    }
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
