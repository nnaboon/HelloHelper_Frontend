import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddRequesterUser = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  //data: myUserId
  const execute = (requestId: string, userId: string, data: object) => {
    return fire({
      url: `${REACT_APP_API}/request/${requestId}/requester/${userId}`,
      data
    });
  };
  return {
    data: response,
    loading,
    error,
    execute
  };
};
