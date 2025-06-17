import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer";

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

export const Layout = ({ children, showFooter = true }: LayoutProps) => {
    const { pathname } = useLocation();

    // Scroll to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {children}
            {showFooter && <Footer />}
        </>
    );
};