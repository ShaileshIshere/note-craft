import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useRecoilValue } from "recoil"
import { userNameState } from "../hooks/userAtom"

export const Appbar = () => {
  const authorName = useRecoilValue(userNameState)

  return (
    <div className="sticky top-0 z-50 backdrop-blur-3xl bg-white/20 border-b border-gray-200/50 flex justify-between items-center px-2 sm:px-20 py-4">
      <Link to={"/blogs"} className="flex items-center cursor-pointer">
        <div className="flex items-center space-x-2">
          <div className="font-medium text-4xl tracking-tight">
            <span className="text-gray-800 font-serif">note</span>
            <span className="text-blue-600 font-bold">craft</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        <Link to={`/publish`}>
          <button
            type="button"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create</span>
            </span>
          </button>
        </Link>
        <Avatar size={"big"} name={authorName || ""} />
      </div>
    </div>
  )
}
