import useAxios from 'axios-hooks';

export const useMyProvideOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (userId: string) => {
    return fire({ url: `http://localhost:5000/order/provide/${userId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
