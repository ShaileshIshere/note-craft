import { memo } from "react";
import { motion } from "framer-motion";

interface AuthButtonProps {
    onClick: () => void;
    isSubmitting?: boolean;
    type: "signin" | "signup";
}

export const AuthButton = memo(
    ({ onClick, isSubmitting, type }: AuthButtonProps) => (
        <motion.button
            onClick={onClick}
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-blue-200/50 transition-all duration-300 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
            {/* Always show the button text, even when submitting */}
            {type === "signup" ? "Create Account" : "Sign In"}
        </motion.button>
    ),
);
