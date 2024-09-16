import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@xlence/medium-blog";
import { useState, ChangeEvent } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { authLoader, userNameState } from "../hooks/userAtom";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import { AuthLoader } from "./AuthLoader";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const setAuthorName = useSetRecoilState(userNameState);
    const setAuthLoader = useSetRecoilState(authLoader);

    const sendReq = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.JWT_token;
            localStorage.setItem("token", jwt);

            // Assuming the name is part of the response
            const name = response.data.name;
            setAuthorName(name); // Update the Recoil state
            navigate('/blogs');
            toast.success("thanks for showing up here");
        } catch(error) {
            if(postInputs.email === "" && postInputs.password === "")
                toast.error("Please fill in the necessary details");
            else if(postInputs.password === "")
                toast.error("please fill up the password field")
            else if(postInputs.email === "")
                toast.error("please fill up the email field")
        }
    }

    return ( 
        <>
        <AuthLoader />
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-2 sm:px-10">
                        <div className="text-2xl sm:text-4xl font-extrabold">
                            {type === "signin" ? "Welcome Back Writter" : "Create Your Account"}
                        </div>
                        <div className="text-slate-500 text-sm sm:text-md text-center mt-2">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                            <Link className="pl-1 underline hover:text-black" to={type === "signin" ? "/signup" : "/"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4 sm:pt-8">
                        {type === "signup" ? <LabelledInput label="Name" placeholder="enter your name" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelledInput label="email" placeholder="enter your email" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="enter your password" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={() => {
                            setAuthLoader(true);
                            sendReq();
                        }} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
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
    type?: string;
}

const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return <div>
        <label className="block mb-2 text-md text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}