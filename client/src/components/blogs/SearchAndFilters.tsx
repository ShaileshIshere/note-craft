import { memo } from "react";
import { Search, Filter, X } from "lucide-react";
import { useBlogsStore } from "../../store/blogsStore";
import { useBlogs } from "../../hooks";

export const SearchAndFilters = memo(() => {
    const { blogs } = useBlogs();
    const searchTerm = useBlogsStore((state) => state.searchTerm);
    const selectedCategory = useBlogsStore((state) => state.selectedCategory);
    const setSearchTerm = useBlogsStore((state) => state.setSearchTerm);
    const setSelectedCategory = useBlogsStore(
        (state) => state.setSelectedCategory,
    );
    const clearFilters = useBlogsStore((state) => state.clearFilters);

    // Get unique categories from blogs - memoized via the component memoization
    const categories = Array.from(
        new Set(blogs.map((blog) => blog.category).filter(Boolean)),
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
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
                    onClick={() => setSelectedCategory("")}
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
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 capitalize ${
                            selectedCategory.toLowerCase() ===
                            category?.toLowerCase()
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
        </div>
    );
});
