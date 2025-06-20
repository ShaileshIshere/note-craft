import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/blog/FullBlog";
import { Spinner } from "../components/Spinner";
import { Layout } from "../components/Layout"; // Add this import
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || "",
    });

    if (loading || !blog) {
        return (
            <Layout>
                <div>
                    <Appbar />

                    <div className="h-screen flex flex-col justify-center">
                        <div className="flex justify-center">
                            <Spinner size="md" color="blue" />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <FullBlog blog={blog} />
        </Layout>
    );
};
