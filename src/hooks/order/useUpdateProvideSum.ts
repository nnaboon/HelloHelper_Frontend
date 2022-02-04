import useAxios from 'axios-hooks';

export const useUpdateProvideSum = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = userId, provideId, rating
  const execute = (data: object) => {
    return fire({ url: `http://localhost:5000/order/sum/provide`, data });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
