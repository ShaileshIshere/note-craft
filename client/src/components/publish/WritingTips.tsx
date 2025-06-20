import { memo } from "react";
import { motion } from "framer-motion";

export const WritingTips = memo(() => {
    return (
        <motion.div
            className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Writing Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                        Choose the right category to help readers find your
                        content
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                        Start with a compelling title that captures your main
                        idea
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                        Use clear, concise language and break up long paragraphs
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                        Add a relevant image to make your article more engaging
                    </span>
                </li>
            </ul>
        </motion.div>
    );
});
