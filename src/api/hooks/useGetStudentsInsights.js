import { useQuery } from "react-query";
import { getProducts } from "../fetcher/productFetcher";
import { getStudentsInsights } from "../fetcher/studentInsights";

const FALLBACK_RESPONSE = [];
export const useGetStudentsInsights = ({ params }) => {
  const { data, isFetching } = useQuery(
    ["get_students_insights", params.type, params.page],
    () => getStudentsInsights(params)
  );

  return {
    data: data?.data || FALLBACK_RESPONSE,
    isLoading: isFetching,
  };
};
