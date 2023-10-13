import { Client, CLOUDFRONT_BASE_URL } from "../../axios";

export const getLeaderBoard = async (params) => {
  const {
    data: { data },
  } = await Client.get("/dashboards/leaderboard", {
    params,
  });
  return {
    data: data,
  };
};
