import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useDeleteConfirmOrder = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'DELETE' },
    { manual: true }
  );

  const execute = (chatId: string) => {
    return fire({ url: `${REACT_APP_API}/order/confirm/${chatId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
