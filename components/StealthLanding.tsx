"use client"

import { motion } from "framer-motion"

interface StealthLandingProps {
  onEnter: () => void
}

export default function StealthLanding({ onEnter }: StealthLandingProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-200"
      >
        <div className="text-xl font-bold">CodeLearn</div>
        <div className="hidden md:flex gap-8 items-center text-sm">
          <a href="#" className="hover:text-gray-600">
            Tutorials
          </a>
          <a href="#" className="hover:text-gray-600">
            Documentation
          </a>
          <a href="#" className="hover:text-gray-600">
            Examples
          </a>
          <a href="#" className="hover:text-gray-600">
            FAQ
          </a>
        </div>
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-black text-white rounded-full font-semibold text-sm"
        >
          Open Tool
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex items-center justify-center px-6 md:px-12 py-20 md:py-0"
      >
        <div className="max-w-4xl w-full space-y-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Learn Web Development the Right Way</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Master modern web technologies with interactive tutorials, real-world examples, and hands-on practice.
              Start your coding journey today.
            </p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-full font-semibold text-lg"
            >
              Start Coding Now
            </motion.button>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-200"
          >
            {[
              { title: "Interactive Editor", desc: "Write, run, and debug code in real-time" },
              { title: "Live Feedback", desc: "Get instant feedback as you learn" },
              { title: "Best Practices", desc: "Learn industry standards and patterns" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="space-y-2 p-4"
              >
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border-t border-gray-200 px-6 md:px-12 py-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {["Product", "Learn", "Resources", "Company"].map((section, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-bold text-sm">{section}</h4>
              {["Link One", "Link Two", "Link Three"].map((link, j) => (
                <a key={j} href="#" className="block text-sm text-gray-600 hover:text-black">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© 2025 CodeLearn. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}
