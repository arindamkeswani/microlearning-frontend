import { useQuery } from "react-query";
import { getProducts } from "../fetcher/productFetcher";

const FALLBACK_RESPONSE = { data: [] };
export const useGetProducts = ({ params, route }) => {
  const { data, isFetching } = useQuery(
    [`get-${params.type}`, params.type, params.page, route],
    () => getProducts(params, route)
  );

  return {
    data: data || FALLBACK_RESPONSE,
    isLoading: isFetching,
  };
};
