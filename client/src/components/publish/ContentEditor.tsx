import { memo, useState, ChangeEvent } from "react";
import { PenTool } from "lucide-react";
import { usePublishStore } from "../../store/publishStore";

export const ContentEditor = memo(() => {
    // Local state for the textarea value
    const [localContent, setLocalContent] = useState("");

    // Get the store setter
    const setContent = usePublishStore((state) => state.setContent);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setLocalContent(value);
        setContent(value);
    };

    return (
        <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
                <PenTool className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-700">
                    Article Content
                </label>
            </div>
            <div className="relative">
                <textarea
                    value={localContent}
                    onChange={handleChange}
                    rows={12}
                    className="w-full text-lg text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-relaxed"
                    placeholder="Tell your story... Share your thoughts, experiences, and insights with the world. What would you like to write about today?"
                />
            </div>
        </div>
    );
});
