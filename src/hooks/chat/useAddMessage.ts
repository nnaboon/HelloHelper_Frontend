import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddMessage = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'POST' },
    { manual: true }
  );

  const execute = (chatId: string, data: object) => {
    return fire({ url: `${REACT_APP_API}/chat/${chatId}/message`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
