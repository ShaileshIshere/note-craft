"use client";

import type React from "react";

import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Footer } from "../components/Footer";
import { FeaturedSlider } from "../components/FeaturedSlider";
import { SectionHeader } from "../components/SectionHeader";
import { useBlogs } from "../hooks";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const [searchTerm, setSearchTerm] = useState("");
    const [articlesToShow, setArticlesToShow] = useState(5); // Initial number of articles to show

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Appbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-8">
                    {/* Featured Section Skeleton */}
                    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-2xl animate-pulse mb-8 sm:mb-16" />

                    {/* Blog Cards Skeleton */}
                    <div className="space-y-4 sm:space-y-8">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Get the blogs to display based on current articlesToShow count
    const blogsToDisplay = filteredBlogs.slice(0, articlesToShow);

    // Check if there are more articles to load
    const hasMoreArticles = articlesToShow < filteredBlogs.length;

    // Function to load more articles
    const loadMoreArticles = () => {
        setArticlesToShow((prev) => prev + 2); // Load 2 more articles each time
    };

    // Reset articles count when search term changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setArticlesToShow(5); // Reset to initial count when searching
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />

            {/* Hero Section with Featured Slider */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
                <FeaturedSlider />
            </section>

            {/* Community Blogs Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
                <SectionHeader
                    title="Community Stories"
                    subtitle="Discover authentic stories and insights shared by our vibrant community of writers and creators."
                    showStats={true}
                />

                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles, authors, or topics..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Blog Cards */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-10 sm:py-16">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                            No articles found
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                            Try adjusting your search terms or browse all
                            articles.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className={"divide-y divide-gray-100"}>
                            {blogsToDisplay.map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <BlogCard
                                        id={blog.id}
                                        authorName={blog.author.name || "Anonymous"}
                                        title={blog.title}
                                        content={blog.content}
                                        excerpt={blog.excerpt}
                                        publishedDate={blog.publishedAt}
                                        createdAt={blog.createdAt}
                                        imageUrl={blog.imageUrl}
                                        category={blog.category}
                                        likes={blog.likes}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMoreArticles && (
                            <div className="text-center mt-8 sm:mt-12">
                                <motion.button
                                    onClick={loadMoreArticles}
                                    className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl overflow-hidden"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Load More Articles
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                            +2 more
                                        </span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.button>

                                {/* Articles counter */}
                                <p className="text-sm text-gray-500 mt-3">
                                    Showing {blogsToDisplay.length} of{" "}
                                    {filteredBlogs.length} articles
                                </p>
                            </div>
                        )}

                        {/* All articles loaded message */}
                        {!hasMoreArticles && filteredBlogs.length > 5 && (
                            <div className="text-center mt-8 sm:mt-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    All articles loaded ({filteredBlogs.length}{" "}
                                    total)
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>

            <Footer />
        </div>
    );
};
