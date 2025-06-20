import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation();

    // Scroll to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {children}
            <Footer />
        </>
    );
};
