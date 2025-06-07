"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Clock, Star, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "../hooks/use-media-querry"

interface FeaturedArticle {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  category: string
  readTime: string
  author: string
  date: string
  featured?: boolean
}

const featuredArticles: FeaturedArticle[] = [
  {
    id: "1",
    title: "The Art of Storytelling in Modern Literature",
    excerpt:
      "Explore how contemporary authors are reshaping narrative techniques and pushing the boundaries of traditional storytelling.",
    imageUrl: "https://picsum.photos/1200/600?random=1001",
    category: "Literature",
    readTime: "8 min read",
    author: "Eleanor Blackwood",
    date: "June 4, 2024",
    featured: true,
  },
  {
    id: "2",
    title: "Architectural Wonders of the Ancient World",
    excerpt:
      "Discover the engineering marvels and artistic brilliance behind structures that have stood the test of time.",
    imageUrl: "https://picsum.photos/1200/600?random=1002",
    category: "History",
    readTime: "12 min read",
    author: "Marcus Aurelius",
    date: "May 28, 2024",
  },
  {
    id: "3",
    title: "The Philosophy of Time: Past, Present, and Future",
    excerpt:
      "A deep dive into how philosophers throughout history have conceptualized time and its passage through human experience.",
    imageUrl: "https://picsum.photos/1200/600?random=1003",
    category: "Philosophy",
    readTime: "10 min read",
    author: "Sophia Chen",
    date: "May 15, 2024",
    featured: true,
  },
  {
    id: "4",
    title: "Classical Music in the Digital Age",
    excerpt:
      "How orchestras and composers are adapting centuries-old traditions to reach new audiences in the streaming era.",
    imageUrl: "https://picsum.photos/1200/600?random=1004",
    category: "Music",
    readTime: "7 min read",
    author: "Johannes Weber",
    date: "June 1, 2024",
  },
  {
    id: "5",
    title: "The Lost Art of Letter Writing",
    excerpt:
      "In an age of instant messaging, discover why handwritten correspondence still holds profound emotional and historical value.",
    imageUrl: "https://picsum.photos/1200/600?random=1005",
    category: "Culture",
    readTime: "9 min read",
    author: "Victoria Harrington",
    date: "May 22, 2024",
  },
  {
    id: "6",
    title: "Renaissance Painting Techniques Revealed",
    excerpt:
      "New research uncovers the secrets behind the masterpieces of Leonardo, Michelangelo, and their contemporaries.",
    imageUrl: "https://picsum.photos/1200/600?random=1006",
    category: "Art",
    readTime: "11 min read",
    author: "Rafael Donato",
    date: "June 7, 2024",
    featured: true,
  },
  {
    id: "7",
    title: "The Science of Crafting Perfect Tea",
    excerpt:
      "From water temperature to steeping time, explore the precise methodology behind brewing the world's most consumed beverage.",
    imageUrl: "https://picsum.photos/1200/600?random=1007",
    category: "Gastronomy",
    readTime: "6 min read",
    author: "Mei Lin",
    date: "May 19, 2024",
  },
]

