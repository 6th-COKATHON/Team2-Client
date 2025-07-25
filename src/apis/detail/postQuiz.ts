import { API_DOMAINS } from "@/constants/api";
import { authApi } from "../axios-instance";
// types/quiz.ts (예시)

export interface QuizAnswer {
  id: number;
  answer: boolean;
}

export interface PostQuizPayload {
  articleId: string;
  answers: QuizAnswer[];
}

interface QuizSubmitResponse {
  score: number;
  totalQuestions: number;
  results: {
    id: number;
    correctAnswer: boolean;
  }[];
}

export const postQuiz = async (
  payload: PostQuizPayload,
): Promise<QuizSubmitResponse> => {
  // async/await를 사용하여 비동기 응답을 기다립니다.
  const response = await authApi.post(API_DOMAINS.POST_QUIZ, payload);

  // 실제 데이터인 response.data를 반환합니다.
  return response.data;
};
