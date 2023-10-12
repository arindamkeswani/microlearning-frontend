import { Client } from "../axios";

export const getTags = async (params) => {
  const {
    data: { data },
  } = await Client.get("/tags", { params });
  return data;
};

export const addTags = async ({ payload }) => {
  const res = Client.post("/tags", payload);
  return res;
};
