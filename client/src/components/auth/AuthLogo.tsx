import { memo } from "react";
import { motion } from "framer-motion";

export const AuthLogo = memo(() => (
    <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center space-x-2">
            <div className="font-medium text-4xl tracking-tight">
                <span className="text-gray-800 font-serif">note</span>
                <span className="text-blue-600 font-bold">craft</span>
            </div>
        </div>
    </motion.div>
));
