"use client";

import type { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();
    const [likes, setLikes] = useState(blog.likes || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [hasLiked, setHasLiked] = useState(false); // Track if user has liked

    // Function to get blog image - CONSISTENT with BlogCard
    const getBlogImageUrl = () => {
        if (blog.imageUrl) {
            return blog.imageUrl;
        }
        return `https://picsum.photos/1200/600?random=${blog.id}`;
    };

    // Estimate reading time (assuming 200 words per minute)
    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
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

    // Get category color
    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'Technology': 'bg-blue-100 text-blue-800',
            'Business': 'bg-green-100 text-green-800',
            'Health': 'bg-red-100 text-red-800',
            'Lifestyle': 'bg-purple-100 text-purple-800',
            'Education': 'bg-yellow-100 text-yellow-800',
            'Entertainment': 'bg-pink-100 text-pink-800',
            'General': 'bg-gray-100 text-gray-800',
        };
        return colors[category] || colors['General'];
    };

    // Updated handleLike function with toggle functionality
    const handleLike = async () => {
        if (isLiking) return; // Prevent double clicks

        setIsLiking(true);
        
        // Determine the action based on current state
        const action = hasLiked ? 'unlike' : 'like';
        
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/${blog.id}/like`,
                { action }, // Send the action to backend
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                // Update the like count with the response from server
                setLikes(response.data.likes);
                
                // Toggle the liked state
                setHasLiked(!hasLiked);
                
                // Show appropriate message
                if (!hasLiked) {
                    toast.success("Post liked! ❤️");
                } else {
                    toast.success("Like removed");
                }
            }
        } catch (error: any) {
            console.error("Error toggling like:", error);
            if (error.response?.status === 401) {
                toast.error("Please log in to like posts");
            } else {
                toast.error("Failed to update like");
            }
        } finally {
            setIsLiking(false);
        }
    };

    const handleBackToBlogs = () => {
        navigate("/blogs");
    };

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
                    <span className="text-sm sm:text-base font-medium">
                        Back to articles
                    </span>
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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColor(blog.category)}`}>
                            {blog.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
                        {blog.title}
                    </h1>

                    {/* Author and Meta Information */}
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6 sm:mb-8">
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* <Avatar
                                imageUrl="userAvatar.jpg"
                                size="big"
                                name={blog.author.name || "Anonymous"}
                            /> */}
                            <div className="flex flex-col">
                                <span className="text-base sm:text-lg font-semibold text-gray-900">
                                    {blog.author.name || "Anonymous"}
                                </span>
                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-1">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <time>{formatDate(blog.publishedAt || blog.createdAt)}</time>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>
                                            {estimateReadingTime(blog.content)} min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Updated Like Button with better toggle animation */}
                        <motion.button
                            onClick={handleLike}
                            disabled={isLiking}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                                hasLiked
                                    ? 'bg-red-50 border-red-200 text-red-600'
                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                            } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                            whileHover={!isLiking ? { scale: 1.05 } : {}}
                            whileTap={!isLiking ? { scale: 0.95 } : {}}
                        >
                            <motion.div
                                animate={
                                    isLiking 
                                        ? { scale: [1, 1.2, 1] } 
                                        : hasLiked 
                                            ? { scale: [1, 1.3, 1] } 
                                            : { scale: 1 }
                                }
                                transition={{ duration: 0.3 }}
                            >
                                <Heart 
                                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                        hasLiked ? 'fill-red-500 text-red-500' : 'fill-none'
                                    }`} 
                                />
                            </motion.div>
                            <span className="text-sm sm:text-base font-medium">
                                {isLiking ? '...' : likes}
                            </span>
                        </motion.button>
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
                                e.currentTarget.style.display = "none";
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
                            {blog.content
                                .split("\n")
                                .map((paragraph, index) => {
                                    if (!paragraph.trim()) return null;

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
                                    );
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
                                    {blog.excerpt || "This article explores modern approaches to component architecture and design patterns that can significantly improve your development workflow and code maintainability."}
                                </p>
                            </div>
                        </section>

                        {/* Implementation Details Section */}
                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                                Implementation Details
                            </h2>
                            <div className="space-y-4 sm:space-y-6">
                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                    The implementation of these concepts requires careful consideration of your project's specific needs and constraints. Here are some practical approaches you can take to get started.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                            Best Practices
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            Follow established patterns and conventions to ensure consistency across your codebase.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                            Performance
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            Optimize for both development experience and runtime performance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.article>

                {/* Floating Like Button (Mobile) */}
                {/* <motion.div
                    className="fixed bottom-6 right-6 sm:hidden z-50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}
                >
                    <motion.button
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`w-14 h-14 rounded-full shadow-lg border-2 flex items-center justify-center transition-all duration-300 ${
                            hasLiked
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200'
                        } ${isLiking ? 'opacity-50' : ''}`}
                        whileHover={!isLiking ? { scale: 1.1 } : {}}
                        whileTap={!isLiking ? { scale: 0.9 } : {}}
                    >
                        <motion.div
                            animate={
                                isLiking 
                                    ? { rotate: [0, 360] } 
                                    : {}
                            }
                            transition={{ duration: 0.5 }}
                        >
                            <Heart className={`w-6 h-6 transition-all duration-300 ${
                                hasLiked ? 'fill-white' : 'fill-none'
                            }`} />
                        </motion.div>
                    </motion.button>
                </motion.div> */}

                {/* Back to Articles */}
                <div className="mt-12 sm:mt-16 text-center">
                    <motion.button
                        onClick={handleBackToBlogs}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-sm sm:text-base">
                            Explore More Articles
                        </span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};
