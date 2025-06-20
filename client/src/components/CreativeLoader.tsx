"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../store/userStore";

export const CreativeLoader = () => {
    const isLoading = useUserStore((state) => state.authLoader);

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
                        {/* Improved typewriter animation */}
                        <div className="relative mb-8">
                            <motion.div
                                className="text-6xl font-serif text-white mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: 3, // Increased duration for smoother animation
                                        delay: 0.5,
                                        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth progression
                                    }}
                                    className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-blue-400"
                                    style={{ borderRight: "2px solid #60A5FA" }}
                                >
                                    notecraft
                                </motion.span>
                            </motion.div>

                            {/* Blinking cursor */}
                            {/* <motion.div
                className="absolute top-0 right-0 w-0.5 h-16 bg-blue-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              /> */}
                        </div>

                        {/* Floating words animation */}
                        <div className="relative w-80 h-20 mb-8">
                            {["stories", "ideas", "thoughts", "dreams"].map(
                                (word, i) => (
                                    <motion.span
                                        key={word}
                                        className="absolute text-white/60 text-lg font-light"
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            x: Math.random() * 200,
                                        }}
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
                                ),
                            )}
                        </div>

                        {/* Loading message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.5 }}
                            className="text-center"
                        >
                            <p className="text-white/80 text-lg mb-2">
                                Preparing your canvas...
                            </p>
                            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
