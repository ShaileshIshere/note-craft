import { ReactNode, useEffect, useState } from "react";

interface AnimatedElementProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export const AnimatedElement = ({ 
    children, 
    delay = 0, 
    direction = "up" 
}: AnimatedElementProps) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(true);
        }, delay);
        
        return () => clearTimeout(timer);
    }, [delay]);
    
    const getTransform = () => {
        switch(direction) {
        case "up": return "translateY(20px)";
        case "down": return "translateY(-20px)";
        case "left": return "translateX(20px)";
        case "right": return "translateX(-20px)";
        }
    };
    
    return (
        <div 
        className="transition-all duration-700 ease-out"
        style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate(0)" : getTransform()
        }}
        >
        {children}
        </div>
    );
};