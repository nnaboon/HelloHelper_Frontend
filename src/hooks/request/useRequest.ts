import useAxios from 'axios-hooks';
import { RequestGetDto } from 'models/RequestGetDto';

export type RequestResponse = {
  data: RequestGetDto;
  message: string;
};

export const useRequest = () => {
  const [{ data: response, loading, error }, fire] = useAxios<RequestResponse>(
    {},
    { manual: true }
  );

  const execute = (requestId: string) => {
    return fire({ url: `http://localhost:5000/request/${requestId}` });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