export const FeaturedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const totalSlides = featuredArticles.length

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    if (!isAutoPlaying || isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused, nextSlide])

  const currentArticle = featuredArticles[currentSlide]

  // Calculate visible slides for the preview
  const getVisibleSlides = () => {
    const result = []
    // On mobile, show fewer slides
    const range = isMobile ? 1 : isTablet ? 2 : 2

    for (let i = -range; i <= range; i++) {
      const index = (currentSlide + i + totalSlides) % totalSlides
      result.push({
        index,
        position: i,
        article: featuredArticles[index],
      })
    }
    return result
  }

  const visibleSlides = getVisibleSlides()

  return (
    <div className="relative w-full">
      {/* Elegant Header with Blue Theme */}
      <div className="text-center mb-8 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 relative px-4">
            Discover Amazing Stories
          </h2>
          <div className="relative">
            <div className="w-[150px] sm:w-[200px] md:w-[300px] h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 mx-auto rounded-full"></div>
            <div className="w-[100px] sm:w-[150px] md:w-[200px] h-1 bg-gradient-to-r from-blue-400 to-blue-300 mx-auto mt-1 rounded-full opacity-60"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-2 md:px-4">
            Discover our handpicked collection of exceptional articles and explore our curated collection of articles,
            insights, and stories from talented writers around the world.
          </p>
        </motion.div>
      </div>

      {/* Main Carousel Container with Enhanced Design */}
      <motion.div
        className="relative w-full h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-2xl border border-blue-100"
        onMouseEnter={() => {
          setIsPaused(true)
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsPaused(false)
          setIsHovered(false)
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-30 blur-lg"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 blur-md"></div>
        </div>

        {/* Main Slide */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Enhanced Image Section */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                <motion.img
                  src={currentArticle.imageUrl || "/placeholder.svg"}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Enhanced Category Badge */}
                <motion.div
                  className="absolute top-4 sm:top-8 left-4 sm:left-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-lg shadow-lg backdrop-blur-sm">
                      {currentArticle.category}
                    </span>
                    {currentArticle.featured && (
                      <div className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 bg-yellow-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="hidden sm:inline">Featured</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Floating Author Info - Mobile Only */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 md:hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{currentArticle.author}</p>
                        <p className="text-xs text-gray-600">{currentArticle.date}</p>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">{currentArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Content Section */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white relative p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                {/* Decorative Corner Element */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full"></div>

                <motion.div
                  key={`content-${currentSlide}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-xl relative z-10"
                >
                  {/* Article Number */}
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100 leading-none">
                      {String(currentSlide + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-medium text-blue-600 uppercase tracking-wide">
                        Article
                      </span>
                      <span className="text-xs text-gray-500">of the week</span>
                    </div>
                  </div>

                  <motion.h1
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-6 leading-tight line-clamp-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentArticle.title}
                  </motion.h1>

                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {currentArticle.excerpt}
                  </motion.p>

                  {/* Author Info - Desktop Only */}
                  <motion.div
                    className="hidden md:block mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{currentArticle.author}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{currentArticle.date}</span>
                          <span>•</span>
                          <span>{currentArticle.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <button className="group relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">
                        Read Full Article
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Enhanced Navigation Controls */}
      <div className="flex justify-center gap-4 sm:gap-10 items-center mt-6 sm:mt-12">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Circular Previous Button with Enhanced Animations */}
          <motion.button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="group relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 scale-0 group-hover:scale-150 bg-blue-400 rounded-full opacity-30 transition-all duration-700"></div>

            {/* Border Animation */}
            <div className="absolute inset-0 border-2 border-blue-300 rounded-full group-hover:border-blue-600 transition-colors duration-300"></div>

            {/* Icon */}
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 group-hover:text-white relative z-10 transition-colors duration-300" />
          </motion.button>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="flex gap-2 sm:gap-3">
          {featuredArticles.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1)
                setCurrentSlide(index)
              }}
              className={`relative h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 sm:w-12 bg-blue-600" : "w-4 sm:w-8 bg-gray-300 hover:bg-blue-400"
              }`}
              whileHover={{ scale: 1.1 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-blue-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Circular Next Button with Enhanced Animations */}
        <motion.button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="group relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 scale-0 group-hover:scale-150 bg-blue-400 rounded-full opacity-30 transition-all duration-700"></div>

          {/* Border Animation */}
          <div className="absolute inset-0 border-2 border-blue-300 rounded-full group-hover:border-blue-600 transition-colors duration-300"></div>

          {/* Icon */}
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 group-hover:text-white relative z-10 transition-colors duration-300" />
        </motion.button>
      </div>

      {/* Enhanced Preview Thumbnails - Hide on small mobile */}
      <motion.div
        className="mt-6 sm:mt-12 hidden sm:grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {visibleSlides.map(({ index, position, article }) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden cursor-pointer rounded-xl transition-all duration-300 ${
              position === 0
                ? "ring-2 sm:ring-4 ring-blue-500 shadow-xl scale-105"
                : "ring-1 ring-gray-200 opacity-70 hover:opacity-100 hover:ring-blue-300 hover:scale-102"
            }`}
            onClick={() => {
              setDirection(position > 0 ? 1 : -1)
              setCurrentSlide(index)
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="aspect-w-16 aspect-h-9 h-16 sm:h-20 md:h-24">
              <img
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2 sm:p-3">
                <div className="w-full">
                  <span className="text-[10px] sm:text-xs text-white font-medium line-clamp-1 sm:line-clamp-2 leading-tight">
                    {article.title}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                    <span className="text-[8px] sm:text-xs text-blue-200">{article.category}</span>
                    {article.featured && <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current" />}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
