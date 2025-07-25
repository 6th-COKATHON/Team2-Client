//@ts-nocheck
import { getDetail } from "@/apis/detail/getDetail";
import { PotatoFarmNewsArticle } from "@/components/article/PotatoFarmNewsArticle";
import { PotatoQuizComponent } from "@/components/article/PotatoQuizComponent";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { mockData, type Article } from "@/constants/dummyArticleData";
import axios from "axios";
import { useEffect } from "react";

export const ArticleDetail = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const articleMap = new Map<string, Article>(
    mockData.map((article) => [article.articleId, article]),
  );

  const articleData = articleMap.get(articleId as string);

  const {
    data: detailData,
    isError,
    error,
  } = useQuery({
    queryKey: ["detail", articleId],
    queryFn: () => getDetail({ articleId: articleId as string }),
    // articleId가 존재할 때만 쿼리를 실행합니다.
    select: (res) => res.data,
    enabled: !!articleId,
  });

  useEffect(() => {
    console.log(detailData);
  }, [detailData]);

  if (isError) {
    // Axios 에러이고 상태 코드가 404인 경우
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#F3E9D2]">
          <h1 className="text-4xl font-bold text-amber-800">🥔</h1>
          <h2 className="text-2xl font-bold text-amber-800">
            404 - 기사를 찾을 수 없어요
          </h2>
          <p className="text-amber-700">
            요청하신 주소의 기사가 존재하지 않습니다.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-amber-500 px-6 py-2 font-semibold text-white shadow-md hover:bg-amber-600"
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      );
    }

    // 그 외 일반적인 에러
    return (
      <div className="flex h-screen items-center justify-center">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #F6D589 0%, rgba(177, 124, 49, 0.95) 100%)",
      }}
      className="relative flex min-h-screen w-screen flex-col gap-8 py-4"
    >
      <button
        onClick={() => navigate(-1)}
        className={`fixed top-4 left-4 flex w-fit items-center gap-1 rounded-xl font-semibold text-amber-800 transition-all duration-200 hover:scale-110`}
      >
        <ArrowLeft />
        뒤로 가기
      </button>
      <PotatoFarmNewsArticle articleData={articleData as Article} />
      <PotatoQuizComponent
        questions={
          detailData?.quizList || [
            {
              id: 1,
              question:
                "정부는 모든 의대생의 유급 및 제적 여부를 ‘유급은 학칙대로, 제적은 전원 유예’로 통일하여 결정했다.",
            },
            {
              id: 2,
              question:
                "정부는 2027년 2월 또는 8월 졸업을 선택한 본과 3학년 학생들을 위해 의사 국가시험을 추가로 실시할 계획이다.",
            },
          ]
        }
      />
    </div>
  );
};
