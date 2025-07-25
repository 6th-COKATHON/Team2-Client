import { Image as ImageIcon } from "lucide-react";

// 컴포넌트가 받을 props 타입을 정의합니다.
interface ArticleCardProps {
  imageUrl?: string; // 이미지 URL은 선택 사항
  title: string;
  description: string;
  source: string;
  date: string;
}

export const ArticleCard = ({
  imageUrl,
  title,
  description,
  source,
  date,
}: ArticleCardProps) => {
  return (
    <article className="flex w-full max-w-4xl items-center gap-6 rounded-[.625rem] border-2 border-[#fbd44c] bg-[#FEFBF3] p-6 shadow-md">
      {/* 이미지 섹션: imageUrl이 있으면 img 태그, 없으면 플레이스홀더를 렌더링 */}
      <div className="flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-32 w-40 rounded-lg object-center"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-200">
            <ImageIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* 텍스트 콘텐츠 섹션 */}
      <div className="flex flex-col justify-center gap-4">
        <h3 className="text-2xl font-bold text-[#78350f]">{title}</h3>
        <p className="line-clamp-2 text-lg leading-relaxed text-[#92400d]">
          {description}
        </p>
        <div className="mt-2 flex items-center space-x-2 text-sm text-[#d97708]">
          <span>{source}</span>
          <span>|</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};
