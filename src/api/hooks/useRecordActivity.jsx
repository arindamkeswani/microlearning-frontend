import { useMutation } from "react-query";
import { recordActivity } from "../fetcher/feedFetcher";

export const useRecordActivity = () => {
  const { data, mutate: recordActivityFetcher } = useMutation(
    ["update-issueResolution"],
    recordActivity
  );
  return {
    recordActivityFetcher,
    data: data,
  };
};
