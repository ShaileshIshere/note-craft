import { motion } from "framer-motion";
import { PenTool } from "lucide-react";
import { memo } from "react";

export const PublishHeader = memo(() => {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <PenTool className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Write Your Story
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Share your thoughts, insights, and experiences with the
                        world
                    </p>
                </motion.div>
            </div>
        </div>
    );
});
