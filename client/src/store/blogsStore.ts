import { create } from "zustand";
import { Blog } from "../hooks";

interface BlogsState {
    // Search and filter state
    searchTerm: string;
    selectedCategory: string;
    articlesToShow: number;

    // Actions
    setSearchTerm: (term: string) => void;
    setSelectedCategory: (category: string) => void;
    setArticlesToShow: (count: number) => void;
    loadMoreArticles: () => void;
    clearFilters: () => void;
}

export const useBlogsStore = create<BlogsState>((set) => ({
    searchTerm: "",
    selectedCategory: "",
    articlesToShow: 5,

    setSearchTerm: (term) =>
        set({
            searchTerm: term,
            articlesToShow: 5, // Reset pagination when search changes
        }),

    setSelectedCategory: (category) =>
        set({
            selectedCategory: category,
            searchTerm: "", // Clear search when selecting category
            articlesToShow: 5, // Reset pagination when category changes
        }),

    setArticlesToShow: (count) => set({ articlesToShow: count }),

    loadMoreArticles: () =>
        set((state) => ({
            articlesToShow: state.articlesToShow + 2,
        })),

    clearFilters: () =>
        set({
            searchTerm: "",
            selectedCategory: "",
            articlesToShow: 5,
        }),
}));

// Selector to filter blogs - moved out of component to avoid recalculation
export const useFilteredBlogs = (blogs: Blog[]) => {
    const { searchTerm, selectedCategory } = useBlogsStore();

    return blogs.filter((blog) => {
        const matchesSearch =
            searchTerm === "" ||
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.author.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "" ||
            blog.category?.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });
};
