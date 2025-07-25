import { API_DOMAINS } from "@/constants/api";
import { authApi } from "../axios-instance";
import { generateApiPath } from "@/utils/generateApiPath";

export const getDetail = async ({ articleId }: { articleId: string }) => {
  const res = await authApi.get(
    generateApiPath(API_DOMAINS.GET_DETAIL, { articleId }),
  );

  return res.data;
};
