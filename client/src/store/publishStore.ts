import { create } from "zustand";

interface PublishState {
    // Form data
    title: string;
    content: string;
    category: string;
    imageData: { file?: File; url?: string };
    isSubmitting: boolean;

    // Actions
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setCategory: (category: string) => void;
    setImageData: (imageData: { file?: File; url?: string }) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
}

export const usePublishStore = create<PublishState>((set) => ({
    // Initial state
    title: "",
    content: "",
    category: "General",
    imageData: {},
    isSubmitting: false,

    // Actions
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setCategory: (category) => set({ category }),
    setImageData: (imageData) => set({ imageData }),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    resetForm: () =>
        set({
            title: "",
            content: "",
            category: "General",
            imageData: {},
            isSubmitting: false,
        }),
}));
