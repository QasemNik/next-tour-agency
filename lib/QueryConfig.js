const defaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 2, // Will retry failed requests 1 time before displaying an error
    cacheTime: 1000 * 60 * 10, // 10 mins
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  },
  mutation: {
    retry: 0,
  },
};

export default defaultOptions;
