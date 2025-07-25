import { PotatoFarmNewsArticle } from "@/components/article/PotatoFarmNewsArticle";
import {
  PotatoQuizComponent,
  type InitialQuestion,
} from "@/components/article/PotatoQuizComponent";
import { mockArticleData } from "@/constants/dummyArticleData";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ArticleDetail = () => {
  const navigate = useNavigate();
  const sampleQuestions: InitialQuestion[] = [
    {
      id: 1,
      question: "React는 Facebook에서 개발한 라이브러리이다.",
    },
    {
      id: 2,
      question: "useState는 클래스 컴포넌트에서만 사용할 수 있다.",
    },
    {
      id: 3,
      question: "Tailwind CSS는 utility-first CSS 프레임워크이다.",
    },
    {
      id: 4,
      question: "JavaScript에서 const로 선언한 변수는 재할당이 가능하다.",
    },
    {
      id: 5,
      question: "TypeScript는 JavaScript의 상위 집합(superset)이다.",
    },
  ];
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
      <PotatoFarmNewsArticle articleData={mockArticleData} />
      <PotatoQuizComponent questions={sampleQuestions} />
    </div>
  );
};
