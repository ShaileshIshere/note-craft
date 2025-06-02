export const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-800 relative overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%234F46E5%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>
            
            <footer className="relative z-10">
                <div className="mx-auto w-full max-w-screen-xl px-6 py-16 lg:py-24">
                    {/* Main footer content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                        
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <div className="font-medium text-4xl tracking-tight mb-4 group cursor-pointer">
                                    <span className="text-gray-800 font-serif transition-all duration-300 group-hover:text-gray-900">note</span>
                                    <span className="text-blue-600 font-bold transition-all duration-300 group-hover:text-blue-700">craft</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed max-w-md text-lg">
                                    Capture, organize, and share your thoughts with noteCraft. Transform your ideas into beautifully crafted stories and connect with readers worldwide.
                                </p>
                            </div>
                            
                            {/* Stats or Features */}
                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-blue-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
                                    <div className="text-sm text-gray-500">Writers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">50K+</div>
                                    <div className="text-sm text-gray-500">Articles</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">100K+</div>
                                    <div className="text-sm text-gray-500">Readers</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative">
                                Quick Links
                                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded-full"></span>
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'About Us', href: '#' },
                                    { name: 'Write', href: '#' },
                                    { name: 'Explore', href: '#' },
                                    { name: 'Help Center', href: '#' },
                                    { name: 'Privacy Policy', href: '#' },
                                    { name: 'Terms of Service', href: '#' }
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1 inline-block"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect & Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative">
                                Stay Connected
                                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded-full"></span>
                            </h3>
                            
                            {/* Social Links */}
                            <div className="mb-8">
                                <p className="text-gray-600 mb-4 text-sm">Follow us on social media</p>
                                <div className="flex space-x-4">
                                    {[
                                        {
                                        href: 'https://discord.gg/RRm8MT5Q',
                                        icon: (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 21 16">
                                                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                                            </svg>
                                        )
                                    },
                                    {
                                        href: 'https://x.com/_justShailesh',
                                        icon: (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 17">
                                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                                            </svg>
                                        )
                                    },
                                    {
                                        href: 'https://github.com/ShaileshIshere',
                                        icon: (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                                            </svg>
                                        )
                                    }].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            {/* <div>
                                <p className="text-gray-600 mb-4 text-sm">Subscribe to our newsletter</p>
                                <form
                                    className="flex flex-col gap-3"
                                    onSubmit={e => e.preventDefault()}
                                >
                                    <input
                                        type="email"
                                        className="px-4 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div> */}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-16 pt-8 border-t border-blue-200">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            
                            {/* Copyright */}
                            <div className="text-gray-500 text-sm text-center lg:text-left">
                                © 2024 
                                <span className="font-medium text-4xl tracking-tight mx-2">
                                    <span className="text-gray-800 font-serif">note</span>
                                    <span className="text-blue-600 font-bold">craft</span>
                                </span>
                                All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>   
            </footer>
        </div>
    );
};