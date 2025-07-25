import CategoryTabs from "@/components/common/CategoryTabs";
import { PotatoStatusCard } from "@/components/common/PotatoStatusCard";
import { HarvestRateCard } from "@/components/common/HarvestRateCard";
import { PotatoFieldCard } from "@/components/common/PotatoFieldCard";
import { ArticleCard } from "@/components/common/ArticleCard";
import potatoLogo from "@/assets/potatoLogo.svg";
import testBG from "@/assets/debugBG.svg";
import { getArticle } from "@/apis/main/getArticle";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import type { CategoryId } from "@/components/common/CategoryTabs";

// API에서 받아오는 기사 데이터 타입 정의
interface Article {
  id: number;
  articleId: string;
  categoryId: string; // API에서 "economy"로 올 수 있음
  imageUrl: string;
  title?: string;
  description?: string;
  source?: string;
  date?: string;
}

export const Main = () => {
  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>("society");

  const mockFieldData = [
    0, 1, 1, 2, 4, 0, 3, 2, 1, 4, 0, 1, 4, 4, 4, 0, 0, 1, 1, 2, 3, 1, 1, 3, 4,
    4, 1, 0, 3, 1,
  ];

  // API에서 기사 데이터 가져오기
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticle,
    select: (res) => res.data,
  });

  // 카테고리 매핑 (API의 categoryId를 우리 CategoryId에 맞춤)
  const categoryMapping: Record<string, CategoryId> = {
    society: "society",
    economy: "economic", // API에서 "economy"로 오면 "economic"으로 매핑
    economic: "economic",
    politics: "politics",
    it: "it",
    life: "life",
  };

  // 선택된 카테고리에 맞는 기사들 필터링
  const filteredArticles = useMemo(() => {
    if (!articles) return [];

    return articles.filter((article: Article) => {
      const mappedCategory = categoryMapping[article.categoryId];
      return mappedCategory === selectedCategory;
    });
  }, [articles, selectedCategory]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className="relative flex min-h-screen flex-1 flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${testBG})` }}
      >
        <div className="text-center">
          <div className="mb-4 text-6xl">🥔</div>
          <p className="text-2xl font-bold text-amber-800">
            감자를 수확하는 중...
          </p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div
        className="relative flex min-h-screen flex-1 flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${testBG})` }}
      >
        <div className="text-center">
          <div className="mb-4 text-6xl">😞</div>
          <p className="text-2xl font-bold text-red-600">
            감자밭에 문제가 생겼어요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-1 flex-col bg-cover bg-center p-8"
      style={{
        backgroundImage: `url(${testBG})`,
      }}
    >
      <img src={potatoLogo} className="absolute top-4 left-4 h-24 w-24" />

      {/* 카테고리 탭에 이벤트 핸들러 연결 */}
      <CategoryTabs
        defaultCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="mt-8 flex flex-grow gap-8">
        {/* 왼쪽 사이드바 */}
        <div className="flex w-full max-w-sm flex-col gap-6">
          <PotatoStatusCard count={1} />
          <HarvestRateCard rate={25} />
          <PotatoFieldCard data={mockFieldData} />
        </div>

        {/* 오른쪽 기사 영역 */}
        <div className="flex w-full flex-col gap-6">
          {/* 필터링된 기사들 렌더링 */}
          {filteredArticles.length > 0 ? (
            <div className="flex w-full flex-col gap-6">
              {filteredArticles.map((article: Article) => (
                <ArticleCard
                  id={article.id}
                  key={`${article.id}-${article.articleId}`}
                  imageUrl={article.imageUrl || potatoLogo}
                  title={article.title || `기사 ${article.articleId}`}
                  description={
                    article.description || "기사 내용을 불러오는 중..."
                  }
                  source={article.source || "감자밭 뉴스"}
                  date={article.date || "2025.07.26"}
                />
              ))}
            </div>
          ) : (
            // 해당 카테고리에 기사가 없을 때
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-amber-200 bg-white/50 py-20">
              <div className="mb-4 text-6xl">🌾</div>
              <h3 className="mb-2 text-xl font-bold text-amber-800">
                {getCategoryDisplayName(selectedCategory)} 기사가 없어요
              </h3>
              <p className="text-amber-600">
                아직 수확할 감자가 자라지 않았네요! 조금 기다려주세요 🥔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 카테고리 ID를 한글 이름으로 변환하는 유틸리티 함수
const getCategoryDisplayName = (categoryId: CategoryId): string => {
  const categoryNames: Record<CategoryId, string> = {
    society: "사회",
    economic: "경제",
    politics: "정치",
    it: "IT",
    life: "생활/문화",
  };
  return categoryNames[categoryId];
};
