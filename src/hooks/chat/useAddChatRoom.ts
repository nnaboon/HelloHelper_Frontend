import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useAddChatRoom = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    { method: 'POST' },
    { manual: true }
  );

  const execute = (data: object) => {
    return fire({ url: `${REACT_APP_API}/chat`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
