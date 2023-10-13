import { useQuery } from "react-query";
import { getLeaderBoard } from "../fetcher/leaderBoardFetcher";
import { getProducts } from "../fetcher/productFetcher";

const FALLBACK_RESPONSE = { data: [] };
export const useGetLeaderBoard = ({ params }) => {
  const { data, isFetching } = useQuery([`get-leaderboard`, params.type], () =>
    getLeaderBoard(params)
  );

  return {
    data: data || FALLBACK_RESPONSE,
    isLoading: isFetching,
  };
};
