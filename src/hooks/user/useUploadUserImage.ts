import useAxios from 'axios-hooks';
import { REACT_APP_API } from 'config';

export const useUploadUserImage = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (data: any) => {
    return fire({ url: `${REACT_APP_API}/user/upload`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
