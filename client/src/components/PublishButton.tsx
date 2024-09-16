import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const PublishButton = ({ title, description }: { title: string; description: string; }) => {
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title.trim()) {
            toast.error("Please fill in the title field");
            return;
        }
        else if (!description.trim()) {
            toast.error("Please fill in the description field");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            navigate(`/blog/${response.data.id}`);
            toast.success("Post published successfully");
        } catch (error: any) {
            console.error("Error publishing blog post:", error);
            // Show error message to the user
            if (error.response) {
              // Server responded with a status code outside of 2xx
              toast.error(`Failed to publish post: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
              // Request was made, but no response received
              toast.error("No response from server. Please try again later.");
            } else {
              // Something happened while setting up the request
              toast.error("An error occurred while publishing the post. Please try again.");
            }
        }
    };

    return (
        <button 
            onClick={handlePublish} 
            type="submit" 
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black bg-zinc-200 hover:bg-zinc-300 hover:border-black focus:outline-none focus:ring-2 focus:ring-black rounded-full"
        >
            Publish post
        </button>
    );
};