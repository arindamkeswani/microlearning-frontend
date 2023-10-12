import { Client } from "../../axios";

export const getFeed = async (params) => {
  const {
    data: { data },
  } = await Client.get("/quick-learning/feed", {
    params,
  });
  return {
    data: data,
    params: params.page,
    // totalPages: limit !== "none" ? Math.ceil(totalCount / limit) : 1,
  };
};
