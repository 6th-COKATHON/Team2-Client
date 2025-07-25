import { motion } from "framer-motion";

import potatoIcon from "@/assets/potatoIcon.svg";

export const HarvestRateCard = ({ rate }: { rate: number }) => {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center gap-3 rounded-[0.625rem] border-2 border-[#fbd44c] bg-[#FEFBF3] p-4 text-[#6D4C41] shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold">감자 수확률</h2>
      <div className="flex gap-3">
        <img src={potatoIcon} alt="감자 아이콘" className="h-8 w-8" />
        <span className="text-3xl font-extrabold">{rate}%</span>
      </div>
    </motion.div>
  );
};
