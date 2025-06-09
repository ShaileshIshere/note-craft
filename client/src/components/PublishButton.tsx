import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authLoader } from "../hooks/userAtom"; // Import the atom
import { CreativeAuthLoader } from "./AuthLoader";

interface PublishButtonProps {
    title: string;
    description: string;
    imageData?: { file?: File; url?: string };
    category?: string;
}

export const PublishButton = ({
    title,
    description,
    imageData,
    category = "General",
}: PublishButtonProps) => {
    const navigate = useNavigate();
    const [isPublishing, setIsPublishing] = useState(false);
    const setAuthLoading = useSetRecoilState(authLoader); // Recoil setter

    const handlePublish = async () => {
        if (!title.trim()) {
            toast.error("Please fill in the title field");
            return;
        } else if (!description.trim()) {
            toast.error("Please fill in the description field");
            return;
        }

        setIsPublishing(true);
        setAuthLoading(true); // Start the CreativeAuthLoader

        try {
            const imageUrl = imageData?.url || null;

            const requestData = {
                title,
                content: description,
                imageUrl: imageUrl,
                category: category,
                published: true,
                excerpt: description.substring(0, 150) + '...',
            };

            console.log("Publishing with data:", requestData);

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog?_t=${Date.now()}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );

            console.log("Publish response:", response.data);

            // Add a small delay to show completion before navigating
            setTimeout(() => {
                setIsPublishing(false);
                setAuthLoading(false); // Stop the CreativeAuthLoader
                navigate(`/blog/${response.data.id}`);
                toast.success("Post published successfully");
            }, 1500);

        } catch (error: any) {
            console.error("Publish error:", error);
            setIsPublishing(false);
            setAuthLoading(false); // Stop the CreativeAuthLoader on error
            
            if (error.response) {
                toast.error(
                    `Failed to publish post: ${error.response.data.message || error.response.statusText}`,
                );
            } else if (error.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error(
                    "An error occurred while publishing the post. Please try again.",
                );
            }
        }
    };

    return (
        <>
            <button
                onClick={handlePublish}
                type="submit"
                disabled={isPublishing}
                className={`mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black bg-zinc-200 hover:bg-zinc-300 hover:border-black focus:outline-none focus:ring-2 focus:ring-black rounded-full transition-colors ${
                    isPublishing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isPublishing ? 'Publishing...' : 'Publish post'}
            </button>

            {/* CreativeAuthLoader will show automatically based on Recoil state */}
            <CreativeAuthLoader />
        </>
    );
};
