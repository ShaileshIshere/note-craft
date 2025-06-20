import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useUserStore } from "../store/userStore";

export const Appbar = () => {
    const { username: authorName } = useUserStore();
    const { setUsername } = useUserStore();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Clear all localStorage items
        localStorage.clear();

        // Reset user state
        setUsername("");

        // Close dropdown
        setIsDropdownOpen(false);

        // Navigate to signin page
        navigate("/");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="sticky top-0 z-50 backdrop-blur-3xl bg-white/20 border-b border-gray-200/50 flex justify-between items-center px-2 sm:px-20 py-4">
            <Link to={"/blogs"} className="flex items-center cursor-pointer">
                <div className="flex items-center space-x-2">
                    <div className="font-medium text-4xl tracking-tight">
                        <span className="text-gray-800 font-serif">note</span>
                        <span className="text-blue-600 font-bold">craft</span>
                    </div>
                </div>
            </Link>

            <div className="flex items-center space-x-4">
                <Link to={`/publish`}>
                    <button
                        type="button"
                        className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <span className="flex items-center space-x-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span className="hidden md:block">Create</span>
                        </span>
                    </button>
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <img
                        src="https://res.cloudinary.com/ddu8stsgr/image/upload/v1750142708/userAvatar_alvm1b.jpg"
                        alt={authorName || "User Avatar"}
                        className="w-10 h-10 rounded-full object-cover border-1 border-black shadow-lg cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 transition-all duration-200"
                        onClick={toggleDropdown}
                    />

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-fit-screen bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            {/* User Info */}
                            <div className="px-4 py-2 border-b border-gray-100 cursor-default">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-900 truncate">
                                        {authorName || "User"}
                                    </span>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-gray-700 hover:text-red-600 transition-colors duration-150"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
