import { Client } from "../axios";

export const addContentEntry = async ({ payload }) => {
  const res = Client.post("/quick-learning/content", payload);
  return res;
};

export const getGeneratedTranscript = async (params) => {
  const {
    data: { data },
  } = await Client.get("/ai/generate/transcript", { params });
  return {
    data,
  };
};

export const getGeneratedQuestion = async (params) => {
  const {
    data: { data },
  } = await Client.get("/ai/generate/question", { params });
  return data;
};

export const publishContent = async ({ payload }) => {
  const res = Client.patch("/quick-learning/content", payload);
  return res;
};
