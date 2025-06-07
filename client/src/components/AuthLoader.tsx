"use client"

import { useRecoilValue } from "recoil"
import { authLoader } from "../hooks/userAtom"
import { motion, AnimatePresence } from "framer-motion"

export const AuthLoader = () => {
  const isLoading = useRecoilValue(authLoader)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 w-full h-screen z-50 overflow-hidden bg-gradient-to-br from-blue-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-md flex flex-col items-center justify-center"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -80, 60, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full filter blur-3xl"
              animate={{
                x: [0, -120, 80, 0],
                y: [0, 100, -70, 0],
                scale: [1, 0.7, 1.3, 1],
              }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
            />
          </div>

          {/* Main loader content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Enhanced NoteCraft Logo Loader */}
            <div className="relative mb-12">
              {/* Outer rotating ring */}
              <motion.div
                className="w-32 h-32 border-4 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="w-full h-full border-t-4 border-r-4 border-white/60 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>

              {/* Inner pulsing circle */}
              <motion.div
                className="absolute inset-4 bg-white/5 rounded-full backdrop-blur-sm border border-white/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* NoteCraft logo in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="font-medium text-3xl tracking-tight"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-white font-serif">note</span>
                  <span className="text-blue-300 font-bold">craft</span>
                </motion.div>
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.375,
                    ease: "easeInOut",
                  }}
                  initial={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: Math.sin((i * Math.PI * 2) / 8) * 60,
                  }}
                />
              ))}
            </div>

            {/* Loading text with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Authenticating
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  ...
                </motion.span>
              </motion.h2>

              {/* Progress dots */}
              <div className="flex justify-center space-x-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-white/60 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <motion.p
                className="text-white/80 text-sm max-w-xs leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Securing your connection and preparing your workspace...
              </motion.p>
            </motion.div>

            {/* Bottom decorative element */}
            <motion.div
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
            </motion.div>
          </motion.div>

          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Alternative Creative Loader Option
export const CreativeAuthLoader = () => {
  const isLoading = useRecoilValue(authLoader)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 w-full h-screen z-50 overflow-hidden bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center"
        >
          {/* Animated writing effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Typewriter animation */}
            <div className="relative mb-8">
              <motion.div
                className="text-6xl font-serif text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-blue-400"
                  style={{ borderRight: "2px solid #60A5FA" }}
                >
                  notecraft
                </motion.span>
              </motion.div>

              {/* Blinking cursor */}
              <motion.div
                className="absolute top-0 right-0 w-0.5 h-16 bg-blue-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            {/* Floating words animation */}
            <div className="relative w-80 h-20 mb-8">
              {["stories", "ideas", "thoughts", "dreams"].map((word, i) => (
                <motion.span
                  key={word}
                  className="absolute text-white/60 text-lg font-light"
                  initial={{ opacity: 0, y: 20, x: Math.random() * 200 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-20, -40, -60],
                    x: Math.random() * 200,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Loading message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-center"
            >
              <p className="text-white/80 text-lg mb-2">Preparing your canvas...</p>
              <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Minimalist Loader Option
export const MinimalistAuthLoader = () => {
  const isLoading = useRecoilValue(authLoader)

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 w-full h-screen z-50 overflow-hidden bg-white flex flex-col items-center justify-center"
        >
          {/* Simple elegant loader */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Minimalist logo */}
            <motion.div
              className="font-medium text-4xl tracking-tight mb-8"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-gray-800 font-serif">note</span>
              <span className="text-blue-600 font-bold">craft</span>
            </motion.div>

            {/* Simple loading bar */}
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            <motion.p
              className="text-gray-600 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Just a moment...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
