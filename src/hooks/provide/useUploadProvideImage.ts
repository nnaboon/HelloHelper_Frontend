import useAxios from 'axios-hooks';

export const useUploadProvideImage = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'POST'
    },
    { manual: true }
  );

  const execute = (data: any) => {
    return fire({ url: `http://localhost:5000/provide/upload`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
