"use client";

import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    excerpt?: string;
    publishedDate: string; // This should be publishedAt from backend
    createdAt: string;
    imageUrl?: string;
    category: string;      // New field
    likes: number;         // New field
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    excerpt,
    publishedDate,
    createdAt,
    imageUrl,
    category,
    likes,
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

    // Format date to human readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMilliseconds = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            if (diffInHours === 0) {
                const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
                return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} min ago`;
            }
            return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    // Calculate read time based on content length
    const calculateReadTime = (text: string) => {
        const wordsPerMinute = 200;
        const wordCount = text.split(' ').length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return readTime;
    };

    // Get category color
    const getCategoryColor = (cat: string) => {
        const colors: { [key: string]: string } = {
            'Technology': 'bg-blue-100 text-blue-800',
            'Business': 'bg-green-100 text-green-800',
            'Health': 'bg-red-100 text-red-800',
            'Lifestyle': 'bg-purple-100 text-purple-800',
            'Education': 'bg-yellow-100 text-yellow-800',
            'Entertainment': 'bg-pink-100 text-pink-800',
            'General': 'bg-gray-100 text-gray-800',
        };
        return colors[cat] || colors['General'];
    };

    const displayText = excerpt || content;
    const readTime = calculateReadTime(content);

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
                            {/* Category Badge */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
                                    {category}
                                </span>
                            </div>

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
                                        {formatDate(publishedDate || createdAt)}
                                    </span>
                                    <Circle />
                                    <span className="text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {readTime} min read
                                    </span>
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
                            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 group-hover:text-gray-700 transition-colors duration-300 mb-3">
                                {displayText.slice(0, 200)}...
                            </p>

                            {/* Post Stats */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{likes}</span>
                                </div>
                                {/* <span className="text-xs">
                                    Published {formatDate(publishedDate || createdAt)}
                                </span> */}
                            </div>
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
