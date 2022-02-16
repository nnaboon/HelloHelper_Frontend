import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateRequestSum = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = requesterUserId, providerUserId,rating
  const execute = (orderId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/order/${orderId}/sum/request`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
