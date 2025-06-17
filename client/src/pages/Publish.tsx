"use client";

import { Appbar } from "../components/Appbar";
import { Layout } from "../components/Layout"; // Add this import
import { type ChangeEvent, useState } from "react";
import { PublishButton } from "../components/PublishButton";
import { ImageUpload } from "../components/ImageUpload";
import { motion } from "framer-motion";
import { PenTool, ImageIcon, Type, Tag, Check } from "lucide-react";

// Updated categories array - just replace the existing CATEGORIES constant
const CATEGORIES = [
    {
        value: "Technology",
        label: "Technology",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        hoverColor: "hover:bg-blue-200",
        icon: "💻",
    },
    {
        value: "Business",
        label: "Business",
        color: "bg-green-100 text-green-800 border-green-200",
        hoverColor: "hover:bg-green-200",
        icon: "💼",
    },
    {
        value: "Health",
        label: "Health",
        color: "bg-red-100 text-red-800 border-red-200",
        hoverColor: "hover:bg-red-200",
        icon: "🏥",
    },
    {
        value: "Lifestyle",
        label: "Lifestyle",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        hoverColor: "hover:bg-purple-200",
        icon: "🌟",
    },
    {
        value: "Education",
        label: "Education",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        hoverColor: "hover:bg-yellow-200",
        icon: "📚",
    },
    {
        value: "Entertainment",
        label: "Entertainment",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        hoverColor: "hover:bg-pink-200",
        icon: "🎭",
    },
    {
        value: "Travel",
        label: "Travel",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        hoverColor: "hover:bg-indigo-200",
        icon: "✈️",
    },
    {
        value: "Food",
        label: "Food",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        hoverColor: "hover:bg-orange-200",
        icon: "🍳",
    },
    {
        value: "Sports",
        label: "Sports",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        hoverColor: "hover:bg-emerald-200",
        icon: "⚽",
    },
    {
        value: "General",
        label: "General",
        color: "bg-gray-100 text-gray-800 border-gray-200",
        hoverColor: "hover:bg-gray-200",
        icon: "📝",
    },
];

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("General");
    const [imageData, setImageData] = useState<{ file?: File; url?: string }>(
        {},
    );

    // Debug the imageData state
    // console.log("Current imageData in Publish:", imageData);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <Appbar />

                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <PenTool className="w-6 h-6 text-blue-600" />
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    Write Your Story
                                </h1>
                            </div>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Share your thoughts, insights, and experiences with
                                the world
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <motion.div
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-6 sm:p-8 lg:p-12">
                            {/* Title Section */}
                            <div className="mb-8 sm:mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Type className="w-5 h-5 text-gray-400" />
                                    <label className="text-sm font-medium text-gray-700">
                                        Article Title
                                    </label>
                                </div>
                                <input
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent resize-none pb-3"
                                    placeholder="Enter your article title..."
                                    value={title}
                                />
                                <div className="h-px bg-gradient-to-r from-blue-200 via-gray-200 to-transparent"></div>
                            </div>

                            {/* Category Selection Section */}
                            <div className="mb-8 sm:mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Tag className="w-5 h-5 text-gray-400" />
                                    <label className="text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        Choose one
                                    </span>
                                </div>

                                {/* Category Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {CATEGORIES.map((cat) => (
                                        <motion.button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setCategory(cat.value)}
                                            className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                                                category === cat.value
                                                    ? `${cat.color} border-current shadow-md transform scale-105`
                                                    : `bg-white border-gray-200 text-gray-600 ${cat.hoverColor} hover:border-gray-300 hover:shadow-sm`
                                            }`}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Selected indicator */}
                                            {category === cat.value && (
                                                <motion.div
                                                    className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Check className="w-3 h-3 text-white" />
                                                </motion.div>
                                            )}

                                            {/* Category Icon */}
                                            <span className="text-2xl mb-2">{cat.icon}</span>

                                            {/* Category Label */}
                                            <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                                                {cat.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Selected Category Display */}
                                <motion.div
                                    className="mt-4 flex items-center gap-2"
                                    key={category}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-sm text-gray-600">Selected:</span>
                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                                            CATEGORIES.find((c) => c.value === category)
                                                ?.color
                                        }`}
                                    >
                                        <span>
                                            {
                                                CATEGORIES.find((c) => c.value === category)
                                                    ?.icon
                                            }
                                        </span>
                                        {category}
                                    </span>
                                </motion.div>

                                <div className="mt-6 h-px bg-gradient-to-r from-blue-200 via-gray-200 to-transparent"></div>
                            </div>

                            {/* Image Section */}
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
                                        console.log("Image selected in Publish:", data);
                                        setImageData(data);
                                    }}
                                    currentImage={imageData.url}
                                />
                            </div>

                            {/* Content Section */}
                            <div className="mb-8 sm:mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <PenTool className="w-5 h-5 text-gray-400" />
                                    <label className="text-sm font-medium text-gray-700">
                                        Article Content
                                    </label>
                                </div>
                                <TextEditor
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            {/* Publish Section */}
                            <div className="pt-6 border-t border-gray-200">
                                <PublishButton
                                    title={title}
                                    description={description}
                                    imageData={imageData}
                                    category={category} // Pass selected category
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Writing Tips */}
                    <motion.div
                        className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">
                            Writing Tips
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>
                                    Choose the right category to help readers find your
                                    content
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>
                                    Start with a compelling title that captures your
                                    main idea
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>
                                    Use clear, concise language and break up long
                                    paragraphs
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>
                                    Add a relevant image to make your article more
                                    engaging
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

function TextEditor({
    onChange,
}: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <div className="relative">
            <textarea
                onChange={onChange}
                rows={12}
                className="w-full text-lg text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-relaxed"
                placeholder="Tell your story... Share your thoughts, experiences, and insights with the world. What would you like to write about today?"
            />
            {/* <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div> */}
        </div>
    );
}
