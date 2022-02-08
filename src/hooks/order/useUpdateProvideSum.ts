import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUpdateProvideSum = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = userId, provideId, rating
  const execute = (data: object) => {
    return fire({ url: `${REACT_APP_API}/order/sum/provide`, data });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
