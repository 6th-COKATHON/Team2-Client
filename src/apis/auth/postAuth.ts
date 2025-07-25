import { API_DOMAINS } from "@/constants/api";
import { authApi } from "../axios-instance";

export const postLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = authApi.post(API_DOMAINS.LOGIN, {
    email,
    password,
  });
  return res;
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
