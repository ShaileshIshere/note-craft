import { memo } from "react";

export const SectionHeaderSkeleton = memo(() => {
    return (
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
            {/* Title skeleton */}
            <div className="h-7 sm:h-8 md:h-9 w-48 sm:w-56 md:w-64 bg-gray-200 rounded-md mx-auto mb-3 sm:mb-4 animate-pulse"></div>

            {/* Subtitle skeleton - 2 lines */}
            <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
                <div className="h-3 sm:h-3.5 md:h-4 w-full bg-gray-200 rounded-md mb-1.5 sm:mb-2 animate-pulse"></div>
                <div className="h-3 sm:h-3.5 md:h-4 w-4/5 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
            </div>

            {/* Stats skeleton - Stack on mobile, row on larger screens */}
            <div className="flex flex-row justify-center gap-2 sm:gap-12 md:gap-16 mt-6 sm:mt-8">
                {/* Articles */}
                <div className="flex sm:flex-col items-center mb-4 sm:mb-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-blue-100 mb-0 sm:mb-3 mr-4 sm:mr-0 flex items-center justify-center animate-pulse">
                        <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-blue-200 rounded-sm"></div>
                    </div>
                    <div className="flex flex-col items-start sm:items-center">
                        <div className="h-5 sm:h-5.5 md:h-6 w-8 sm:w-10 md:w-12 bg-gray-200 rounded-md mb-1 animate-pulse"></div>
                        <div className="h-3 sm:h-3.5 md:h-4 w-14 sm:w-16 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                </div>

                {/* Readers */}
                <div className="flex sm:flex-col items-center mb-4 sm:mb-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-green-100 mb-0 sm:mb-3 mr-4 sm:mr-0 flex items-center justify-center animate-pulse">
                        <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-green-200 rounded-sm"></div>
                    </div>
                    <div className="flex flex-col items-start sm:items-center">
                        <div className="h-5 sm:h-5.5 md:h-6 w-8 sm:w-10 md:w-12 bg-gray-200 rounded-md mb-1 animate-pulse"></div>
                        <div className="h-3 sm:h-3.5 md:h-4 w-14 sm:w-16 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex sm:flex-col items-center mb-4 sm:mb-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-purple-100 mb-0 sm:mb-3 mr-4 sm:mr-0 flex items-center justify-center animate-pulse">
                        <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-purple-200 rounded-sm"></div>
                    </div>
                    <div className="flex flex-col items-start sm:items-center">
                        <div className="h-5 sm:h-5.5 md:h-6 w-8 sm:w-10 md:w-12 bg-gray-200 rounded-md mb-1 animate-pulse"></div>
                        <div className="h-3 sm:h-3.5 md:h-4 w-16 sm:w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});
