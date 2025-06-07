"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
    onImageSelect: (imageData: { file?: File; url?: string }) => void;
    currentImage?: string;
}

export const ImageUpload = ({
    onImageSelect,
    currentImage,
}: ImageUploadProps) => {
    const [imagePreview, setImagePreview] = useState<string>(
        currentImage || "",
    );
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleUrlSubmit = async () => {
        if (!imageUrl.trim()) return;

        try {
            new URL(imageUrl);
            setIsLoading(true);

            // Test if the URL is a valid image
            const img = new Image();
            img.onload = () => {
                setImagePreview(imageUrl);
                onImageSelect({ url: imageUrl });
                setIsLoading(false);
            };
            img.onerror = () => {
                alert("Please enter a valid image URL");
                setIsLoading(false);
            };
            img.src = imageUrl;
        } catch {
            alert("Please enter a valid URL");
        }
    };

    const clearImage = () => {
        setImagePreview("");
        setImageUrl("");
        onImageSelect({});
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleUrlSubmit();
        }
    };

    return (
        <div className="space-y-4">
            {/* URL Input */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="https://example.com/image.jpg"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    />
                </div>
                <motion.button
                    type="button"
                    onClick={handleUrlSubmit}
                    disabled={!imageUrl.trim() || isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isLoading ? "Loading..." : "Add Image"}
                </motion.button>
            </div>

            {/* Image Preview */}
            {imagePreview && (
                <motion.div
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative overflow-hidden rounded-xl border border-gray-200">
                        <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-48 sm:h-64 object-cover"
                            onError={(e) => {
                                e.currentTarget.src = `https://picsum.photos/400/200?random=${Date.now()}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200"></div>
                        <motion.button
                            type="button"
                            onClick={clearImage}
                            className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-4 h-4" />
                        </motion.button>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                        <ImageIcon className="w-4 h-4" />
                        <span>Image added successfully</span>
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {!imagePreview && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-sm">
                        Add an image URL above to preview your featured image
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Supports JPG, PNG, GIF, and WebP formats
                    </p>
                </div>
            )}
        </div>
    );
};
