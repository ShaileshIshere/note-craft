import { useState, memo } from "react";
import { FormInput } from "./FormInput";

export const NameField = memo(
    ({ onValueChange }: { onValueChange: (value: string) => void }) => {
        const [value, setValue] = useState("");

        const handleChange = (newValue: string) => {
            setValue(newValue);
            onValueChange(newValue);
        };

        return (
            <FormInput
                label="Full Name"
                placeholder="Enter your name"
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                }
            />
        );
    },
);
