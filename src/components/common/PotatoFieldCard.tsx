import { useState } from "react";
import { motion } from "framer-motion";

type PotatoFieldProps = {
  data: number[]; // 최근 30일간의 활동 레벨 데이터
};

// 활동 레벨(0~4)에 따른 색상 맵
const colorMap: { [key: number]: string } = {
  0: "bg-[#f3f4f6]",
  1: "bg-[#f5e697]",
  2: "bg-[#ebc14d]",
  3: "bg-[#de7a36]",
  4: "bg-[#ab4a23]",
};

// 활동 레벨에 따른 퍼센트 범위 맵
const percentageMap: { [key: number]: string } = {
  0: "0개",
  1: "1개",
  2: "2개",
  3: "3개",
  4: "4개 이상",
};

// 인덱스를 기반으로 날짜와 요일을 계산하는 헬퍼 함수
const getDateInfo = (index: number, totalDays: number) => {
  const date = new Date();
  // 마지막 인덱스가 오늘이 되도록 날짜 계산
  date.setDate(date.getDate() - (totalDays - 1 - index));

  const dayOfWeek = new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
  }).format(date);
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return { dayOfWeek, formattedDate };
};

export const PotatoFieldCard = ({ data }: PotatoFieldProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 항상 최근 30개의 데이터만 사용하도록 슬라이싱
  const last30DaysData = data.slice(-30);

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-4 rounded-[0.625rem] border-2 border-[#fbd44c] bg-[#FEFBF3] p-6 text-[#6D4C41] shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold">나의 감자밭</h2>
      <div className="w-full rounded-lg bg-[#ffffff] p-4 shadow-inner">
        <div className="relative grid grid-cols-5 gap-1.5 md:grid-cols-10 lg:grid-cols-10">
          {last30DaysData.map((level, index) => {
            const { dayOfWeek, formattedDate } = getDateInfo(
              index,
              last30DaysData.length,
            );
            return (
              <motion.div
                key={index}
                className={`relative h-5 w-5 cursor-pointer rounded-sm border-[0.5px] border-gray-200 shadow ${
                  colorMap[level] || colorMap[0]
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.01 }}
              >
                {/* 툴팁 UI */}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="tooltip" // 툴팁이 부드럽게 움직이도록 layoutId 추가
                    className="absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded-md bg-gray-800 px-3 py-2 text-xs text-white shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <p className="font-semibold">
                      {formattedDate} ({dayOfWeek})
                    </p>
                    <p>푼 문제: {percentageMap[level]}</p>
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-800" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full items-center justify-center space-x-2 text-sm">
        <span>0개</span>
        {Object.values(colorMap).map((color) => (
          <div key={color} className={`h-3 w-3 rounded-sm ${color}`} />
        ))}
        <span>4개 ▴</span>
      </div>
    </motion.div>
  );
};
