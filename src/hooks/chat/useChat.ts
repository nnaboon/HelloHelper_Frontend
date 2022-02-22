import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useChat = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {},
    { manual: true }
  );

  const execute = (chatId: string) => {
    return fire({ url: `${REACT_APP_API}/chat/${chatId}` });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
