import useAxios from 'axios-hooks';

export const useUpdateRequestSum = () => {
  const [{ data: response, loading, error }, fire] = useAxios(
    {
      method: 'PUT'
    },
    { manual: true }
  );

  //data = requesterUserId, providerUserId,rating
  const execute = (data: object) => {
    return fire({ url: `http://localhost:5000/orde/sum/request`, data });
  };

  return {
    data: response,
    loading: loading,
    error,
    execute
  };
};
