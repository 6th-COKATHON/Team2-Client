import { getDetail } from "@/apis/detail/getDetail";
import { PotatoFarmNewsArticle } from "@/components/article/PotatoFarmNewsArticle";
import { PotatoQuizComponent } from "@/components/article/PotatoQuizComponent";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockData, type Article } from "@/constants/dummyArticleData";

export const ArticleDetail = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const articleMap = new Map<string, Article>(
    mockData.map((article) => [article.articleId, article]),
  );

  const articleData = articleMap.get(articleId as string);

  const { data: detailData } = useQuery({
    queryKey: ["detail", articleId],
    queryFn: () => getDetail({ articleId: articleId as string }),
    // articleId가 존재할 때만 쿼리를 실행합니다.
    select: (res) => res.data,
    enabled: !!articleId,
  });

  useEffect(() => {
    console.log(detailData);
  }, [detailData]);

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
          detailData?.questions || [
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
