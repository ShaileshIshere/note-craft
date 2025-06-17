import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

// Updated Blog interface with new fields
export interface Blog {
    content: string;
    title: string;
    id: string;
    imageUrl?: string;
    excerpt?: string;
    category: string;
    likes: number;
    publishedAt: string;
    createdAt: string;
    author: {
        name: string;
    };
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setBlog(response.data.blog);
                setLoading(false);
            });
    }, [id]);

    return {
        loading,
        blog,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, config)
            .then((response) => {
                setBlogs(response.data.blogs);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
    };
};

// Updated FeaturedBlog interface with all new fields
export interface FeaturedBlog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    imageUrl?: string;
    author: {
        name: string;
    };
    category: string;        // Added
    createdAt: string;
    publishedAt: string;     // Added
    likes: number;           // Added
}

export const useFeaturedBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<FeaturedBlog[]>([]);

    useEffect(() => {
        // console.log("Fetching from:", `${BACKEND_URL}/api/v1/blog/featured`);

        axios
            .get(`${BACKEND_URL}/api/v1/blog/featured`)
            .then((response) => {
                // console.log("Featured blogs response:", response.data);
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching featured blogs:", error);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
    };
};
