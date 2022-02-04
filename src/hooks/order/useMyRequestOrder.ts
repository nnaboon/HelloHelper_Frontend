import useAxios from 'axios-hooks';

export const useMyRequestOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `http://localhost:5000/order/request/${userId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
