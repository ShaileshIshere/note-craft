import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useRecoilValue } from "recoil"
import { userNameState } from "../hooks/userAtom"

export const Appbar = () => {
    const authorName = useRecoilValue(userNameState);

    return <div className="border-b flex justify-between px-2 sm:px-20 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-xl">
            Medium
        </Link>
        <div className="flex justify-center">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-black bg-zinc-200 hover:bg-zinc-300 hover:border-black focus:outline-none focus:ring-1 focus:ring-black font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar size={"big"} name={authorName || ""} />
       </div>
    </div>
}