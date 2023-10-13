import { useQuery } from "react-query";
import { getTopicsInsights } from "../fetcher/studentInsights";

const FALLBACK_RESPONSE = {};
export const useGetTopicInsights = ({ params }) => {
  const { data, isFetching } = useQuery(
    ["get_topic_insights", params.type, params.page],
    () => getTopicsInsights(params)
  );

  return {
    data: data?.data || FALLBACK_RESPONSE,
    isLoading: isFetching,
  };
};
