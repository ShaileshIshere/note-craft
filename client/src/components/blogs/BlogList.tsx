import { memo } from "react";
import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import { useBlogsStore, useFilteredBlogs } from "../../store/blogsStore";
import type { Blog } from "../../hooks";

interface BlogListProps {
    blogs: Blog[];
}

export const BlogList = memo(({ blogs }: BlogListProps) => {
    const filteredBlogs = useFilteredBlogs(blogs);
    const articlesToShow = useBlogsStore((state) => state.articlesToShow);
    const loadMoreArticles = useBlogsStore((state) => state.loadMoreArticles);
    const clearFilters = useBlogsStore((state) => state.clearFilters);

    // Get the blogs to display based on current articlesToShow count
    const blogsToDisplay = filteredBlogs.slice(0, articlesToShow);

    // Check if there are more articles to load
    const hasMoreArticles = articlesToShow < filteredBlogs.length;

    // If no blogs match the filters
    if (filteredBlogs.length === 0) {
        return (
            <div className="text-center py-10 sm:py-16">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    No articles found
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Try adjusting your search terms or category filter.
                </p>
                <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View All Articles
                </button>
            </div>
        );
    }

    return (
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
                        layout // Add layout prop for smooth transitions when items are added/removed
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
    );
});
