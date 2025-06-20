import { create } from "zustand";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

interface BlogViewState {
    likes: number;
    isLiking: boolean;
    hasLiked: boolean;
    setInitialLikes: (likes: number) => void;
    toggleLike: (blogId: string) => Promise<void>;
}

export const useBlogViewStore = create<BlogViewState>((set, get) => ({
    likes: 0,
    isLiking: false,
    hasLiked: false,

    setInitialLikes: (likes) => set({ likes }),

    toggleLike: async (blogId) => {
        const { isLiking, hasLiked } = get();

        if (isLiking) return;

        set({ isLiking: true });

        const action = hasLiked ? "unlike" : "like";

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/${blogId}/like`,
                { action },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );

            if (response.data.success) {
                set({
                    likes: response.data.likes,
                    hasLiked: !hasLiked,
                });

                // if (!hasLiked) {
                //   toast.success("Post liked! ❤️");
                // } else {
                //   toast.success("Like removed");
                // }
            }
        } catch (error: any) {
            console.error("Error toggling like:", error);
            if (error.response?.status === 401) {
                toast.error("Please log in to like posts");
            } else {
                toast.error("Failed to update like");
            }
        } finally {
            set({ isLiking: false });
        }
    },
}));
