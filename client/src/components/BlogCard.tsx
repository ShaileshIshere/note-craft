"use client";

import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { motion } from "framer-motion";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    imageUrl?: string;
}

export const BlogCard = ({
    id,
    authorName,
    publishedDate,
    title,
    content,
    imageUrl,
}: BlogCardProps) => {
    // Generate a consistent random profile image based on author name
    const getProfileImageUrl = (name: string) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash + name.charCodeAt(i)) & 0xffffffff;
        }
        const seed = Math.abs(hash) % 1000;
        return `https://picsum.photos/150/150?random=${seed}`;
    };

    // Function to get blog image - CONSISTENT with FullBlog
    const getBlogImageUrl = () => {
        if (imageUrl) {
            return imageUrl;
        }
        return `https://picsum.photos/400/300?random=${id}`;
    };

    return (
        <div className="w-full flex justify-center px-2 sm:px-6 py-4 sm:py-8">
            <Link to={`/blog/${id}`} className="w-full max-w-5xl">
                <motion.article
                    className="group relative cursor-pointer transition-all duration-300 ease-out"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Main Content Container */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-6 sm:py-8 border-b border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                        {/* Left Content Section */}
                        <div className="flex-1 space-y-3 sm:space-y-4 order-2 md:order-1">
                            {/* Author Info */}
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                                <Avatar
                                    size="small"
                                    name={authorName}
                                    imageUrl={getProfileImageUrl(authorName)}
                                />
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                                    <span className="font-medium text-gray-900 capitalize group-hover:text-blue-600 transition-colors duration-300">
                                        {authorName}
                                    </span>
                                    <Circle />
                                    <span className="text-gray-500 capitalize">
                                        {publishedDate}
                                    </span>
                                    <Circle />
                                    <span className="text-gray-500">{`${Math.ceil(content.length / 100)} min read`}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <motion.h2
                                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 mb-2 sm:mb-3"
                                initial={{ opacity: 0.9 }}
                                whileHover={{ opacity: 1 }}
                            >
                                {title}
                            </motion.h2>

                            {/* Excerpt */}
                            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 group-hover:text-gray-700 transition-colors duration-300 mb-0">
                                {content.slice(0, 200)}...
                            </p>
                        </div>

                        {/* Right Image Section */}
                        <div className="flex-shrink-0 w-full md:w-auto order-1 md:order-2">
                            <motion.div
                                className="relative w-full md:w-64 h-40 sm:h-48 bg-gray-100 rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <img
                                    src={
                                        getBlogImageUrl() || "/placeholder.svg"
                                    }
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://picsum.photos/400/300?random=${id}`;
                                    }}
                                />

                                {/* Subtle overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />

                                {/* Gradient border effect */}
                                <div className="absolute inset-0 rounded-lg ring-1 ring-black/5 group-hover:ring-blue-500/20 transition-all duration-300" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Hover accent line */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
                </motion.article>
            </Link>
        </div>
    );
};

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-gray-400 hidden sm:block"></div>
    );
}
