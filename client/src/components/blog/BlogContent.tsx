import { memo } from "react";
import { motion } from "framer-motion";

interface BlogContentProps {
    content: string;
    excerpt: string | null;
}

export const BlogContent = memo(({ content, excerpt }: BlogContentProps) => {
    return (
        <motion.article
            className="max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            {/* Main Content */}
            <div className="prose prose-lg prose-gray max-w-none mb-12 sm:mb-16">
                <div className="text-gray-700 leading-relaxed space-y-6 sm:space-y-8">
                    {content.split("\n").map((paragraph, index) => {
                        if (!paragraph.trim()) return null;

                        return (
                            <p
                                key={index}
                                className={`leading-8 sm:leading-9 ${
                                    index === 0
                                        ? "text-xl sm:text-2xl text-gray-800 font-medium first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-1 first-letter:float-left first-letter:leading-none"
                                        : "text-lg sm:text-xl"
                                }`}
                            >
                                {paragraph}
                            </p>
                        );
                    })}
                </div>
            </div>

            {/* Key Insights Section */}
            <div className="space-y-8 sm:space-y-12">
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                        Key Insights
                    </h2>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-100">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            {excerpt ||
                                "This article explores modern approaches to component architecture and design patterns that can significantly improve your development workflow and code maintainability."}
                        </p>
                    </div>
                </section>
            </div>
        </motion.article>
    );
});
