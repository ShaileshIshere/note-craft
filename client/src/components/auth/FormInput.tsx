import React, { useState, memo } from "react";
import { motion } from "framer-motion";

interface FormInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    icon?: React.ReactNode;
}

export const FormInput = memo(
    ({
        label,
        placeholder,
        value,
        onChange,
        type = "text",
        icon,
    }: FormInputProps) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const isPasswordField = type === "password";
        const inputType = isPasswordField
            ? showPassword
                ? "text"
                : "password"
            : type;

        return (
            <div className="transition-all duration-300">
                <label
                    className={`block mb-2 text-sm font-medium transition-all duration-300 ${
                        isFocused ? "text-blue-600" : "text-gray-700"
                    }`}
                >
                    {label}
                </label>
                <div className="relative">
                    {icon && (
                        <div
                            className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
                                isFocused ? "text-blue-500" : "text-gray-400"
                            }`}
                        >
                            {icon}
                        </div>
                    )}
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        type={inputType}
                        className={`w-full pl-11 ${
                            isPasswordField ? "pr-12" : "pr-4"
                        } py-3.5 rounded-xl border transition-all duration-300 focus:outline-none ${
                            isFocused
                                ? "border-blue-500 ring-2 ring-blue-100"
                                : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder={placeholder}
                        required
                    />
                    {isPasswordField && (
                        <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            {showPassword ? (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </motion.button>
                    )}
                </div>
            </div>
        );
    },
);
