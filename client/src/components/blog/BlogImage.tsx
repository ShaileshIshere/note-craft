import { memo } from "react";
import { motion } from "framer-motion";

interface BlogImageProps {
    imageUrl: string | null;
    title: string;
    blogId: string;
}

export const BlogImage = memo(({ imageUrl, title, blogId }: BlogImageProps) => {
    // Function to get blog image
    const getBlogImageUrl = () => {
        if (imageUrl) {
            return imageUrl;
        }
        return `https://picsum.photos/1200/600?random=${blogId}`;
    };

    return (
        <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                    src={getBlogImageUrl()}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            </div>
        </motion.div>
    );
});
