export const Spinner = ({ size = "md", color = "blue" }: { size?: "sm" | "md" | "lg", color?: "blue" | "gray" | "white" }) => {
    const sizeClasses = {
        sm: "w-5 h-5",
        md: "w-8 h-8", 
        lg: "w-12 h-12"
    };

    const colorClasses = {
        blue: "border-blue-200 border-t-blue-600",
        gray: "border-gray-200 border-t-gray-600", 
        white: "border-white/30 border-t-white"
    };

    return (
        <div className="flex items-center justify-center">
            <div 
                className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

// Alternative: Pulse Dots Spinner
export const PulseSpinner = ({ color = "blue" }: { color?: "blue" | "gray" | "white" }) => {
    const colorClasses = {
        blue: "bg-blue-600",
        gray: "bg-gray-600",
        white: "bg-white"
    };

    return (
        <div className="flex items-center justify-center space-x-1" role="status" aria-label="Loading">
            <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-pulse`}></div>
            <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-pulse`} style={{ animationDelay: '0.1s' }}></div>
            <div className={`w-2 h-2 ${colorClasses[color]} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

// Alternative: Notecraft Branded Spinner
export const NotecraftSpinner = () => {
    return (
        <div className="flex items-center justify-center" role="status" aria-label="Loading">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-10 h-10 border-2 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                
                {/* Inner decorative element */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-100 rounded-full animate-pulse"></div>
                </div>
                
                {/* Notecraft icon in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-sm transform rotate-12 animate-pulse"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};