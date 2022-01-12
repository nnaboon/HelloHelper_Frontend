import useAxios from 'axios-hooks';

export const useAddOrders = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'POST' },
    { manual: true }
  );

  const execute = () => {
    return fire({ url: `http://localhost:5000/order` });
  };

  return {
    data: response?.data,
    loading: loading,
    error,
    execute
  };
};
