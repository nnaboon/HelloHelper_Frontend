import useAxios from 'axios-hooks';

export const useUpdateRequestSum = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  //data = userId
  const execute = (data: object) => {
    return fire({ url: `http://localhost:5000/order/request`, data });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
