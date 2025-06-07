import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface PublishButtonProps {
    title: string;
    description: string;
    imageData?: { file?: File; url?: string };
}

export const PublishButton = ({
    title,
    description,
    imageData,
}: PublishButtonProps) => {
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title.trim()) {
            toast.error("Please fill in the title field");
            return;
        } else if (!description.trim()) {
            toast.error("Please fill in the description field");
            return;
        }

        try {
            const imageUrl = imageData?.url || null;

            const requestData = {
                title,
                content: description,
                imageUrl: imageUrl,
            };

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog?_t=${Date.now()}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );

            navigate(`/blog/${response.data.id}`);
            toast.success("Post published successfully");
        } catch (error: any) {
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
        <button
            onClick={handlePublish}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black bg-zinc-200 hover:bg-zinc-300 hover:border-black focus:outline-none focus:ring-2 focus:ring-black rounded-full transition-colors"
        >
            Publish post
        </button>
    );
};
