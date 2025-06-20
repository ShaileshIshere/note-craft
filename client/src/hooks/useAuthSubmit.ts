import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { showToast } from "../utils/toast";

interface AuthSubmitProps {
    type: "signin" | "signup";
    setAuthorName: (name: string | null) => void;
    setAuthLoader: (loading: boolean) => void;
    navigate: (path: string) => void;
}

interface AuthData {
    name: string;
    email: string;
    password: string;
}

export const useAuthSubmit = ({
    type,
    setAuthorName,
    setAuthLoader,
    navigate,
}: AuthSubmitProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (data: AuthData) => {
        if (!data.email.trim()) {
            return "Email address is required";
        }
        if (!data.password.trim()) {
            return "Password is required";
        }
        if (type === "signup" && !data.name.trim()) {
            return "Full name is required";
        }
        return null;
    };

    const handleSubmit = async (data: AuthData) => {
        const error = validateForm(data);
        if (error) {
            showToast(error, true);
            return;
        }

        setAuthLoader(true);
        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                data,
            );

            const jwt = response.data.JWT_token;
            localStorage.setItem("token", jwt);

            const name = response.data.name;
            localStorage.setItem("authorName", name || "");
            setAuthorName(name);

            showToast(`Welcome to Notecraft, ${name || "there"}! 🎉`);

            navigate("/blogs");
        } catch (error: any) {
            // Handle network errors
            if (!error.response) {
                showToast(
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

            showToast(backendMessage, true);
        } finally {
            setIsSubmitting(false);
            setAuthLoader(false);
        }
    };

    return { handleSubmit, isSubmitting };
};
