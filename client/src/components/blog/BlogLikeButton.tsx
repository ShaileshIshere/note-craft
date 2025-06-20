import { memo, useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogViewStore } from "../../store/blogViewStore";

interface BlogLikeButtonProps {
    blogId: string;
}

export const BlogLikeButton = memo(({ blogId }: BlogLikeButtonProps) => {
    // Use separate selectors for primitive values to prevent infinite loops
    const likes = useBlogViewStore((state) => state.likes);
    const hasLiked = useBlogViewStore((state) => state.hasLiked);
    // Get function reference directly
    const toggleLikeFromStore = useBlogViewStore((state) => state.toggleLike);

    // Local state for optimistic updates
    const [optimisticLikes, setOptimisticLikes] = useState(likes);
    const [optimisticHasLiked, setOptimisticHasLiked] = useState(hasLiked);
    const [isAnimating, setIsAnimating] = useState(false);

    // Sync with store when it changes (e.g. on initial load)
    useEffect(() => {
        setOptimisticLikes(likes);
    }, [likes]);

    useEffect(() => {
        setOptimisticHasLiked(hasLiked);
    }, [hasLiked]);

    // Memoize the handler to prevent recreation on each render
    const handleLike = useCallback(() => {
        // Optimistically update UI immediately
        const newLikedState = !optimisticHasLiked;
        setOptimisticHasLiked(newLikedState);
        setOptimisticLikes((prevLikes) => prevLikes + (newLikedState ? 1 : -1));

        // Animate the heart
        if (newLikedState) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }

        // Make the API call in the background
        toggleLikeFromStore(blogId).catch((error) => {
            // If the API call fails, revert the optimistic update
            console.error("Like operation failed:", error);
            setOptimisticHasLiked(!newLikedState);
            setOptimisticLikes(likes); // Use the original value from store
        });
    }, [blogId, optimisticHasLiked, toggleLikeFromStore, likes]);

    return (
        <motion.button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                animate={isAnimating ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Heart
                    className={`w-5 h-5 transition-colors ${
                        optimisticHasLiked
                            ? "fill-red-500 text-red-500"
                            : "fill-none text-gray-600"
                    }`}
                />
            </motion.div>
            <span className="text-sm font-medium">{optimisticLikes}</span>
        </motion.button>
    );
});
