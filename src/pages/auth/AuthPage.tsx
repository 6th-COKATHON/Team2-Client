// src/components/AuthPage.tsx
import React, { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const blurAnimation = useAnimation();

  const toggleForm = () => setIsLogin(!isLogin);

  const runBlurAnimation = async () => {
    blurAnimation.start({
      opacity: [0, 1],
      backdropFilter: ["blur(0px)", "blur(8px)"],
      transition: {
        duration: 0.42,
        ease: "easeOut",
      },
    });

    setTimeout(async () => {
      await blurAnimation.start({
        opacity: [1, 0],
        backdropFilter: ["blur(8px)", "blur(0px)"],
        transition: {
          duration: 0.28,
          ease: "easeIn",
        },
      });

      blurAnimation.set({ opacity: 0, backdropFilter: "blur(0px)" });
    }, 1750);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      {/* 전체 페이지 블러 오버레이 - z-40으로 조정 (농장문 z-50보다 낮게) */}
      <motion.div
        animate={blurAnimation}
        initial={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/20"
        style={{
          backdropFilter: "blur(0px)",
          pointerEvents: isAnimating ? "auto" : "none",
        }}
      />

      {/* 농장 느낌의 배경 장식 */}
      <div
        className={`absolute inset-0 opacity-5 transition-all duration-300 ${isAnimating ? "blur-sm" : ""}`}
      >
        <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-amber-600"></div>
        <div className="absolute top-32 right-20 h-16 w-16 rounded-full bg-orange-600"></div>
        <div className="absolute bottom-20 left-20 h-24 w-24 rounded-full bg-yellow-600"></div>
        <div className="absolute right-10 bottom-40 h-12 w-12 rounded-full bg-amber-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-full max-w-md transition-all duration-300 ${isAnimating ? "blur-sm" : ""}`}
      >
        {/* 헤더 */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="mb-2 text-3xl font-bold text-amber-900">
            {isLogin ? "🌾 로그인" : "🏡 회원가입"}
          </h1>
          <p className="text-amber-700">
            {isLogin
              ? "우리 농장에 오신 걸 환영해요"
              : "농장 가족이 되어주세요"}
          </p>
        </motion.div>

        {/* 폼 카드 */}
        <motion.div
          layout
          className="relative rounded-3xl border-2 border-amber-200/50 bg-gradient-to-br from-orange-50/90 to-amber-50/90 p-8 shadow-2xl backdrop-blur-sm"
        >
          <div className="absolute top-4 right-4 text-2xl opacity-20">🌻</div>
          <div className="absolute bottom-4 left-4 text-xl opacity-20">🌿</div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm
                key="login"
                setIsAnimating={setIsAnimating}
                onAnimationStart={runBlurAnimation}
              />
            ) : (
              <SignupForm
                key="signup"
                onSignupSuccess={() => setIsLogin(true)}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-amber-700">
              {isLogin
                ? "아직 우리 농장 가족이 아니신가요?"
                : "이미 농장 가족이신가요?"}
            </p>
            <button
              onClick={toggleForm}
              className="mt-1 font-semibold text-orange-700 transition-colors duration-200 hover:text-orange-800 hover:underline"
              disabled={isAnimating}
            >
              {isLogin ? "나만의 농장 만들기 🌱" : "로그인하기 🏠"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
