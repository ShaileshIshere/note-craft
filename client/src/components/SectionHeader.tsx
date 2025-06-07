"use client"

import { TrendingUp, Users, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  showStats?: boolean
}

export const SectionHeader = ({ title, subtitle, showStats = false }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{title}</h2>
      {subtitle && <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">{subtitle}</p>}

      {showStats && (
        <motion.div
          className="flex justify-center gap-4 sm:gap-8 md:gap-12 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mb-2 mx-auto">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">150+</div>
            <div className="text-xs sm:text-sm text-gray-600">Articles</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full mb-2 mx-auto">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">10K+</div>
            <div className="text-xs sm:text-sm text-gray-600">Readers</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full mb-2 mx-auto">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">25+</div>
            <div className="text-xs sm:text-sm text-gray-600">Categories</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
