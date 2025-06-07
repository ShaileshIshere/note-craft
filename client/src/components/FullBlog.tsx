"use client"

import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  // Function to get blog image - CONSISTENT with BlogCard
  const getBlogImageUrl = () => {
    // If user provided custom image, use it
    if (blog.imageUrl) {
      return blog.imageUrl
    }
    // Otherwise, use same random image as BlogCard (same seed = blog id)
    return `https://picsum.photos/1200/600?random=${blog.id}`
  }

  // Estimate reading time (assuming 200 words per minute)
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const handleBackToBlogs = () => {
    navigate('/blogs');
  }

  return (
    <div className="min-h-screen bg-white">
      <Appbar />

      {/* Back Navigation - Mobile Friendly */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <motion.button
          onClick={handleBackToBlogs}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4 sm:mb-8"
          whileHover={{ x: -4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Back to articles</span>
        </motion.button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        {/* Article Header */}
        <motion.header
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
              Technology
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
            {blog.title}
          </h1>

          {/* Author and Meta Information */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Avatar size="big" name={blog.author.name || "Anonymous"} />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                {blog.author.name || "Anonymous"}
              </span>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <time>Dec 2, 2023</time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{estimateReadingTime(blog.content)} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={getBlogImageUrl() || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
        </motion.div>

        {/* Article Content - Clean and Minimal */}
        <motion.article
          className="max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Main Content */}
          <div className="prose prose-lg prose-gray max-w-none mb-12 sm:mb-16">
            <div className="text-gray-700 leading-relaxed space-y-6 sm:space-y-8">
              {blog.content.split("\n").map((paragraph, index) => {
                if (!paragraph.trim()) return null

                return (
                  <p
                    key={index}
                    className={`leading-8 sm:leading-9 ${
                      index === 0
                        ? "text-xl sm:text-2xl text-gray-800 font-medium first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-1 first-letter:float-left first-letter:leading-none"
                        : "text-lg sm:text-xl"
                    }`}
                  >
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Simple Content Sections */}
          <div className="space-y-8 sm:space-y-12">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  Key Insights
                </h2>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-100">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    This article explores modern approaches to component architecture and design patterns that can
                    significantly improve your development workflow and code maintainability. Understanding these
                    concepts will help you build more scalable and efficient applications.
                  </p>
                </div>
              </section>

              {/* Additional Content Section */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  Implementation Details
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    The implementation of these concepts requires careful consideration of your project's specific needs
                    and constraints. Here are some practical approaches you can take to get started.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Best Practices</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Follow established patterns and conventions to ensure consistency across your codebase.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Performance</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Optimize for both development experience and runtime performance.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        </motion.article>

          {/* Back to Articles */}
          <div className="mt-12 sm:mt-16 text-center">
            <motion.button
              onClick={handleBackToBlogs}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm sm:text-base">Explore More Articles</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </motion.button>
          </div>
      </div>
    </div>
  )
}
