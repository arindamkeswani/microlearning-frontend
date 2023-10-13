import { Client } from "../../axios";

export const getProducts = async (params) => {
  const {
    data: { data },
  } = await Client.get("/items", {
    params,
  });
  return {
    data: data,
    params: params.page,
    // totalPages: limit !== "none" ? Math.ceil(totalCount / limit) : 1,
  };
};

export const addItems = async ({ payload }) => {
  const res = Client.post("/items", payload);
  return res;
};
