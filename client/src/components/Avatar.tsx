export function Avatar({ name = "", size = "small" }: { name: string, size?: "small" | "big" }) {
    const displayName = name ? name[0].toUpperCase() : "";
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
                size === "small" ? "w-8 h-8" : "w-10 h-10"
            }`}
        >
            <span
                className={`${
                    size === "small" ? "text-md" : "text-lg"
                } font-medium text-gray-600 dark:text-gray-300`}
            >
                {displayName}
            </span>
        </div>
    );
}