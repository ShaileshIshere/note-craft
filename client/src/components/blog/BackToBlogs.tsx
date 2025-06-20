import { memo } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const BackToBlogs = memo(() => {
    const navigate = useNavigate();

    const handleBackToBlogs = () => {
        navigate("/blogs");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
            <motion.button
                onClick={handleBackToBlogs}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4 sm:mb-8"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
            >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">
                    Back to articles
                </span>
            </motion.button>
        </div>
    );
});
