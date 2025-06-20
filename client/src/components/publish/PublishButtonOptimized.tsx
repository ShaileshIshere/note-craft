import { memo } from "react";
import { usePublishStore } from "../../store/publishStore";
import { useUserStore } from "../../store/userStore";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export const PublishButtonOptimized = memo(() => {
    // Get state from publish store
    const title = usePublishStore((state) => state.title);
    const content = usePublishStore((state) => state.content);
    const category = usePublishStore((state) => state.category);
    const imageData = usePublishStore((state) => state.imageData);
    const isSubmitting = usePublishStore((state) => state.isSubmitting);
    const setIsSubmitting = usePublishStore((state) => state.setIsSubmitting);
    const resetForm = usePublishStore((state) => state.resetForm);

    // Get auth loader from user store
    const setAuthLoader = useUserStore((state) => state.setAuthLoader);

    const navigate = useNavigate();

    const handlePublish = async () => {
        // Validation
        if (!title.trim()) {
            showToast("Please enter a title for your article", true);
            return;
        }

        if (!content.trim()) {
            showToast("Please add some content to your article", true);
            return;
        }

        setAuthLoader(true); // Show the CreativeAuthLoader
        setIsSubmitting(true);

        try {
            // Create JSON data object
            const requestData = {
                title,
                content,
                category,
                published: true,
                imageUrl: imageData?.url || null,
                excerpt: content.substring(0, 150) + "...",
            };

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog?_t=${Date.now()}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            showToast("Article published successfully! 🎉");

            // Reset form state after successful publishing
            resetForm();

            // Keep the loader running until after navigation completes
            setTimeout(() => {
                navigate(`/blog/${response.data.id}`);

                // Small delay after navigation to ensure smooth transition
                // This helps prevent any flash of the loader disappearing
                setTimeout(() => {
                    setIsSubmitting(false);
                    setAuthLoader(false); // Only hide loader after navigation is complete
                }, 100);
            }, 1500);
        } catch (error: any) {
            console.error("Error publishing article:", error);

            if (error.response) {
                showToast(
                    `Failed to publish: ${error.response.data.message || error.response.statusText}`,
                    true,
                );
            } else if (error.request) {
                showToast(
                    "No response from server. Please try again later.",
                    true,
                );
            } else {
                showToast(
                    "An error occurred while publishing. Please try again.",
                    true,
                );
            }

            // Only in case of error, turn off loader immediately
            setIsSubmitting(false);
            setAuthLoader(false);
        }
    };

    // Publish button states
    const isFormComplete = title.trim() && content.trim();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Publishing tips - responsive text size and width */}
            <div className="text-sm text-gray-500">
                <span className="mr-1 sm:mr-2">Ready to share your story?</span>
                {!isFormComplete && (
                    <span className="text-orange-500 block sm:inline mt-1 sm:mt-0">
                        Complete the required fields first
                    </span>
                )}
            </div>

            {/* Publish button - full width on mobile, auto width on larger screens */}
            <motion.button
                onClick={handlePublish}
                disabled={!isFormComplete || isSubmitting}
                className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl font-medium flex items-center justify-center sm:justify-start gap-2 transition-all ${
                    isFormComplete && !isSubmitting
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md hover:shadow-blue-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                whileTap={
                    isFormComplete && !isSubmitting ? { scale: 0.98 } : {}
                }
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                </svg>
                <span className="whitespace-nowrap">Publish Article</span>
            </motion.button>
        </div>
    );
});
