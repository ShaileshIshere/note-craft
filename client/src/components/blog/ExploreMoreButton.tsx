import { memo } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ExploreMoreButton = memo(() => {
    const navigate = useNavigate();

    const handleBackToBlogs = () => {
        navigate("/blogs");
    };

    return (
        <div className="mt-12 sm:mt-16 text-center">
            <motion.button
                onClick={handleBackToBlogs}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="text-sm sm:text-base">
                    Explore More Articles
                </span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
            </motion.button>
        </div>
    );
});
