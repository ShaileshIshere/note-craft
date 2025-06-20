"use client";

import { memo } from "react";
import { useBlogs } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Layout } from "../components/Layout";
import { FeaturedSliderContainer } from "../components/blogs/FeaturedSliderContainer";
import { BlogFiltersContainer } from "../components/blogs/BlogFiltersContainer";
import { BlogList } from "../components/blogs/BlogList";
import { BlogsSkeleton } from "../components/blogs/BlogsSkeleton";

export const Blogs = memo(() => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50">
                    <Appbar />
                    <BlogsSkeleton />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <Appbar />

                {/* Isolated Featured Slider Section */}
                <FeaturedSliderContainer />

                {/* Community Blogs Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
                    {/* Isolated Search and Header Section */}
                    <BlogFiltersContainer />

                    {/* Blog List with Load More */}
                    <BlogList blogs={blogs} />
                </section>
            </div>
        </Layout>
    );
});

export default Blogs;
