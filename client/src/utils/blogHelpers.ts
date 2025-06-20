// Estimate reading time (assuming 200 words per minute)
export const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
};

// Format date to human readable format
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        if (diffInHours === 0) {
            const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} min ago`;
        }
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
        return "Yesterday";
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
};

// Get category color
export const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
        Technology: "bg-blue-100 text-blue-800",
        Business: "bg-green-100 text-green-800",
        Health: "bg-red-100 text-red-800",
        Lifestyle: "bg-purple-100 text-purple-800",
        Education: "bg-yellow-100 text-yellow-800",
        Entertainment: "bg-pink-100 text-pink-800",
        Travel: "bg-indigo-100 text-indigo-800",
        Food: "bg-orange-100 text-orange-800",
        Sports: "bg-emerald-100 text-emerald-800",
        General: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors["General"];
};
