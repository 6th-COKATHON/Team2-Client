// src/components/SignupForm.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon, CheckIcon } from "@heroicons/react/24/outline";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("회원가입 데이터:", formData);
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  // 비밀번호 강도 체크
  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)) return 4;
    return 3;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = [
    "",
    "bg-red-400",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-green-600",
  ];
  const strengthTexts = ["", "새싹 🌱", "꽃봉오리 🌸", "꽃 🌺", "열매 🍎"];

  return (
    <motion.form
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* 이메일 입력 */}
      <div>
        <label className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-1">
          📧 이메일
        </label>
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300/30 bg-white/80 ${
              errors.email
                ? "border-red-400 focus:border-red-400"
                : "border-amber-300 focus:border-orange-500"
            }`}
            placeholder="your@farm.com"
          />
        </motion.div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-1"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-1">
          🔐 비밀번호
        </label>
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300/30 bg-white/80 ${
              errors.password
                ? "border-red-400 focus:border-red-400"
                : "border-amber-300 focus:border-orange-500"
            }`}
            placeholder="비밀번호를 입력해주세요."
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </motion.div>

        {/* 비밀번호 강도 표시 */}
        {formData.password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2"
          >
            <div className="flex space-x-1 mb-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-2 w-1/4 rounded-full transition-all duration-200 ${
                    level <= passwordStrength
                      ? strengthColors[passwordStrength]
                      : "bg-amber-200"
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs text-amber-700`}>
              보안 강도: {strengthTexts[passwordStrength]}
            </p>
          </motion.div>
        )}

        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-1"
          >
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label className="block text-sm font-medium text-amber-800 mb-2 flex items-center gap-1">
          🔒 비밀번호 확인
        </label>
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300/30 bg-white/80 ${
              errors.confirmPassword
                ? "border-red-400 focus:border-red-400"
                : formData.confirmPassword &&
                    formData.password === formData.confirmPassword
                  ? "border-green-500 focus:border-green-500"
                  : "border-amber-300 focus:border-orange-500"
            }`}
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <CheckIcon className="h-5 w-5 text-green-600" />
              )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-amber-600 hover:text-amber-800 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </motion.div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-1"
          >
            {errors.confirmPassword}
          </motion.p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-amber-600 hover:to-orange-700 flex items-center justify-center gap-2"
      >
        <span>🌱</span>
        농장 가족 되기
        <span>🏡</span>
      </motion.button>
    </motion.form>
  );
};
