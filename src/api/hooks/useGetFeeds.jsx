import { useQuery } from "react-query";
import { getFeed } from "../fetcher/feedFetcher";
import { getProducts } from "../fetcher/productFetcher";

const FALLBACK_RESPONSE = { data: [] };
export const useGetFeeds = ({ params }) => {
  const { data, isFetching } = useQuery(["Get_Feeds", params.page], () =>
    getFeed(params)
  );

  return {
    data: data || FALLBACK_RESPONSE,
    isLoading: isFetching,
  };
};
