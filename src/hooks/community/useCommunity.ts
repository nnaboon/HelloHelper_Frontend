import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';
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
    return fire({ url: `${REACT_APP_API}/community/${communityId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
