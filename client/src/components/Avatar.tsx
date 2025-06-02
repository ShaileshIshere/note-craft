export function Avatar({ 
    name = "", 
    size = "small", 
    imageUrl 
}: { 
    name: string, 
    size?: "small" | "big",
    imageUrl?: string 
}) {
    const displayName = name ? name[0].toUpperCase() : "";
    const sizeClasses = size === "small" ? "w-8 h-8" : "w-10 h-10";
    
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${sizeClasses}`}
        >
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.currentTarget.style.display = 'none';                    }}
                />
            ) : null}
            <span
                className={`${
                    size === "small" ? "text-md" : "text-lg"
                } font-medium text-white ${imageUrl ? 'hidden' : 'flex'} items-center justify-center`}
                style={{ display: imageUrl ? 'none' : 'flex' }}
            >
                {displayName}
            </span>
        </div>
    );
}