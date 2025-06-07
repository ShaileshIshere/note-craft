"use client"

export const BlogSkeleton = () => {
  return (
    <div className="w-full flex justify-center px-6 py-8">
      <div className="w-full max-w-5xl">
        <div className="group relative">
          {/* Main Content Container */}
          <div className="flex items-center gap-12 py-8 border-b border-gray-100">
            {/* Left Content Section */}
            <div className="flex-1 space-y-4">
              {/* Author Info Skeleton */}
              <div className="flex items-center space-x-3 mb-4">
                {/* Avatar Skeleton */}
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>

                <div className="flex items-center space-x-2">
                  {/* Author Name Skeleton */}
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>

                  {/* Circle Separator */}
                  <div className="h-1 w-1 rounded-full bg-gray-300"></div>

                  {/* Date Skeleton */}
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>

                  {/* Circle Separator */}
                  <div className="h-1 w-1 rounded-full bg-gray-300"></div>

                  {/* Read Time Skeleton */}
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Title Skeleton */}
              <div className="space-y-3 mb-3">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-4/5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Content Excerpt Skeleton */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Right Image Section Skeleton */}
            <div className="flex-shrink-0">
              <div className="w-64 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Subtle shimmer effect overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}
