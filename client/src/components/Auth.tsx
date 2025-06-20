"use client";

import { useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useUserStore } from "../store/userStore";
import { CreativeLoader } from "./CreativeLoader";
import { AuthLogo } from "./auth/AuthLogo";
import { AuthHeader } from "./auth/AuthHeader";
import { AuthButton } from "./auth/AuthButton";
import { NameField } from "./auth/NameField";
import { EmailField } from "./auth/EmailField";
import { PasswordField } from "./auth/PasswordField";
import { useAuthSubmit } from "../hooks/useAuthSubmit";

export const Auth = memo(({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();

    // Form state will now be managed by the individual field components
    let formData = {
        name: "",
        email: "",
        password: "",
    };

    // Stable callback references using useCallback
    const updateName = useCallback((value: string) => {
        formData.name = value;
    }, []);

    const updateEmail = useCallback((value: string) => {
        formData.email = value;
    }, []);

    const updatePassword = useCallback((value: string) => {
        formData.password = value;
    }, []);

    // Zustand selectors - properly optimized
    const setAuthorName = useUserStore((state) => state.setUsername);
    const setAuthLoader = useUserStore((state) => state.setAuthLoader);

    // Extract auth logic to a custom hook
    const { handleSubmit, isSubmitting } = useAuthSubmit({
        type,
        setAuthorName,
        setAuthLoader,
        navigate,
    });

    // Submit handler
    const onSubmit = useCallback(() => {
        handleSubmit(formData);
    }, [handleSubmit]);

    return (
        <>
            <Toaster position="top-center" />
            <CreativeLoader />

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
                            <AuthLogo />
                            <AuthHeader type={type} />

                            <motion.div
                                className="space-y-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {type === "signup" && (
                                    <NameField onValueChange={updateName} />
                                )}

                                <EmailField onValueChange={updateEmail} />
                                <PasswordField onValueChange={updatePassword} />

                                <AuthButton
                                    onClick={onSubmit}
                                    isSubmitting={isSubmitting}
                                    type={type}
                                />
                            </motion.div>

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
});
