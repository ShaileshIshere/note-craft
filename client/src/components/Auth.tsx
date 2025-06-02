import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@xlence/medium-blog";
import { useState, ChangeEvent } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { authLoader, userNameState } from "../hooks/userAtom";
import { useSetRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { AuthLoader } from "./AuthLoader";
import { AnimatedElement } from "./AnimatedElement";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
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
        password: false
    });

    // Enhanced icon mapping for backend error messages
    const getErrorIcon = (message: string): string => {
        const msg = message.toLowerCase();
        if (msg.includes('password') || msg.includes('incorrect')) return '🔒';
        if (msg.includes('email') || msg.includes('no account found')) return '📧';
        if (msg.includes('already exists') || msg.includes('account with this email')) return '👤';
        if (msg.includes('required') || msg.includes('fill')) return '📝';
        if (msg.includes('provide valid')) return '⚠️';
        if (msg.includes('unable to create') || msg.includes('unable to sign')) return '🚫';
        if (msg.includes('try again later')) return '⏰';
        return '❌';
    };

    // Enhanced toast with better styling
    const showAuthToast = (message: string, isError: boolean = false) => {
        toast.dismiss();
        
        const commonStyles = {
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            maxWidth: '450px',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '1.4'
        };
        
        if (!isError) {
            toast.success(message, {
                id: 'notecraft-toast',
                icon: '✨',
                style: {
                    ...commonStyles,
                    background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
                    color: '#065F46',
                    border: '1px solid #A7F3D0',
                },
                duration: 4000,
            });
        } else {
            const icon = getErrorIcon(message);
            toast.error(message, {
                id: 'notecraft-toast',
                icon,
                style: {
                    ...commonStyles,
                    background: 'linear-gradient(135deg, #FEF2F2 0%, #FEF7F7 100%)',
                    color: '#991B1B',
                    border: '1px solid #FCA5A5',
                },
                duration: 4000,
            });
        }
    };

    const sendReq = async () => {
        setAuthLoader(true);
        
        // Frontend validation for required fields (simple check)
        if ((type === "signup" && !(postInputs.name ?? "").trim()) || !(postInputs.email ?? "").trim() || !(postInputs.password ?? "").trim()) {
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
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.JWT_token;
            localStorage.setItem("token", jwt);

            const name = response.data.name;
            setAuthorName(name);
            
            // Success message
            showAuthToast(`Welcome to Notecraft, ${name || 'there'}! 🎉`);
            
            // Small delay for better UX
            setTimeout(() => {
                navigate('/blogs');
            }, 1000);
            
        } catch(error: any) {
            setAuthLoader(false);
            
            // Handle network errors
            if (!error.response) {
                showAuthToast("Connection failed. Please check your internet and try again", true);
                return;
            }
            
            // Extract error message directly from backend response
            const responseData = error.response.data;
            const backendMessage = responseData.message || responseData.error || "Something went wrong. Please try again";
            
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
                    maxWidth: '500px',
                }
            }}
        />
        <AuthLoader />
        <div className="h-screen flex justify-center flex-col bg-gradient-to-b from-white to-gray-50">
            <div className="flex justify-center">
                <div className="w-full max-w-md px-8 py-10 bg-white rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
                    <AnimatedElement>
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center space-x-2">
                                
                                {/* Project name with modern styling */}
                                <div className="font-medium text-4xl tracking-tight">
                                    <span className="text-gray-800 font-serif">note</span>
                                    <span className="text-blue-600 font-bold">craft</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={100}>
                        <h1 className="text-3xl font-serif font-bold text-center mb-2 text-gray-800">
                            {type === "signin" ? "Welcome Back" : "Join Our Community"}
                        </h1>
                        <p className="text-gray-600 text-center mb-6 font-serif italic">
                            {type === "signin" ? "Your stories await you" : "Start your writing journey"}
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={200}>
                        <div className="space-y-2 mb-6">
                            {type === "signup" && (
                                <LabelledInput 
                                    label="Name" 
                                    placeholder="Your name" 
                                    onFocus={() => setIsFocused({...isFocused, name: true})}
                                    onBlur={() => setIsFocused({...isFocused, name: false})}
                                    isFocused={isFocused.name}
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            name: e.target.value
                                        })
                                    }} 
                                />
                            )}
                            <LabelledInput 
                                label="Email" 
                                placeholder="Your email address"
                                onFocus={() => setIsFocused({...isFocused, email: true})}
                                onBlur={() => setIsFocused({...isFocused, email: false})}
                                isFocused={isFocused.email} 
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        email: e.target.value
                                    })
                                }} 
                            />
                            <LabelledInput 
                                label="Password" 
                                type="password" 
                                placeholder="Your password"
                                onFocus={() => setIsFocused({...isFocused, password: true})}
                                onBlur={() => setIsFocused({...isFocused, password: false})}
                                isFocused={isFocused.password}  
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        password: e.target.value
                                    })
                                }} 
                            />
                        </div>
                    </AnimatedElement>

                    <AnimatedElement delay={300}>
                        <button 
                            onClick={() => {
                                sendReq();
                            }} 
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {type === "signup" ? "Create Account" : "Sign In"}
                        </button>
                    </AnimatedElement>

                    <AnimatedElement delay={400}>
                        <div className="text-center mt-6 text-gray-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="ml-1 text-blue-600 hover:text-blue-800 font-medium transition-colors" to={type === "signin" ? "/signup" : "/"}
                            >
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </AnimatedElement>
                </div>
            </div>
        </div>
        </>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isFocused?: boolean;
    type?: string;
}

const LabelledInput = ({ label, placeholder, onChange, type, onFocus, onBlur, isFocused }: LabelledInputType) => {
    return (
        <div className="transition-all duration-300">
            <label className={`block mb-2 text-sm font-medium transition-all duration-300 ${isFocused ? 'text-blue-600' : 'text-gray-700'}`}>
                {label}
            </label>
            <input 
                onChange={onChange} 
                onFocus={onFocus}
                onBlur={onBlur}
                type={type || "text"} 
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none ${
                    isFocused 
                        ? 'border-blue-500 ring-2 ring-blue-100' 
                        : 'border-gray-300 hover:border-gray-400'
                }`} 
                placeholder={placeholder} 
                required 
            />
        </div>
    )
}