import axios, { AxiosError } from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { path } from "@/routes/path";
import { API_DOMAINS } from "@/constants/api";

// _retryCount 커스텀 속성을 포함하기 위한 인터페이스 확장
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

// 여러 요청 동시 실패 시 대기열에 사용할 Promise 타입
interface FailedQueuePromise {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = (
  baseURL: string,
  options?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    ...options,
  });
  return instance;
};

export const authApi: AxiosInstance = axiosInstance(BASE_URL);

// --- 인터셉터 로직 ---

let isRefreshing = false;
let failedQueue: FailedQueuePromise[] = [];

const MAX_RETRIES = 3; // 최대 재시도 횟수

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * 요청 인터셉터
 */
export const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

/**
 * 요청 에러 인터셉터
 */
export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error("[Request Error]", error);
  return Promise.reject(error);
};

/**
 * 응답 에러 인터셉터 (401, 403 에러 처리)
 */
export const onError = async (
  error: AxiosError,
  api: AxiosInstance,
): Promise<AxiosResponse> => {
  const originalRequest = error.config as CustomAxiosRequestConfig;
  const { status } = error.response || {};

  // config가 없으면 재요청 불가
  if (!originalRequest) {
    return Promise.reject(error);
  }

  const currentRetryCount = originalRequest._retryCount || 0;

  // 401 에러 처리 및 토큰 재발급 로직
  if (status === 401 && currentRetryCount < MAX_RETRIES) {
    originalRequest._retryCount = currentRetryCount + 1;

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const response = await api.post(
        API_DOMAINS.LOGIN,
        {},
        {
          withCredentials: true, // 리프레시 토큰을 쿠키로 보낼 경우
        },
      );

      const authorizationHeader = response.headers.authorization;
      const newAccessToken = authorizationHeader.split(" ")[1];

      useAuthStore.getState().setAccessToken(newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);
      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAccessToken();
      processQueue(refreshError as AxiosError, null);
      window.location.replace(path.auth);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // 재시도 횟수를 초과한 401 에러 처리
  if (status === 401 && currentRetryCount >= MAX_RETRIES) {
    console.error(
      `[Retry Failed] 재시도 횟수(${MAX_RETRIES})를 초과했습니다. 로그아웃 처리합니다.`,
    );
    alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
    useAuthStore.getState().clearAccessToken();
    window.location.replace(path.auth);
    return Promise.reject(error);
  }

  // 403 Forbidden 에러 처리
  if (status === 403) {
    console.error(
      "🚫 403 Forbidden. 접근 권한이 없습니다. 로그아웃 처리합니다.",
    );
    alert("요청에 대한 접근 권한이 없습니다. 다시 로그인해 주세요.");
    useAuthStore.getState().clearAccessToken();
    window.location.replace(path.auth);
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

// --- 인터셉터 적용 ---

// 요청 인터셉터
authApi.interceptors.request.use(onRequest, onRequestError);

// 응답 인터셉터
authApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => onError(error, authApi),
);
