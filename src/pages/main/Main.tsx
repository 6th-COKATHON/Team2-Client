import CategoryTabs from "@/components/common/CategoryTabs";
// 🥔 대시보드 컴포넌트들을 import 합니다. (경로는 실제 파일 위치에 맞게 수정해주세요)
import { PotatoStatusCard } from "@/components/common/PotatoStatusCard";
import { HarvestRateCard } from "@/components/common/HarvestRateCard";
import { PotatoFieldCard } from "@/components/common/PotatoFieldCard";
import { ArticleCard } from "@/components/common/ArticleCard";
import potatoLogo from "@/assets/potatoLogo.svg";
import potatoBG from "@/assets/potatoBG.svg";

export const Main = () => {
  // '나의 감자밭' 컴포넌트에 전달할 임시 데이터
  const mockFieldData = Array.from({ length: 84 }, () =>
    Math.floor(Math.random() * 5),
  );
  const articleData = {
    title: "한신대, 인재양성기금 1억 기부받아",
    description:
      "한신대학교는 최근 경기 오산시에 있는 경기캠퍼스에서 강남대청교회 김동범 장로와 장필순 권사가 ‘한신인재양성기금’으로 1억 원 기부를 약정했다고 25일 밝혔다.",
    source: "YTN",
    date: "2025.07.25",
  };

  return (
    <div
      className="relative flex min-h-screen flex-1 flex-col bg-cover bg-center p-8" // 전체적인 패딩 추가
      style={{
        backgroundImage: `url(${potatoBG})`,
      }}
    >
      <img src={potatoLogo} className="absolute top-4 left-4 h-24 w-24" />
      <CategoryTabs />

      <div className="mt-8 flex flex-grow gap-8">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <PotatoStatusCard count={12} />
          <HarvestRateCard rate={25} />
          <PotatoFieldCard data={mockFieldData} />
        </div>
        <div className="flex w-full flex-col gap-6">
          <ArticleCard
            imageUrl={potatoLogo}
            title={articleData.title}
            description={articleData.description}
            source={articleData.source}
            date={articleData.date}
          />
          <ArticleCard
            imageUrl={potatoLogo}
            title={articleData.title}
            description={articleData.description}
            source={articleData.source}
            date={articleData.date}
          />
        </div>
      </div>
    </div>
  );
};
