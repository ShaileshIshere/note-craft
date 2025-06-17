"use client";

import type React from "react";

import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@xlence/medium-blog";
import { useState, type ChangeEvent } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { authLoader, userNameState } from "../hooks/userAtom";
import { useSetRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { CreativeAuthLoader } from "./AuthLoader";
import { motion } from "framer-motion";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const setAuthorName = useSetRecoilState(userNameState);
    const setAuthLoader = useSetRecoilState(authLoader);
    const [isFocused, setIsFocused] = useState({
        name: false,
        email: false,
        password: false,
    });

    // Enhanced icon mapping for backend error messages
    const getErrorIcon = (message: string): string => {
        const msg = message.toLowerCase();
        if (msg.includes("password") || msg.includes("incorrect")) return "🔒";
        if (msg.includes("email") || msg.includes("no account found"))
            return "📧";
        if (
            msg.includes("already exists") ||
            msg.includes("account with this email")
        )
            return "👤";
        if (msg.includes("required") || msg.includes("fill")) return "📝";
        if (msg.includes("provide valid")) return "⚠️";
        if (msg.includes("unable to create") || msg.includes("unable to sign"))
            return "🚫";
        if (msg.includes("try again later")) return "⏰";
        return "❌";
    };

    // Enhanced toast with better styling
    const showAuthToast = (message: string, isError = false) => {
        toast.dismiss();

        const commonStyles = {
            borderRadius: "12px",
            padding: "16px 20px",
            boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            maxWidth: "450px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "1.4",
        };

        if (!isError) {
            toast.success(message, {
                id: "notecraft-toast",
                icon: "✨",
                style: {
                    ...commonStyles,
                    background:
                        "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
                    color: "#065F46",
                    border: "1px solid #A7F3D0",
                },
                duration: 4000,
            });
        } else {
            const icon = getErrorIcon(message);
            toast.error(message, {
                id: "notecraft-toast",
                icon,
                style: {
                    ...commonStyles,
                    background:
                        "linear-gradient(135deg, #FEF2F2 0%, #FEF7F7 100%)",
                    color: "#991B1B",
                    border: "1px solid #FCA5A5",
                },
                duration: 4000,
            });
        }
    };

    const sendReq = async () => {
        setAuthLoader(true);

        // Frontend validation for required fields (simple check)
        if (
            (type === "signup" && !(postInputs.name ?? "").trim()) ||
            !(postInputs.email ?? "").trim() ||
            !(postInputs.password ?? "").trim()
        ) {
            let errorMessage = "Please fill in all required fields";

            if (!postInputs.email.trim() && !postInputs.password.trim()) {
                errorMessage = "Email and password are required";
            } else if (!postInputs.email.trim()) {
                errorMessage = "Email address is required";
            } else if (!postInputs.password.trim()) {
                errorMessage = "Password is required";
            } else if (type === "signup" && !(postInputs.name ?? "").trim()) {
                errorMessage = "Full name is required";
            }

            showAuthToast(errorMessage, true);
            setAuthLoader(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs,
            );
            const jwt = response.data.JWT_token;
            localStorage.setItem("token", jwt);

            const name = response.data.name;
            localStorage.setItem("authorName", name || "");
            setAuthorName(name);

            // Success message
            showAuthToast(`Welcome to Notecraft, ${name || "there"}! 🎉`);

            // turn off the auth loader after successful login
            setAuthLoader(false);

            // Small delay for better UX
            setTimeout(() => {
                navigate("/blogs");
            }, 1000);
        } catch (error: any) {
            setAuthLoader(false);

            // Handle network errors
            if (!error.response) {
                showAuthToast(
                    "Connection failed. Please check your internet and try again",
                    true,
                );
                return;
            }

            // Extract error message directly from backend response
            const responseData = error.response.data;
            const backendMessage =
                responseData.message ||
                responseData.error ||
                "Something went wrong. Please try again";

            // Use the exact backend message
            showAuthToast(backendMessage, true);
        }
    };

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        maxWidth: "500px",
                    },
                }}
            />
            {/* <AuthLoader /> */}
            <CreativeAuthLoader />
            {/* <MinimalistAuthLoader /> */}
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-50 px-4 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600"></div>
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full opacity-70"></div>
                        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-50 rounded-full opacity-70"></div>

                        <div className="relative px-8 py-10">
                            {/* Logo */}
                            <motion.div
                                className="flex items-center justify-center mb-8"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="font-medium text-4xl tracking-tight">
                                        <span className="text-gray-800 font-serif">
                                            note
                                        </span>
                                        <span className="text-blue-600 font-bold">
                                            craft
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-center mb-8"
                            >
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {type === "signin"
                                        ? "Welcome Back"
                                        : "Create Account"}
                                </h1>
                                <p className="text-gray-600">
                                    {type === "signin"
                                        ? "Sign in to continue your writing journey"
                                        : "Join our community of writers and readers"}
                                </p>
                            </motion.div>

                            {/* Form */}
                            <motion.div
                                className="space-y-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {type === "signup" && (
                                    <LabelledInput
                                        label="Full Name"
                                        placeholder="Enter your name"
                                        icon={
                                            <svg
                                                className="w-5 h-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        }
                                        onFocus={() =>
                                            setIsFocused({
                                                ...isFocused,
                                                name: true,
                                            })
                                        }
                                        onBlur={() =>
                                            setIsFocused({
                                                ...isFocused,
                                                name: false,
                                            })
                                        }
                                        isFocused={isFocused.name}
                                        onChange={(e) => {
                                            setPostInputs({
                                                ...postInputs,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                )}
                                <LabelledInput
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    icon={
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    }
                                    onFocus={() =>
                                        setIsFocused({
                                            ...isFocused,
                                            email: true,
                                        })
                                    }
                                    onBlur={() =>
                                        setIsFocused({
                                            ...isFocused,
                                            email: false,
                                        })
                                    }
                                    isFocused={isFocused.email}
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                                <LabelledInput
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    icon={
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    }
                                    onFocus={() =>
                                        setIsFocused({
                                            ...isFocused,
                                            password: true,
                                        })
                                    }
                                    onBlur={() =>
                                        setIsFocused({
                                            ...isFocused,
                                            password: false,
                                        })
                                    }
                                    isFocused={isFocused.password}
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            password: e.target.value,
                                        });
                                    }}
                                />

                                {/* {type === "signin" && (
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                )} */}

                                <motion.button
                                    onClick={sendReq}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-blue-200/50 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {type === "signup"
                                        ? "Create Account"
                                        : "Sign In"}
                                </motion.button>

                                {/* <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative px-4 bg-white">
                    <span className="text-sm text-gray-500">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Google</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        fill="#1877F2"
                      />
                      <path
                        d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.79.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.124 0v-6.987h2.33z"
                        fill="#FFFFFF"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </motion.button>
                </div> */}
                            </motion.div>

                            {/* Footer */}
                            <motion.div
                                className="text-center mt-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <p className="text-gray-600 text-sm">
                                    {type === "signin"
                                        ? "Don't have an account?"
                                        : "Already have an account?"}
                                    <Link
                                        className="ml-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        to={type === "signin" ? "/signup" : "/"}
                                    >
                                        {type === "signin"
                                            ? "Sign up"
                                            : "Sign in"}
                                    </Link>
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Terms and Privacy */}
                    <motion.div
                        className="text-center mt-6 text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        By continuing, you agree to Notecraft's{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isFocused?: boolean;
    type?: string;
    icon?: React.ReactNode;
}

const LabelledInput = ({
    label,
    placeholder,
    onChange,
    type,
    onFocus,
    onBlur,
    isFocused,
    icon,
}: LabelledInputType) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type || "text";

    return (
        <div className="transition-all duration-300">
            <label
                className={`block mb-2 text-sm font-medium transition-all duration-300 ${isFocused ? "text-blue-600" : "text-gray-700"}`}
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
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type={inputType}
                    className={`w-full pl-11 ${isPasswordField ? "pr-12" : "pr-4"} py-3.5 rounded-xl border transition-all duration-300 focus:outline-none ${
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
                        whileHover={{ scale: 1.1 }}
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
};
