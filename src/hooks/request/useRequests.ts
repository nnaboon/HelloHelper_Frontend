import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';

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
    return fire({ url: `http://localhost:5000/request` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
