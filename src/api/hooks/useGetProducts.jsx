import { useQuery } from "react-query";
import { getProducts } from "../fetcher/productFetcher";

const FALLBACK_RESPONSE = { data: [] };
export const useGetProducts = ({ params }) => {
  const { data, isFetching } = useQuery(
    ["Get_Products", params.type, params.page],
    () => getProducts(params)
  );

  return {
    data: data || FALLBACK_RESPONSE,
    isLoading: isFetching,
  };
};
