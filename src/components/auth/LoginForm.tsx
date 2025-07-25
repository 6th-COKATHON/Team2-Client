// src/components/LoginForm.tsx
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { createPortal } from "react-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import farmDoor from "@/assets/farmDoor.svg";
import { postLogin } from "@/apis/auth/postAuth";
import { useNavigate } from "react-router-dom";
import { path } from "@/routes/path";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  setIsAnimating: (isAnimating: boolean) => void;
  onAnimationStart: () => void;
}

const ANIMATION_DURATION = 0.7;

export const LoginForm: React.FC<LoginFormProps> = ({
  setIsAnimating,
  onAnimationStart,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLocalAnimating, setIsLocalAnimating] = useState(false);

  const doorAnimation = useAnimation();

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const runFarmDoorAnimation = async () => {
    setIsLocalAnimating(true);
    setIsAnimating(true);

    onAnimationStart();

    try {
      await doorAnimation.start({
        opacity: [0, 1],
        scale: [0.5, 2],
        rotateY: [0, 0],
        rotateX: [0, 0],
        transition: {
          duration: ANIMATION_DURATION * 0.8,
          ease: "easeOut",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 300));

      await doorAnimation.start({
        opacity: [1, 0],
        scale: [2, 0.1],
        rotateY: [0, 40],
        rotateX: [0, 25],
        transition: {
          duration: ANIMATION_DURATION * 1.5,
          ease: "easeIn",
        },
      });
    } finally {
      setIsLocalAnimating(false);
      setIsAnimating(false);
      doorAnimation.set({
        scale: 0.8,
        opacity: 0,
        rotateY: 0,
        rotateX: 0,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("로그인 데이터:", formData);

      try {
        const res = await postLogin({
          email: formData.email,
          password: formData.password,
        });

        if (res.status === 200) {
          console.log("로그인 성공! 농장으로 이동합니다 🌾");

          await runFarmDoorAnimation();

          navigate(path.main);
        } else {
          setErrors({
            password: "로그인에 실패했습니다. 다시 시도해주세요.",
          });
        }
      } catch (error) {
        console.error("로그인 에러:", error);

        setErrors({
          email: "이메일 또는 비밀번호가 일치하지 않습니다.",
          password: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      }
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <>
      <div className="relative">
        <motion.form
          variants={formVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="relative z-10 space-y-6"
        >
          <div>
            <label className="mb-2 flex items-center gap-1 text-sm font-medium text-amber-800">
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
                disabled={isLocalAnimating}
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

          <div>
            <label className="mb-2 flex items-center gap-1 text-sm font-medium text-amber-800">
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
                placeholder="농장 입장 비밀번호"
                disabled={isLocalAnimating}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-amber-600 transition-colors hover:text-amber-800"
                disabled={isLocalAnimating}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </motion.div>
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

          <motion.button
            type="submit"
            whileHover={!isLocalAnimating ? { scale: 1.02 } : {}}
            whileTap={!isLocalAnimating ? { scale: 0.98 } : {}}
            disabled={isLocalAnimating}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-lg transition-all duration-200 ${
              isLocalAnimating
                ? "cursor-not-allowed bg-gray-400"
                : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 hover:shadow-xl"
            }`}
          >
            <span>🌾</span>
            {isLocalAnimating ? "농장 포탈로 이동 중..." : "농장으로 들어가기"}
            <span>🏡</span>
          </motion.button>
        </motion.form>
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <motion.div
            animate={doorAnimation}
            initial={{
              scale: 0.8,
              opacity: 0,
              rotateY: 0,
              rotateX: 0,
            }}
            className="pointer-events-none fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* 농장 문 + clipPath 효과 */}
            <motion.div
              animate={doorAnimation}
              style={{
                clipPath: "circle(100% at 50% 50%)",
                filter: "blur(0px)",
              }}
              className="relative"
            >
              <motion.img
                src={farmDoor}
                alt="농장 문"
                className="h-auto w-60 drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))",
                }}
              />

              <motion.div
                animate={doorAnimation}
                className="absolute inset-0 rounded-full bg-transparent blur-xl"
                style={{
                  scale: 1.5,
                }}
              />
            </motion.div>
          </motion.div>,
          document.body,
        )}
    </>
  );
};
