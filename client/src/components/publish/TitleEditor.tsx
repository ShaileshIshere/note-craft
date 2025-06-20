import { memo, useState } from "react";
import { Type } from "lucide-react";
import { usePublishStore } from "../../store/publishStore";

export const TitleEditor = memo(() => {
    // Use local state for the input value
    const [localTitle, setLocalTitle] = useState("");

    // Get the store setter (not the value)
    const setTitle = usePublishStore((state) => state.setTitle);

    // Update local and global state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalTitle(value);
        setTitle(value);
    };

    return (
        <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
                <Type className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-700">
                    Article Title
                </label>
            </div>
            <input
                onChange={handleChange}
                type="text"
                className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent resize-none pb-3"
                placeholder="Enter your article title..."
                value={localTitle}
            />
            <div className="h-px bg-gradient-to-r from-blue-200 via-gray-200 to-transparent"></div>
        </div>
    );
});
