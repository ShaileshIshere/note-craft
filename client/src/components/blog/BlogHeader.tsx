import { memo } from "react";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import {
    formatDate,
    estimateReadingTime,
    getCategoryColor,
} from "../../utils/blogHelpers";
import { BlogLikeButton } from "./BlogLikeButton";

interface BlogHeaderProps {
    title: string;
    category: string;
    authorName: string;
    publishedAt: string;
    createdAt: string;
    content: string;
    blogId: string; // Add this prop
}

export const BlogHeader = memo(
    ({
        title,
        category,
        authorName,
        publishedAt,
        createdAt,
        content,
        blogId, // Add this prop
    }: BlogHeaderProps) => {
        return (
            <motion.header
                className="mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Category Badge */}
                <div className="mb-4 sm:mb-6">
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColor(category)}`}
                    >
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
                    {title}
                </h1>

                {/* Author and Meta Information - WITH LIKE BUTTON */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex flex-col">
                            <span className="text-base sm:text-lg font-semibold text-gray-900">
                                {authorName || "Anonymous"}
                            </span>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-1">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <time>
                                        {formatDate(publishedAt || createdAt)}
                                    </time>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>
                                        {estimateReadingTime(content)} min read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Like button positioned here! */}
                    <div className="ml-auto">
                        <BlogLikeButton blogId={blogId} />
                    </div>
                </div>

                {/* Elegant Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </motion.header>
        );
    },
);
