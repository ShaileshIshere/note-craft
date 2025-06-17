"use client";

import { useState } from "react";
import { useBlogs } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { FeaturedSlider } from "../components/FeaturedSlider";
import { Layout } from "../components/Layout";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(""); // Add category filter
    const [articlesToShow, setArticlesToShow] = useState(5);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50">
                    <Appbar />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-8">
                        {/* Featured Section Skeleton */}
                        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-2xl animate-pulse mb-8 sm:mb-16" />

                        {/* Blog Cards Skeleton */}
                        <div className="space-y-4 sm:space-y-8">
                            {/* Your existing loading skeleton */}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Get unique categories from blogs
    const categories = Array.from(new Set(blogs.map(blog => blog.category).filter(Boolean)));

    // Updated filtering logic - now filters by category primarily
    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = searchTerm === "" || 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesCategory = selectedCategory === "" || 
            blog.category?.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    // Get the blogs to display based on current articlesToShow count
    const blogsToDisplay = filteredBlogs.slice(0, articlesToShow);

    // Check if there are more articles to load
    const hasMoreArticles = articlesToShow < filteredBlogs.length;

    // Function to load more articles
    const loadMoreArticles = () => {
        setArticlesToShow((prev) => prev + 2);
    };

    // Reset articles count when search term changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setArticlesToShow(5);
    };

    // Handle category selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSearchTerm(""); // Clear search when selecting category
        setArticlesToShow(5);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setArticlesToShow(5);
    };

    return (
        <Layout>
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
                    <div className="mb-8 sm:mb-12">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by articles and their category"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
                            />
                        </div>

                        {/* Category Filter Chips */}
                        <div className="ml-3 md:ml-5 flex flex-wrap gap-2 sm:gap-3 items-center">
                            <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Categories:
                            </span>
                            
                            {/* All Categories Button */}
                            <button
                                onClick={() => handleCategoryChange("")}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                                    selectedCategory === ""
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                All
                            </button>

                            {/* Category Buttons */}
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 capitalize ${
                                        selectedCategory.toLowerCase() === category?.toLowerCase()
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}

                            {/* Clear Filters Button */}
                            {(searchTerm || selectedCategory) && (
                                <button
                                    onClick={clearFilters}
                                    className="ml-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors duration-200 flex items-center gap-1"
                                >
                                    <X className="w-3 h-3" />
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Active Filters Display */}
                        {/* {(searchTerm || selectedCategory) && (
                            <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                                <span>Active filters:</span>
                                {searchTerm && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                                        Search: "{searchTerm}"
                                    </span>
                                )}
                                {selectedCategory && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md capitalize">
                                        Category: {selectedCategory}
                                    </span>
                                )}
                            </div>
                        )} */}
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
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                {searchTerm || selectedCategory
                                    ? "Try adjusting your search terms or category filter."
                                    : "No articles available at the moment."}
                            </p>
                            {(searchTerm || selectedCategory) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View All Articles
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Results Count */}
                            {/* <div className="mb-6 text-sm text-gray-600">
                                {filteredBlogs.length === blogs.length ? (
                                    `Showing all ${blogs.length} articles`
                                ) : (
                                    `Found ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? 's' : ''} 
                                    ${selectedCategory ? `in "${selectedCategory}"` : ''}
                                    ${searchTerm ? `matching "${searchTerm}"` : ''}`
                                )}
                            </div> */}

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
                                        transition={{ duration: 0.1 }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Load More Articles
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </motion.button>
                                </div>
                            )}

                            {/* All articles loaded message */}
                            {!hasMoreArticles && filteredBlogs.length > 5 && (
                                <div className="text-center mt-8 sm:mt-12">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        All articles loaded
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </Layout>
    );
};
