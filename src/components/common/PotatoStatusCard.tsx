import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import basket from "@/assets/basket.svg";

export const PotatoStatusCard = ({ count }: { count: number }) => {
  // 1. 애니메이션을 위한 MotionValue 생성 (초기값: 0)
  const motionValue = useMotionValue(0);

  // 2. MotionValue의 값이 변경될 때마다 반올림하여 정수로 변환
  const roundedValue = useTransform(motionValue, (latest) => {
    return Math.round(latest);
  });

  // 3. count prop이 변경될 때마다 애니메이션 실행
  useEffect(() => {
    const controls = animate(motionValue, count, {
      duration: 1,
      ease: "easeInOut",
    });

    // 컴포넌트가 언마운트될 때 애니메이션 정지
    return controls.stop;
  }, [count, motionValue]);

  return (
    <motion.div
      className="flex h-64 w-full flex-col items-center justify-around rounded-[0.625rem] border-2 border-[#fbd44c] bg-[#FEFBF3] p-6 text-[#6D4C41] shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold">오늘의 감자 현황</h2>
      <img
        src={basket}
        className="h-20 w-20 rounded-full border-4 border-[#fbbf24] bg-[#fde68a]"
      />

      <div className="flex items-baseline space-x-2">
        {/* 4. 변환된 roundedValue를 화면에 렌더링 */}
        <motion.span className="text-5xl font-extrabold">
          {roundedValue}
        </motion.span>
        <span className="text-2xl font-semibold">개</span>
      </div>
    </motion.div>
  );
};
