import React from "react";

interface ArticleData {
  title: string;
  description: string;
  source: string;
  date: string;
  imageUrl?: string;
}

export const PotatoFarmNewsArticle: React.FC<{ articleData: ArticleData }> = ({
  articleData,
}) => {
  return (
    <article className="mx-auto flex w-5xl flex-col overflow-hidden rounded-3xl border-8 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      {/* 썸네일 이미지 - 최상단 */}
      {articleData.imageUrl && (
        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl md:h-80">
          <img
            src={articleData.imageUrl}
            alt={articleData.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 헤더 - 고급스러운 농장 느낌 */}
      <div className="relative overflow-hidden rounded-b-2xl bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 px-8 py-8">
        {/* 세련된 기하학적 장식 요소들 */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-4 left-6 h-3 w-16 rounded-full bg-amber-300/60"></div>
          <div className="absolute top-8 right-12 h-2 w-8 rounded-full bg-yellow-400/50"></div>
          <div className="absolute bottom-4 left-20 h-4 w-4 rotate-45 rounded-md bg-amber-400/40"></div>
          <div className="absolute right-6 bottom-6 h-6 w-6 rounded-lg bg-amber-300/30"></div>
        </div>

        {/* 메인 헤더 콘텐츠 */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-amber-200/50 p-3 backdrop-blur-sm">
                <span className="text-3xl">🥔</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide text-amber-900">
                  감자밭 뉴스
                </h1>
                <p className="text-sm font-medium text-amber-700/80">
                  Premium Farm News
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-amber-200/30 px-4 py-2 backdrop-blur-sm">
              <div className="text-sm font-semibold text-amber-800">
                {articleData.source} • {articleData.date}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="p-8">
        <h2 className="mb-6 border-l-4 border-amber-500 pl-4 text-3xl leading-tight font-bold text-gray-800">
          {articleData.title}
        </h2>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-4 text-lg leading-relaxed font-medium whitespace-pre-line text-gray-700">
            {articleData.description}
          </div>
        </div>

        {/* 고급스러운 하단 장식 */}
        <div className="mt-10 border-t border-amber-300/50 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 bg-amber-100">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <span className="text-lg font-bold text-amber-800">
                  감자밭 뉴스
                </span>
                <p className="text-xs font-medium text-amber-600">
                  Premium Farm News
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {["🚜", "🌱", "☀️"].map((icon, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200/50 bg-gradient-to-br from-amber-100 to-yellow-100 transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-xl">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
