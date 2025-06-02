import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { motion } from "motion/react";
import { useState } from "react";
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
    // Generate a consistent random profile image based on author name
    const getProfileImageUrl = (name: string) => {
        // Use a simple hash function to get a consistent seed from the name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash + name.charCodeAt(i)) & 0xffffffff;
        }
        const seed = Math.abs(hash) % 1000;
        return `https://picsum.photos/150/150?random=${seed}`;
    };
    const [isHovered, setIsHovered] = useState(false);

    return <Link to={`/blog/${id}`}>
        <article 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative py-2 border-b border-gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-50/50 hover:border-gray-300 h-[15rem] flex flex-col  justify-center">
            {/* Left border line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 transform scale-y-0 transition-transform duration-300 ease-in-out group-hover:scale-y-100 origin-top"></div>
            
            <div className="h-full flex items-center justify-center gap-8 max-w-4xl pl-4">
                {/* Content Section */}
                <div className="flex-1 min-w-0 ">
                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight transition-colors duration-300 ease-in-out group-hover:text-blue-600 capitalize">
                        {title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-base mb-4 line-clamp-3 leading-relaxed transition-colors duration-300 ease-in-out group-hover:text-gray-500 capitalize">
                        {content.slice(0, 150)}...
                    </p>

                    {/* Author Info - moved below content */}
                    <div className="flex items-center mb-4 transition-all duration-300 ease-in-out">
                        <Avatar 
                            size="small" 
                            name={authorName} 
                            imageUrl={getProfileImageUrl(authorName)}
                        />
                        <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 transition-colors duration-300 capitalize">{authorName}</div>
                            <div className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-400 capitalize">{publishedDate} · {`${Math.ceil(content.length / 100)} min read`}</div>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex-shrink-0 h-full flex items-center justify-center overflow-hidden">
                    <motion.div 
                        className="bg-gray-200 rounded-lg overflow-hidden relative"
                        initial={{ width: "8rem", height: "8rem" }}
                        animate={{ 
                            width: isHovered ? "18rem" : "8rem", 
                            height: isHovered ? "14rem" : "8rem" 
                        }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                            duration: 0.8
                        }}
                        style={{
                            willChange: "width, height"
                        }}
                    >
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent z-10 pointer-events-none"></div> */}
                        <img 
                            src={`https://picsum.photos/200/200?random=${id}`}
                            alt={title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                </div>
            </div>
        </article>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-400 mx-2"></div>
}

export function BookmarkIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600 transition-colors duration-300 group-hover:text-blue-600">
            <path d="M3 2.5C3 1.67157 3.67157 1 4.5 1H11.5C12.3284 1 13 1.67157 13 2.5V14L8 11L3 14V2.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
    )
}

export function MoreIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600 transition-colors duration-300 group-hover:text-blue-600">
            <circle cx="8" cy="3" r="1" fill="currentColor"/>
            <circle cx="8" cy="8" r="1" fill="currentColor"/>
            <circle cx="8" cy="13" r="1" fill="currentColor"/>
        </svg>
    )
}