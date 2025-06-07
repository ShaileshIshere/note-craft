"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface Quote {
  text: string
  author: string
  category: string
}

const quotes: Quote[] = [
  {
    text: "The scariest moment is always just before you start.",
    author: "Stephen King",
    category: "Writing",
  },
  {
    text: "You can always edit a bad page. You can't edit a blank page.",
    author: "Jodi Picoult",
    category: "Creativity",
  },
  {
    text: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
    author: "Toni Morrison",
    category: "Inspiration",
  },
  {
    text: "Start writing, no matter what. The water does not flow until the faucet is turned on.",
    author: "Louis L'Amour",
    category: "Motivation",
  },
  {
    text: "You don't start out writing good stuff. You start out writing crap and thinking it's good stuff, and then gradually you get better at it.",
    author: "Octavia E. Butler",
    category: "Growth",
  },
  {
    text: "The first draft of anything is shit.",
    author: "Ernest Hemingway",
    category: "Process",
  },
  {
    text: "Writing is thinking on paper.",
    author: "William Zinsser",
    category: "Philosophy",
  },
]

export const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % quotes.length
        setCurrentQuote(quotes[nextIndex])
        return nextIndex
      })
    }, 8000) // Increased interval for better readability

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-8 sm:p-12 overflow-hidden relative">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient overlays */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"
          animate={{
            background: [
              "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 50%)",
              "radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent 60%)",
              "radial-gradient(circle at bottom right, rgba(255,255,255,0.12), transparent 55%)",
              "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Floating orbs with smoother animations */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -70, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/15 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 60, -90, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 10 }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Logo with enhanced animation */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center justify-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-medium text-6xl tracking-tight">
              <span className="text-white font-serif">note</span>
              <span className="text-white font-bold">craft</span>
            </div>
          </motion.div>
          <motion.div
            className="mt-4 h-1 w-32 bg-white/30 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Enhanced Quote Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother feel
            }}
            className="mb-12"
          >
            {/* Quote mark with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <svg
                className="w-16 h-16 text-white/20 mx-auto mb-8"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </motion.div>

            {/* Quote text with staggered animation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-relaxed italic mb-8 px-4">
                "{currentQuote.text}"
              </p>
            </motion.div>

            {/* Author and category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-xl text-white/90 font-semibold">— {currentQuote.author}</p>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="text-sm text-white/80 font-medium uppercase tracking-wider">
                  {currentQuote.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          className="flex justify-center space-x-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {quotes.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
