"use client";

import { memo, useEffect } from "react";
import type { Blog } from "../../hooks";
import { Appbar } from "../Appbar";
import { useBlogViewStore } from "../../store/blogViewStore";
import { BlogHeader } from "./BlogHeader";
import { BlogImage } from "./BlogImage";
import { BlogContent } from "./BlogContent";
import { BackToBlogs } from "./BackToBlogs";
import { ExploreMoreButton } from "./ExploreMoreButton";

export const FullBlog = memo(({ blog }: { blog: Blog }) => {
    // Initialize blog view store with the current blog's like count
    const setInitialLikes = useBlogViewStore((state) => state.setInitialLikes);

    useEffect(() => {
        setInitialLikes(blog.likes || 0);
    }, [blog.likes, setInitialLikes]);

    return (
        <div className="min-h-screen bg-white">
            <Appbar />

            {/* Back Navigation - Mobile Friendly */}
            <BackToBlogs />

            {/* Main Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
                {/* Article Header - Now includes the like button */}
                <BlogHeader
                    title={blog.title}
                    category={blog.category}
                    authorName={blog.author.name}
                    publishedAt={blog.publishedAt}
                    createdAt={blog.createdAt}
                    content={blog.content}
                    blogId={blog.id} // Pass the blogId
                />

                {/* Featured Image */}
                <BlogImage
                    imageUrl={blog.imageUrl ?? null}
                    title={blog.title}
                    blogId={blog.id}
                />

                {/* Article Content */}
                <BlogContent
                    content={blog.content}
                    excerpt={blog.excerpt ?? null}
                />

                {/* Back to Articles */}
                <ExploreMoreButton />
            </div>
        </div>
    );
});
