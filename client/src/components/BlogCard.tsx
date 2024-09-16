import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}

export const BlogCard = ({
    id,
    authorName, 
    publishedDate,
    title, 
    content
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar size="small" name={authorName} />
                <div className="font-medium pl-2 text-md flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-normal text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-lg font-normal text-slate-500">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-400 text-sm font-normal pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}