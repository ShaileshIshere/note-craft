import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <RecoilRoot>
                <BrowserRouter>
                    <Toaster position="top-center" reverseOrder={true} />
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Signin />} />
                        <Route path="/blog/:id" element={<Blog />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/publish" element={<Publish />} />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </>
    );
}

export default App;
