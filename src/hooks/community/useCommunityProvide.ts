import useAxios from 'axios-hooks';
import { ProvideGetDto } from 'models/ProvideGetDto';

export type CommunityProvideListResponse = {
  data: Array<ProvideGetDto>;
  message: string;
};

export const useCommunityProvide = () => {
  const [{ data: response, loading, error }, fire] =
    useAxios<CommunityProvideListResponse>({}, { manual: true });

  const execute = (communityId: string) => {
    return fire({
      url: `http://localhost:5000/community/provide/${communityId}`
    });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
