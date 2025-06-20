import { create } from "zustand";

interface FeaturedState {
    currentSlide: number;
    setCurrentSlide: (slide: number) => void;
    nextSlide: (totalSlides: number) => void;
    prevSlide: () => void;
}

export const useFeaturedStore = create<FeaturedState>((set) => ({
    currentSlide: 0,

    setCurrentSlide: (slide) => set({ currentSlide: slide }),

    nextSlide: (totalSlides) =>
        set((state) => ({
            currentSlide: (state.currentSlide + 1) % totalSlides,
        })),

    prevSlide: () =>
        set((state) => ({
            currentSlide: state.currentSlide === 0 ? 0 : state.currentSlide - 1,
        })),
}));
