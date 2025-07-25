// src/components/SignupForm.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { postSignUp } from "@/apis/auth/postAuth";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSignupSuccess: () => void; // 회원가입 성공 시 호출될 함수
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      try {
        console.log("회원가입 시도 중...", formData);

        // 회원가입 API 호출 (실제 API 함수로 교체)
        const res = await postSignUp({
          email: formData.email,
          password: formData.password,
        });

        // 회원가입 성공 확인
        if (res.status === 201 || res.status === 200) {
          // 성공 Alert 표시
          alert(
            `🎉 회원가입이 완료되었습니다!\n\n농장 가족이 되신 것을 축하드려요 🌾\n이제 로그인해서 농장을 시작해보세요!`,
          );

          // 폼 초기화
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });

          // 로그인 폼으로 전환
          onSignupSuccess();
        } else {
          // 회원가입 실패 처리
          const errorMessage = "회원가입 중 오류가 발생했습니다.";

          if (errorMessage.includes("이메일")) {
            setErrors({ email: errorMessage });
          } else {
            setErrors({ password: errorMessage });
          }
        }
      } catch (error) {
        console.error("회원가입 API 에러:", error);
      } finally {
        setIsLoading(false);
      }
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
        <label className="mb-2 block flex items-center gap-1 text-sm font-medium text-amber-800">
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
            className={`w-full rounded-xl border-2 bg-white/80 px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-orange-300/30 focus:outline-none ${
              errors.email
                ? "border-red-400 focus:border-red-400"
                : "border-amber-300 focus:border-orange-500"
            }`}
            placeholder="your@farm.com"
            disabled={isLoading}
          />
        </motion.div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label className="mb-2 block flex items-center gap-1 text-sm font-medium text-amber-800">
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
            className={`w-full rounded-xl border-2 bg-white/80 px-4 py-3 pr-12 transition-all duration-200 focus:ring-4 focus:ring-orange-300/30 focus:outline-none ${
              errors.password
                ? "border-red-400 focus:border-red-400"
                : "border-amber-300 focus:border-orange-500"
            }`}
            placeholder="8자 이상의 든든한 비밀번호"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-amber-600 transition-colors hover:text-amber-800"
            disabled={isLoading}
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
            <div className="mb-1 flex space-x-1">
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
            <p className="text-xs text-amber-700">
              보안 강도: {strengthTexts[passwordStrength]}
            </p>
          </motion.div>
        )}

        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label className="mb-2 block flex items-center gap-1 text-sm font-medium text-amber-800">
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
            className={`w-full rounded-xl border-2 bg-white/80 px-4 py-3 pr-12 transition-all duration-200 focus:ring-4 focus:ring-orange-300/30 focus:outline-none ${
              errors.confirmPassword
                ? "border-red-400 focus:border-red-400"
                : formData.confirmPassword &&
                    formData.password === formData.confirmPassword
                  ? "border-green-500 focus:border-green-500"
                  : "border-amber-300 focus:border-orange-500"
            }`}
            placeholder="비밀번호를 다시 한 번"
            disabled={isLoading}
          />
          <div className="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center space-x-2">
            {formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <CheckIcon className="h-5 w-5 text-green-600" />
              )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-amber-600 transition-colors hover:text-amber-800"
              disabled={isLoading}
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
            className="mt-1 text-sm text-red-600"
          >
            {errors.confirmPassword}
          </motion.p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <motion.button
        type="submit"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-lg transition-all duration-200 ${
          isLoading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-xl"
        }`}
      >
        <span>🌱</span>
        {isLoading ? "농장 가족 등록 중..." : "농장 가족 되기"}
        <span>🏡</span>
      </motion.button>
    </motion.form>
  );
};
