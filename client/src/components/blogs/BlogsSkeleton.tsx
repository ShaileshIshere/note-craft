import { memo } from "react";
import { FeaturedSliderSkeleton } from "./FeaturedSliderSkeleton";
import { SectionHeaderSkeleton } from "./SectionHeaderSkeleton";
import { SearchFiltersSkeleton } from "./SearchFiltersSkeleton";
import { BlogCardSkeleton } from "./BlogCardSkeleton";

export const BlogsSkeleton = memo(() => {
    return (
        <>
            {/* Featured Slider Skeleton - now responsive */}
            <div className="py-10">
                <FeaturedSliderSkeleton />
            </div>

            {/* Community Blogs Section with Skeleton */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 md:py-16">
                {/* Section Header Skeleton - now responsive */}
                <SectionHeaderSkeleton />

                {/* Search and Filters Skeleton - now responsive */}
                <SearchFiltersSkeleton />

                {/* Blog Cards Skeletons - now responsive */}
                <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-10 border-t border-gray-100">
                    {/* Fewer cards on mobile */}
                    {[...Array(3)].map((_, i) => (
                        <BlogCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </>
    );
});
