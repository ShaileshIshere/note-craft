import { useRecoilValue } from "recoil";
import { authLoader } from "../hooks/userAtom";
import { Spinner } from "./Spinner";

export const AuthLoader = () => {
    const isLoading = useRecoilValue(authLoader);

    return (
        <div>
            {isLoading && (
            <div className="fixed inset-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                {/* <div className="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 animate-spin border-t-blue-500"></div> */}
                <Spinner size="md" color="blue" />
                <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                <p className="px-3 w-full sm:w-1/3 text-center text-white">
                This may take a few seconds, please don't close this page.
                </p>
            </div>
            )}
        </div>
    );
}