import { useState, memo } from "react";
import { FormInput } from "./FormInput";

export const PasswordField = memo(
    ({ onValueChange }: { onValueChange: (value: string) => void }) => {
        const [value, setValue] = useState("");

        const handleChange = (newValue: string) => {
            setValue(newValue);
            onValueChange(newValue);
        };

        return (
            <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={value}
                onChange={handleChange}
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
            />
        );
    },
);
