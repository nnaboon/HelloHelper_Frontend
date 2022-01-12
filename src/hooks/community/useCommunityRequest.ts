import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';

export type CommunityRequestListResponse = {
  data: Array<RequestGetDto>;
  message: string;
};

export const useCommunityRequest = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<CommunityRequestListResponse>({}, { manual: true });

  const execute = (communityId: string) => {
    return fire({
      url: `http://localhost:5000/community/request/${communityId}`
    });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
