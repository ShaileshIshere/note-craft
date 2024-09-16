import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Footer } from "../components/Footer";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id = {blog.id}
                    authorName = {blog.author.name}
                    publishedDate = {"16 Aug 2024"}
                    title = {blog.title}
                    content = {blog.content}
                />)}
            </div>
        </div>
        <Footer />
    </div>
}