import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useRequesterRating = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = userId, provideId, rating
  const execute = (orderId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/order/${orderId}/requester`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
