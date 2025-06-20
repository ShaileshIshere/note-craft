import { memo } from "react";
import { FeaturedSlider } from "./FeaturedSlider";

export const FeaturedSliderContainer = memo(
    () => {
        return (
            <section className="max-w-7xl mx-auto px-4 md:px-0 py-6 sm:py-10">
                <FeaturedSlider />
            </section>
        );
    },
    () => true,
); // Use a custom equality function that always returns true to prevent re-renders
