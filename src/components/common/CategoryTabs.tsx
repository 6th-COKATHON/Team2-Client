import { useState } from "react";
import { motion } from "framer-motion";

const TABS = ["사회", "경제", "정치", "IT", "생활/문화"];

export const CategoryTabs = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className="flex w-full justify-center p-4">
      <nav className="rounded-[.625rem] border border-[#fbd44c] bg-[#f4e2b4] p-2 shadow-inner">
        <ul className="flex items-center space-x-10">
          {TABS.map((tab) => (
            <li
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className="relative cursor-pointer rounded-full px-5 py-2 text-2xl font-medium"
              style={{
                color: selectedTab === tab ? "#FFFFFF" : "#b17c31",
              }}
            >
              {selectedTab === tab && (
                <motion.div
                  layoutId="selected-category-pill"
                  className="absolute inset-0 z-0 rounded-[.625rem] bg-[#D97708]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryTabs;
