import useAxios from 'axios-hooks';
import { CommunityGetDto } from 'models/CommunityGetDto';

export type CommunityResponse = {
  data: CommunityGetDto;
  message: string;
};

export const useCommunity = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (communityId: string) => {
    return fire({ url: `http://localhost:5000/community/${communityId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
