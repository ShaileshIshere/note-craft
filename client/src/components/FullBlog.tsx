import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-3 sm:px-10 w-full pt-4 sm:pt-12 max-w-screen-xl flex-wrap">
                <div className="col-span-12 sm:col-span-4 sm:order-last">
                    <div className="text-slate-600 text-lg pb-2 sm:pb-0">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-lg sm:text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500 hidden sm:block">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="col-span-12 sm:col-span-8 pt-5">
                    <div className="text-3xl font-bold sm:text-5xl sm:font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2 text-sm sm:text-lg">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
            </div>
        </div>
    </div>
}