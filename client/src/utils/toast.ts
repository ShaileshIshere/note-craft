import toast from "react-hot-toast";

// Enhanced icon mapping for backend error messages
export const getErrorIcon = (message: string): string => {
    const msg = message.toLowerCase();
    if (msg.includes("password") || msg.includes("incorrect")) return "🔒";
    if (msg.includes("email") || msg.includes("no account found")) return "📧";
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
export const showToast = (message: string, isError = false) => {
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
                background: "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
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
                background: "linear-gradient(135deg, #FEF2F2 0%, #FEF7F7 100%)",
                color: "#991B1B",
                border: "1px solid #FCA5A5",
            },
            duration: 4000,
        });
    }
};
