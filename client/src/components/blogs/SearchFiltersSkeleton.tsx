import { memo } from "react";

export const SearchFiltersSkeleton = memo(() => {
    return (
        <div className="mb-6 sm:mb-8 md:mb-12">
            {/* Search Bar Skeleton */}
            <div className="relative mb-4 sm:mb-6 max-w-xs sm:max-w-sm md:max-w-xl mx-auto">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-full h-10 sm:h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            {/* Category label and filter icon */}
            <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="h-4 sm:h-5 w-4 sm:w-5 bg-gray-200 rounded mr-1 sm:mr-2 animate-pulse"></div>
                <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Category Pills Skeleton - Scroll on mobile */}
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 items-center overflow-x-auto pb-2 px-4 sm:px-0">
                {/* "All" button - active */}
                <div className="h-8 sm:h-9 w-14 sm:w-16 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>

                {/* Category buttons */}
                {[
                    "Health",
                    "Entertainment",
                    "Food",
                    "Sports",
                    "Travel",
                    "Education",
                    "Lifestyle",
                    "Business",
                    "Technology",
                    "General",
                ].map((_, i) => (
                    <div
                        key={i}
                        className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-200 rounded-full animate-pulse flex-shrink-0"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    ></div>
                ))}
            </div>
        </div>
    );
});
