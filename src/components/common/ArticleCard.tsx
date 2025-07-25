import { path } from "@/routes/path";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ArticleCardProps {
  id: number;
  imageUrl?: string;
  title: string;
  description: string;
  source: string;
  date: string;
}

export const ArticleCard = ({
  id,
  imageUrl,
  title,
  description,
  source,
  date,
}: ArticleCardProps) => {
  const navigate = useNavigate();
  return (
    // 1. <article>을 <motion.article>로 변경하고 애니메이션 props를 추가합니다.
    <motion.article
      className="flex w-full max-w-4xl cursor-pointer items-center gap-6 rounded-[.625rem] border-2 border-[#fbd44c] bg-[#FEFBF3] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }} // 초기 상태: 투명하고 20px 아래에 위치
      animate={{ opacity: 1, y: 0 }} // 최종 상태: 불투명하고 제자리에 위치
      transition={{ duration: 0.5, ease: "easeOut" }} // 애니메이션 지속 시간 및 효과
      whileHover={{ scale: 1.03 }} // 호버 시 3% 커짐
      onClick={() => navigate("/" + path.deatil(id))}
    >
      <div className="flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-32 w-40 rounded-lg object-cover" // object-center 대신 object-cover 추천
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-200">
            <ImageIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </div>

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
    </motion.article>
  );
};
