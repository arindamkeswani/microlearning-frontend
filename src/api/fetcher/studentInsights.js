import { Client } from "../../axios";

export const getStudentsInsights = async (params) => {
  const {
    data: { data },
  } = await Client.get("/dashboards/student-insights", {
    params: { page: 1, limit: "none" },
  });
  return {
    data: data,
    params: params.page,
    // totalPages: limit !== "none" ? Math.ceil(totalCount / limit) : 1,
  };
};
