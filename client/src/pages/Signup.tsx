import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen overflow-hidden">
            <div>
                <Auth type="signup" />
            </div>
            <div className="hidden lg:block relative">
                <Quote />
                <div className="absolute bottom-4 left-4 text-xs text-gray-500">© 2025 Medium Blog. All rights reserved.</div>
            </div>
        </div>
    );
}