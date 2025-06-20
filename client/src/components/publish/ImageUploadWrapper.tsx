import { memo } from "react";
import { ImageIcon } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { usePublishStore } from "../../store/publishStore";

export const ImageUploadWrapper = memo(() => {
    // Get the setter function and current image URL
    const setImageData = usePublishStore((state) => state.setImageData);
    const imageUrl = usePublishStore((state) => state.imageData.url);

    return (
        <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-700">
                    Featured Image
                </label>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Optional
                </span>
            </div>
            <ImageUpload
                onImageSelect={(data) => {
                    setImageData(data);
                }}
                currentImage={imageUrl}
            />
        </div>
    );
});
