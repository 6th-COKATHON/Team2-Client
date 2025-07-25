import { API_DOMAINS } from "@/constants/api";
import { authApi } from "../axios-instance";
import { useAuthStore } from "@/store/useAuthStore";

interface LoginPayload {
  email: string;
  password: string;
}

export const postLogin = async (payload: LoginPayload) => {
  const response = await authApi.post(API_DOMAINS.LOGIN, payload);

  const accessToken = response.data.data.accessToken;
  useAuthStore.getState().setAccessToken(accessToken);

  return response.data;
};
export const postSignUp = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = authApi.post(API_DOMAINS.SIGNUP, {
    email,
    password,
  });
  return res;
};
