"use client";

import { memo } from "react";

export const BlogCardSkeleton = memo(() => {
    return (
        <div className="w-full flex justify-center px-2 sm:px-6 py-4 sm:py-8">
            <div className="w-full max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-12 py-4 sm:py-6 md:py-8 border-b border-gray-100">
                    {/* Left Content Section (Order changes on mobile) */}
                    <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 order-2 md:order-1">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <div className="h-5 sm:h-6 w-20 sm:w-24 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                            {/* Avatar */}
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Author name */}
                                <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
                                {/* Circle - Hidden on mobile */}
                                <div className="h-1 w-1 rounded-full bg-gray-200 hidden sm:block"></div>
                                {/* Date */}
                                <div className="h-3 sm:h-4 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                                {/* Circle - Hidden on mobile */}
                                <div className="h-1 w-1 rounded-full bg-gray-200 hidden sm:block"></div>
                                {/* Read time */}
                                <div className="h-3 sm:h-4 w-16 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="h-6 sm:h-7 md:h-8 w-full bg-gray-200 rounded animate-pulse mb-1 sm:mb-2"></div>
                        <div className="h-6 sm:h-7 md:h-8 w-4/5 bg-gray-200 rounded animate-pulse mb-2 sm:mb-3"></div>

                        {/* Excerpt */}
                        <div className="h-3 sm:h-4 md:h-5 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 sm:h-4 md:h-5 w-5/6 bg-gray-200 rounded animate-pulse mb-3"></div>

                        {/* Post Stats */}
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Right Image Section (Order changes on mobile) */}
                    <div className="flex-shrink-0 w-full md:w-auto order-1 md:order-2 mb-3 md:mb-0">
                        <div className="relative w-full md:w-64 h-40 sm:h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});
