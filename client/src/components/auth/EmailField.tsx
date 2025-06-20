import { useState, memo } from "react";
import { FormInput } from "./FormInput";

export const EmailField = memo(
    ({ onValueChange }: { onValueChange: (value: string) => void }) => {
        const [value, setValue] = useState("");

        const handleChange = (newValue: string) => {
            setValue(newValue);
            onValueChange(newValue);
        };

        return (
            <FormInput
                label="Email Address"
                placeholder="Enter your email"
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                }
            />
        );
    },
);
