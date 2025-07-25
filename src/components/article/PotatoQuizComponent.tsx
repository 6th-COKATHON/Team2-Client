import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence 추가

import potatoChar from "@/assets/potatoChar.svg";
import truePotato from "@/assets/truePotato.svg";
import falsePotato from "@/assets/falsePotato.svg";

// 타입 정의 (기존과 동일)
export interface InitialQuestion {
  id: number;
  question: string;
}
export interface CorrectAnswer {
  id: number;
  correctAnswer: boolean;
}
interface QuizComponentProps {
  questions: InitialQuestion[];
  title?: string;
}

export const PotatoQuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  title = "오늘의 감자 풀기",
}) => {
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{
    [key: number]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 1. 결과 애니메이션을 제어할 상태 추가
  const [showResultAnimation, setShowResultAnimation] = useState(false);

  // ... handleAnswerSelect 함수 (기존과 동일) ...

  const handleSubmit = async () => {
    setIsLoading(true);
    // ... API 요청 로직 (기존과 동일) ...
    try {
      const response = await axios.post<{ results: CorrectAnswer[] }>(
        "/api/quiz/submit",
        {
          answers: Object.entries(answers).map(([id, answer]) => ({
            questionId: Number(id),
            userAnswer: answer,
          })),
        },
      );

      const answersMap = response.data.results.reduce(
        (acc, cur) => {
          acc[cur.id] = cur.correctAnswer;
          return acc;
        },
        {} as { [key: number]: boolean },
      );

      setCorrectAnswers(answersMap);
      setIsSubmitted(true);
      setShowResults(true); // 이 값이 true로 바뀌면 아래 useEffect가 실행됩니다.
    } catch (error) {
      console.error("정답을 받아오는 데 실패했습니다.", error);
      alert("채점 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimation = () => {
    setShowResultAnimation(true);
    setTimeout(() => {
      setShowResultAnimation(false);
    }, 2500);
  };
  const getScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === correctAnswers[q.id]) {
        correct++;
      }
    });
    return correct;
  };

  // 2. 채점 결과가 나왔을 때 애니메이션을 트리거하는 useEffect
  useEffect(() => {
    if (showResults) {
      setShowResultAnimation(true);
      // 2.5초 후에 애니메이션을 자동으로 사라지게 함
      const timer = setTimeout(() => {
        setShowResultAnimation(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showResults]);

  const resetQuiz = () => {
    setAnswers({});
    setCorrectAnswers({});
    setIsSubmitted(false);
    setShowResults(false);
    setShowResultAnimation(false);
  };

  // ... getOXStyle 함수 (기존과 동일) ...
  const handleAnswerSelect = (questionId: number, answer: boolean) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };
  const getOXStyle = (questionId: number, value: boolean) => {
    const isSelected = answers[questionId] === value;

    if (!showResults) {
      return isSelected
        ? "bg-amber-400 text-white border-amber-500"
        : "bg-amber-50 hover:bg-amber-100 text-[#78350f] border-amber-200";
    }

    const isCorrectOption = correctAnswers[questionId] === value;

    if (isSelected && isCorrectOption)
      return "bg-green-400 text-white border-green-500";
    if (isSelected && !isCorrectOption)
      return "bg-red-400 text-white border-red-500";
    if (isCorrectOption) return "bg-green-200 text-green-800 border-green-300";
    return "bg-amber-50 border-amber-200 text-gray-600";
  };

  return (
    // 3. 애니메이션 오버레이를 위해 relative 속성 추가
    <div className="relative mx-auto flex w-5xl flex-col overflow-hidden rounded-2xl border-8 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-2xl">
      {/* --- 결과 애니메이션 UI --- */}
      <AnimatePresence>
        {showResultAnimation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              key={getScore() === questions.length ? "true" : "false"}
              src={getScore() === questions.length ? truePotato : falsePotato}
              alt="결과 이미지"
              className="h-2/3 w-auto"
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.4 },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 기존 퀴즈 UI --- */}
      {/* 헤더 */}
      <button onClick={handleAnimation} className="h-40 w-40 bg-black">
        123
      </button>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 px-8 py-8">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-4 left-6 h-3 w-16 rounded-full bg-amber-300/60"></div>
          <div className="absolute top-8 right-12 h-2 w-8 rounded-full bg-yellow-400/50"></div>
          <div className="absolute bottom-4 left-20 h-4 w-4 rotate-45 rounded-md bg-amber-400/40"></div>
        </div>

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-start">
            <div className="mr-4 rounded-full bg-amber-200/50 p-4 backdrop-blur-sm">
              <img src={potatoChar} className="h-9 w-9" />
            </div>
            <h1 className="text-3xl font-bold tracking-wide text-amber-900">
              {title}
            </h1>
          </div>

          {showResults && (
            <div className="inline-block rounded-lg bg-amber-200/30 px-6 py-3 backdrop-blur-sm">
              <p className="text-lg font-semibold text-amber-800">
                점수: {getScore()}/{questions.length}점 (
                {Math.round((getScore() / questions.length) * 100)}%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 문제 영역 */}
      <div className="space-y-8 p-8">
        {questions.map((question) => (
          <div
            key={question.id}
            className="rounded-xl border-2 border-amber-100 bg-white/50 p-6"
          >
            <h3 className="mb-8 flex items-center text-xl font-bold text-gray-800">
              <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white">
                {question.id}
              </span>
              {question.question}
            </h3>

            {/* OX 버튼 */}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleAnswerSelect(question.id, true)}
                disabled={isSubmitted}
                className={`w-1/2 rounded-xl border-3 px-16 py-8 text-3xl font-bold transition-all duration-200 ${getOXStyle(question.id, true)} ${
                  isSubmitted
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:scale-105 hover:shadow-lg"
                }`}
              >
                O
              </button>
              <button
                onClick={() => handleAnswerSelect(question.id, false)}
                disabled={isSubmitted}
                className={`w-1/2 rounded-xl border-3 px-16 py-8 text-3xl font-bold transition-all duration-200 ${getOXStyle(question.id, false)} ${
                  isSubmitted
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:scale-105 hover:shadow-lg"
                }`}
              >
                X
              </button>
            </div>
          </div>
        ))}

        {/* 제출 버튼 */}
        {!isSubmitted && (
          <div className="pt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={
                Object.keys(answers).length < questions.length || isLoading
              }
              className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-12 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-amber-500 hover:to-orange-500 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400"
            >
              {isLoading
                ? "채점 중..."
                : Object.keys(answers).length < questions.length
                  ? `${Object.keys(answers).length}/${questions.length} 선택 완료`
                  : "채점하기 🌾"}
            </button>
          </div>
        )}

        {/* 다시 풀기 버튼 */}
        {isSubmitted && (
          <div className="pt-6 text-center">
            <button
              onClick={resetQuiz}
              className="rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 px-12 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-500 hover:to-emerald-500"
            >
              다시 풀기 🚜
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
