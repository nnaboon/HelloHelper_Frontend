import useAxios from 'axios-hooks';

export const useUploadRequestImage = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (data: any) => {
    return fire({ url: `http://localhost:5000/request/upload`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
