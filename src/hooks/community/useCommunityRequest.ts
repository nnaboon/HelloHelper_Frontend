import useAxios from 'axios-hooks';

export const useCommunityRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (communityId: string) => {
    return fire({
      url: `http://localhost:5000/community/request/${communityId}`
    });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
