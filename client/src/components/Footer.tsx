"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Heart } from "lucide-react"

export const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-white overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Keep the prominent grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

        {/* Enhanced floating orbs with more blur */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-indigo-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-300/25 rounded-full blur-[80px]"></div>
        <div className="absolute top-10 right-1/3 w-28 h-28 bg-purple-200/20 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-cyan-200/15 rounded-full blur-[90px]"></div>
      </div>

      <footer className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-16">
            {/* Brand Section - Enhanced */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-10">
                {/* Logo with enhanced styling */}
                <motion.div
                  className="font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-800 font-serif transition-all duration-300 group-hover:text-gray-900">
                    note
                  </span>
                  <span className="text-blue-600 font-bold transition-all duration-300 group-hover:text-blue-700">
                    craft
                  </span>
                </motion.div>

                <p className="text-gray-600 leading-relaxed max-w-lg text-lg mb-8">
                  Capture, organize, and share your thoughts with noteCraft. Transform your ideas into beautifully
                  crafted stories and connect with readers worldwide.
                </p>

                {/* Call to action */}
                <motion.button
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Writing Today
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
              </div>

              {/* Enhanced Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 border-t border-blue-100/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "10K+", label: "Writers", color: "text-blue-600" },
                  { number: "50K+", label: "Articles", color: "text-indigo-600" },
                  { number: "100K+", label: "Readers", color: "text-purple-600" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`text-3xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-8 text-gray-800 relative">
                Quick Links
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "6.5rem" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h3>
              <ul className="space-y-5">
                {[
                  { name: "About Us", href: "#" },
                  { name: "Write", href: "#" },
                  { name: "Explore", href: "#" },
                  { name: "Help Center", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-all duration-300 inline-flex items-center group font-medium"
                      whileHover={{ x: 8 }}
                    >
                      <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full"></span>
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Connect & Social - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-8 text-gray-800 relative">
                Stay Connected
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "8.5rem" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                ></motion.span>
              </h3>

              {/* Social Links - Keep the quick hover effects */}
              <div className="mb-10">
                <p className="text-gray-600 mb-6 font-medium">Follow us on social media</p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[
                    {
                      href: "https://discord.gg/RRm8MT5Q",
                      name: "Discord",
                      color: "hover:bg-indigo-50 hover:text-indigo-600",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 21 16">
                          <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://x.com/_justShailesh",
                      name: "Twitter",
                      color: "hover:bg-blue-50 hover:text-blue-600",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 17">
                          <path
                            fillRule="evenodd"
                            d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ),
                    },
                    {
                      href: "https://github.com/ShaileshIshere",
                      name: "GitHub",
                      color: "hover:bg-gray-50 hover:text-gray-800",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ),
                    },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      className={`group relative p-3 sm:p-4 text-gray-400 ${social.color} rounded-xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50 hover:shadow-lg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.1 }}
                      viewport={{ once: true }}
                    >
                      {social.icon}

                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        {social.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Newsletter signup - Fixed Layout */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50">
                <h4 className="font-semibold text-gray-800 mb-3">Stay Updated</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest articles and updates delivered to your inbox.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                  <motion.button
                    type="submit"
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 text-sm shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe to Newsletter
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Section */}
          <motion.div
            className="mt-20 pt-10 border-t border-gradient-to-r from-transparent via-blue-200/50 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              {/* Copyright with enhanced styling */}
              <div className="hidden lg:flex text-gray-500 text-sm text-center lg:text-left items-center gap-2">
                <span>© 2024</span>
                <span className="font-medium text-2xl tracking-tight">
                  <span className="text-gray-800 font-serif">note</span>
                  <span className="text-blue-600 font-bold">craft</span>
                </span>
                <span>• Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>by Shailesh Kandari</span>
                <span>• All Rights Reserved</span>
              </div>

              {/* Back to top button */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">Back to top</span>
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
