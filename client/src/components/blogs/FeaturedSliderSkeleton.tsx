import { memo } from "react";

export const FeaturedSliderSkeleton = memo(() => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
            {/* Title and subtitle skeletons */}
            <div className="text-center mb-4 sm:mb-8">
                <div className="h-8 sm:h-10 md:h-12 w-48 sm:w-56 md:w-64 bg-gray-200 rounded-md mx-auto mb-2 sm:mb-4 animate-pulse"></div>
                <div className="h-4 sm:h-6 md:h-8 w-full max-w-xs sm:max-w-lg md:max-w-2xl mx-auto bg-gray-200 rounded-md mb-1 sm:mb-2 animate-pulse"></div>
                <div className="h-4 sm:h-6 md:h-8 w-3/4 max-w-xs sm:max-w-md md:max-w-xl mx-auto bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Featured slider card skeleton */}
            <div className="bg-white w-full rounded-xl sm:rounded-2xl shadow-md overflow-hidden mb-4 sm:mb-6">
                <div className="flex flex-col md:flex-row h-[350px] sm:h-[400px] md:h-[500px] lg:h-[650px]">
                    {/* Left side - Image */}
                    <div className="hidden md:block w-full md:w-1/2 h-[180px] sm:h-[200px] md:h-auto bg-gray-200 animate-pulse"></div>

                    {/* Right side - Content */}
                    <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-12 flex flex-col">
                        {/* Article number */}
                        <div className="flex items-center mt-2 sm:mt-6 md:mt-12 mb-2 sm:mb-3">
                            <div className="h-10 sm:h-16 md:h-20 w-10 sm:w-16 md:w-20 bg-gray-100 rounded-md mr-2 sm:mr-3 animate-pulse"></div>
                            <div className="h-6 sm:h-8 md:h-10 w-10 sm:w-16 md:w-20 bg-gray-100 rounded-md animate-pulse"></div>
                        </div>

                        {/* Title */}
                        <div className="h-8 sm:h-12 md:h-16 w-5/6 bg-gray-200 rounded-md mb-1 sm:mb-2 animate-pulse"></div>
                        <div className="h-8 sm:h-12 md:h-16 w-4/5 bg-gray-200 rounded-md mb-3 sm:mb-6 animate-pulse"></div>

                        {/* Excerpt - Fewer lines on mobile */}
                        <div className="h-3 sm:h-4 w-full bg-gray-200 rounded-md mb-2 animate-pulse"></div>
                        <div className="h-3 sm:h-4 w-full bg-gray-200 rounded-md mb-2 animate-pulse"></div>
                        <div className="h-3 sm:h-4 w-2/3 bg-gray-200 rounded-md mb-3 sm:mb-6 animate-pulse"></div>

                        {/* Author info */}
                        <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 rounded-md mb-1 animate-pulse"></div>
                        <div className="h-3 sm:h-4 w-16 sm:w-24 bg-gray-200 rounded-md mb-4 sm:mb-8 animate-pulse"></div>

                        {/* Read button */}
                        <div className="h-8 sm:h-10 w-28 sm:w-36 bg-blue-100 rounded-md animate-pulse mt-auto mb-4 sm:mb-12"></div>
                    </div>
                </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-8">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 sm:h-2 ${i === 1 ? "w-6 sm:w-8" : "w-1.5 sm:w-2"} rounded-full ${i === 1 ? "bg-blue-300" : "bg-gray-200"} animate-pulse`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>

            {/* Thumbnails row - Scroll on mobile */}
            <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-4 px-2">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="hidden md:block min-w-[100px] sm:min-w-[120px] md:min-w-[130px] w-[100px] sm:w-[120px] md:w-[130px] h-[55px] sm:h-[65px] md:h-[70px] bg-gray-200 rounded-md animate-pulse flex-shrink-0"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
        </section>
    );
});
