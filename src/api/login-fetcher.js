// import { Client } from "@/shared/api-client";

import { Client } from "../axios";

export const login = async ({ payload }) => {
  return await Client.post("/user/login", payload);
};
