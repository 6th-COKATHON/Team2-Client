import { authApi } from "../axios-instance";
import { API_DOMAINS } from "@/constants/api";

export const getArticle = async () => {
  const res = await authApi.get(API_DOMAINS.GET_ARTICLE);
  return res.data;
};
