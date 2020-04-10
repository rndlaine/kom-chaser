const useGetRouteId = pathname => {
  var param = pathname.lastIndexOf('/');
  var id = pathname.substring(param + 1);

  return { id };
};

export default useGetRouteId;
