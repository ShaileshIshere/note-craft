import { useEffect, useState } from "react";
import { AnimatedElement } from "./AnimatedElement";

const quotes = [
    { text: "The scariest moment is always just before you start.", author: "Stephen King" },
    { text: "Write what should not be forgotten.", author: "Isabel Allende" },
    { text: "A word after a word after a word is power.", author: "Margaret Atwood" }
];

export const Quote = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setQuoteIndex((prev) => (prev + 1) % quotes.length);
                setFadeIn(true);
            }, 1000);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-stone-50 to-indigo-50 p-8">
            <div className="max-w-xl relative">
                {/* Classic page texture */}
                <div className="absolute inset-0 bg-[url('data:image/png;base64,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') opacity-10 mix-blend-multiply"></div>
                
                {/* Decorative book icon */}
                <AnimatedElement delay={100}>
                    <div className="mb-8 flex justify-center">
                        <div className="w-14 h-14 relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-sm rotate-12 transform-gpu"></div>
                            <div className="absolute inset-0 bg-blue-200 rounded-sm rotate-6 transform-gpu"></div>
                            <div className="absolute inset-0 bg-blue-300 rounded-sm transform-gpu flex items-center justify-center">
                                <span className="text-blue-700 text-xl">📖</span>
                            </div>
                        </div>
                    </div>
                </AnimatedElement>
                
                <div 
                    className="transition-all duration-1000 ease-in-out relative z-10 p-8 border-l-4 border-blue-400"
                    style={{ opacity: fadeIn ? 1 : 0 }}
                >
                    <h2 className="text-4xl font-serif leading-tight tracking-tight mb-8 text-gray-800 relative z-10">{quotes[quoteIndex].text}</h2>
                    
                    <div className="flex items-center">
                        <div className="h-px w-10 bg-gray-300 mr-3"></div>
                        <p className="text-xl text-gray-600 font-serif">— {quotes[quoteIndex].author}</p>
                    </div>
                    
                    {/* Small decorative corner flourish */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20">
                        <div className="absolute bottom-0 right-0 w-12 h-1 bg-blue-300"></div>
                        <div className="absolute bottom-0 right-0 h-12 w-1 bg-blue-300"></div>
                    </div>
                </div>
                
                <AnimatedElement direction="left" delay={300}>
                    <div className="mt-12 flex justify-center">
                        <div className="inline-flex space-x-2">
                            {quotes.map((_, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => {
                                        setFadeIn(false);
                                        setTimeout(() => {
                                            setQuoteIndex(i);
                                            setFadeIn(true);
                                        }, 500);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        i === quoteIndex ? 'bg-blue-600 scale-125' : 'bg-blue-200 hover:bg-blue-300'
                                    }`}
                                    aria-label={`View quote ${i+1}`}
                                />
                            ))}
                        </div>
                    </div>
                </AnimatedElement>
            </div>
        </div>
    );
};