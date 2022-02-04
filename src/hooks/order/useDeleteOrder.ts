import useAxios from 'axios-hooks';

export const useDeleteOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data: userId
  const execute = (orderId: string, data: object) => {
    return fire({ url: `http://localhost:5000/order/delete/${orderId}`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
