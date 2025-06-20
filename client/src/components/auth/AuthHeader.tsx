import { memo } from "react";
import { motion } from "framer-motion";

interface AuthHeaderProps {
    type: "signin" | "signup";
}

export const AuthHeader = memo(({ type }: AuthHeaderProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-8"
    >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {type === "signin" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-600">
            {type === "signin"
                ? "Sign in to continue your writing journey"
                : "Join our community of writers and readers"}
        </p>
    </motion.div>
));
