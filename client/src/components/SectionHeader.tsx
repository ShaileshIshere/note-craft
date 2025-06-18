"use client";

import { TrendingUp, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogs } from "../hooks";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    showStats?: boolean;
}

export const SectionHeader = ({
    title,
    subtitle,
    showStats = false,
}: SectionHeaderProps) => {
    const { blogs, loading } = useBlogs();
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersLoading, setUsersLoading] = useState(false);

    // Fetch total users count
    useEffect(() => {
        const fetchTotalUsers = async () => {
            if (!showStats) return;

            setUsersLoading(true);
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/user/count`
                );
                setTotalUsers(response.data.count || 0);
            } catch (error) {
                console.error("Error fetching users count:", error);
                // Fallback to unique authors count if API fails
                setTotalUsers(new Set(blogs.map((blog) => blog.author.name)).size);
            } finally {
                setUsersLoading(false);
            }
        };

        fetchTotalUsers();
    }, [showStats, blogs]);

    // Calculate stats from existing blog data
    const stats = {
        totalPosts: blogs.length,
        totalUsers: totalUsers,
        totalCategories: new Set(
            blogs.map((blog) => blog.category).filter(Boolean)
        ).size,
    };

    // Format numbers for display
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return Math.floor(num / 1000000) + "M+";
        } else if (num >= 1000) {
            return Math.floor(num / 1000) + "K+";
        } else {
            return num + "+";
        }
    };

    return (
        <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                    {subtitle}
                </p>
            )}

            {showStats && (
                <motion.div
                    className="flex justify-center gap-4 sm:gap-8 md:gap-12 mt-6 sm:mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    viewport={{ once: true }}
                >
                    {/* Articles Count */}
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
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                            {loading ? (
                                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            ) : (
                                formatNumber(stats.totalPosts)
                            )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                            Articles
                        </div>
                    </motion.div>

                    {/* Authors/Readers Count */}
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
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                            {loading || usersLoading ? (
                                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            ) : (
                                formatNumber(stats.totalUsers)
                            )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                            Readers
                        </div>
                    </motion.div>

                    {/* Categories Count */}
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
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                            {loading ? (
                                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            ) : (
                                stats.totalCategories + "+"
                            )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                            Categories
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
