import { memo } from "react";
import { SearchAndFilters } from "./SearchAndFilters";
import { SectionHeader } from "./SectionHeader";

export const BlogFiltersContainer = memo(
    () => {
        return (
            <>
                <SectionHeader
                    title="Community Stories"
                    subtitle="Discover authentic stories and insights shared by our vibrant community of writers and creators."
                    showStats={true}
                />
                <SearchAndFilters />
            </>
        );
    },
    () => true,
); // Always return true to prevent re-renders from parent
