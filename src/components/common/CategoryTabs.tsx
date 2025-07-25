import { useState } from "react";
import { motion } from "framer-motion";

// types/category.ts
export type CategoryId = "society" | "life" | "economic" | "politics" | "it";

export interface Category {
  id: CategoryId;
  name: string;
}

// 기본 카테고리 데이터
const DEFAULT_CATEGORIES: Category[] = [
  { id: "society", name: "사회" },
  { id: "economic", name: "경제" },
  { id: "politics", name: "정치" },
  { id: "it", name: "IT" },
  { id: "life", name: "생활/문화" },
];

interface CategoryTabsProps {
  categories?: Category[];
  defaultCategory?: CategoryId;
  onCategoryChange?: (categoryId: CategoryId) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories = DEFAULT_CATEGORIES,
  defaultCategory = "society",
  onCategoryChange,
}) => {
  const [selectedTab, setSelectedTab] = useState<CategoryId>(defaultCategory);

  const handleTabChange = (categoryId: CategoryId) => {
    setSelectedTab(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="flex w-full justify-center p-4">
      <nav className="rounded-[.625rem] border border-[#fbd44c] bg-[#f4e2b4] p-2 shadow-inner">
        <ul className="flex items-center space-x-10">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleTabChange(category.id)}
              className="relative cursor-pointer rounded-full px-5 py-2 text-2xl font-medium transition-colors duration-200 select-none hover:text-[#8b5a2b]"
              style={{
                color: selectedTab === category.id ? "#FFFFFF" : "#b17c31",
              }}
            >
              {selectedTab === category.id && (
                <motion.div
                  layoutId="selected-category-pill"
                  className="absolute inset-0 z-0 rounded-[.625rem] bg-[#D97708] shadow-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryTabs;
