import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';
import { REACT_APP_API } from 'config';

export type RequestsListResponse = {
  data: Array<RequestGetDto>;
  message: string;
};

export const useRequests = () => {
  const [{ data: response, loading, error }, fire] = useAxios<RequestGetDto[]>(
    {},
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `${REACT_APP_API}/request` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
