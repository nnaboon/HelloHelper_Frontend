import useAxios from 'axios-hooks';

export const useUpdateOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  const execute = (orderId: string, data: object) => {
    return fire({ url: `http://localhost:5000/order/${orderId}`, data });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
