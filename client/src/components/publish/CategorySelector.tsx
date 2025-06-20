import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Tag, Check } from "lucide-react";
import { usePublishStore } from "../../store/publishStore";
import { CATEGORIES } from "../../constants/categories";

export const CategorySelector = memo(() => {
    // Use local state to prevent re-renders in parent
    const [localCategory, setLocalCategory] = useState("General");

    // Get the store setter function
    const setGlobalCategory = usePublishStore((state) => state.setCategory);

    const handleSelectCategory = (categoryValue: string) => {
        setLocalCategory(categoryValue);
        setGlobalCategory(categoryValue);
    };

    return (
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
                        onClick={() => handleSelectCategory(cat.value)}
                        className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                            localCategory === cat.value
                                ? `${cat.color} border-current shadow-md transform scale-105`
                                : `bg-white border-gray-200 text-gray-600 ${cat.hoverColor} hover:border-gray-300 hover:shadow-sm`
                        }`}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Selected indicator */}
                        {localCategory === cat.value && (
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
                key={localCategory}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
            >
                <span className="text-sm text-gray-600">Selected:</span>
                <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        CATEGORIES.find((c) => c.value === localCategory)?.color
                    }`}
                >
                    <span>
                        {
                            CATEGORIES.find((c) => c.value === localCategory)
                                ?.icon
                        }
                    </span>
                    {localCategory}
                </span>
            </motion.div>

            <div className="mt-6 h-px bg-gradient-to-r from-blue-200 via-gray-200 to-transparent"></div>
        </div>
    );
});
