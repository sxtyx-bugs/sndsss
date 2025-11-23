"use client"

import { useState } from "react"
import { ChevronRight, Home } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"

const topicsList = [
  "HTML HOME",
  "HTML Introduction",
  "HTML Editors",
  "HTML Basic",
  "HTML Elements",
  "HTML Attributes",
  "HTML Headings",
  "HTML Paragraphs",
  "HTML Styles",
  "HTML Formatting",
  "HTML Quotations",
  "HTML Comments",
  "HTML Colors",
  "HTML CSS",
  "HTML Links",
  "HTML Images",
  "HTML Tables",
  "HTML Lists",
  "HTML Block & Inline",
  "HTML Div",
  "HTML Classes",
  "HTML Id",
  "HTML Iframes",
  "HTML JavaScript",
  "HTML File Paths",
  "HTML Head",
  "HTML Layout",
  "HTML Responsive",
]

interface CodeVaultLandingProps {
  onEnter: () => void
}

export default function CodeVaultLanding({ onEnter }: CodeVaultLandingProps) {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Navigation Bar */}
      <nav className="bg-[#1a1a1a] border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-6">
            <div className="text-white font-bold text-xl tracking-wide">
              CodeVault
              <button onClick={onEnter} className="text-green-400 hover:text-green-300 transition-colors">
                HTML
              </button>{" "}
              Reference
            </div>
          </div>
          <button className="px-4 py-1.5 bg-gray-700 text-white text-sm font-semibold rounded cursor-default">
            Access
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#111] border-r border-gray-800 min-h-[calc(100vh-48px)] overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-white font-bold text-lg mb-3">HTML Tutorial</h2>
            </div>
            <nav className="space-y-0.5">
              {topicsList.map((topic, index) => (
                <button
                  key={topic}
                  onClick={index === 0 ? onEnter : undefined}
                  onMouseEnter={() => setHoveredTopic(topic)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    index === 0
                      ? "bg-green-600 text-white font-semibold cursor-pointer"
                      : hoveredTopic === topic
                        ? "bg-gray-800 text-white cursor-default"
                        : "text-gray-400 cursor-default"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#0a0a0a] min-h-[calc(100vh-48px)] overflow-y-auto">
          {/* Breadcrumb Navigation */}
          <div className="bg-[#111] border-b border-gray-800 px-8 py-3 flex items-center gap-2 text-sm">
            <Home className="w-4 h-4 text-green-400" />
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-400">HTML Tutorial</span>
          </div>

          {/* Hero Content */}
          <div className="max-w-5xl mx-auto px-8 py-12">
            {/* Main Title with Animation */}
            <ScrollReveal
              size="2xl"
              align="left"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.08}
              containerClassName="mb-8"
              textClassName="text-white font-bold tracking-tight"
            >
              HTML Tutorial
            </ScrollReveal>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mb-12">
              <button className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-white font-semibold rounded cursor-default">
                <ChevronRight className="w-4 h-4 rotate-180" />
                Home
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-white font-semibold rounded cursor-default">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-white mb-8">Learn HTML</h1>

            {/* Description Text */}
            <div className="space-y-4 mb-12 text-gray-300 text-lg">
              <p>HTML is the standard markup language for Web pages.</p>
              <p>With HTML you can create your own Website.</p>
              <p>HTML is easy to learn - You will enjoy it!</p>
              <p>
                HTML stands for <span className="text-red-400">H</span>yper <span className="text-red-400">T</span>ext{" "}
                <span className="text-red-400">M</span>arkup <span className="text-red-400">L</span>anguage and is the
                backbone of all web pages.
              </p>
            </div>

            {/* CTA Boxes */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Tutorial Box */}
              <div className="bg-[#d9f0d8] rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-black mb-4">HTML Tutorial</h3>
                <p className="text-black mb-6">
                  Study our HTML Tutorial for free,
                  <br />
                  no registration needed.
                </p>
                <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded cursor-default inline-flex items-center gap-2">
                  Learn HTML Now »
                </button>
              </div>

              {/* Course Box */}
              <div className="bg-[#fff4cc] rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-black mb-4">HTML Course + Certificate</h3>
                <p className="text-black mb-6">
                  Upgrade your learning with our
                  <br />
                  interactive HTML Course and Get Certified.
                </p>
                <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded cursor-default inline-flex items-center gap-2">
                  + Upgrade to our HTML Course
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-10 bg-gray-800 rounded overflow-hidden">
                <div className="h-full w-1/12 bg-green-600"></div>
              </div>
            </div>

            {/* Tip Section */}
            <div className="mb-12 p-4 bg-[#fff4cc] rounded text-black">
              <p>
                <strong>Tip:</strong>{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign in
                </a>{" "}
                to track your progress - it's free.
              </p>
            </div>

            {/* Learning by Examples Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Learning by Examples</h2>
              <p className="text-gray-300 text-lg mb-4">
                With our "Try it Yourself" editor, you can edit the HTML code and view the result in the browser:
              </p>

              {/* Code Example Box */}
              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg overflow-hidden mb-6">
                <div className="bg-[#0f0f0f] px-4 py-2 border-b border-gray-700 text-white font-semibold">Example</div>
                <div className="p-6">
                  <pre className="text-gray-300 font-mono text-sm leading-relaxed">
                    <code>
                      <span className="text-gray-500">&lt;!DOCTYPE html&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;html&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;head&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;title&gt;</span>Page Title
                      <span className="text-red-400">&lt;/title&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;/head&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;body&gt;</span>
                      {"\n\n"}
                      <span className="text-red-400">&lt;h1&gt;</span>This is a Heading
                      <span className="text-red-400">&lt;/h1&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;p&gt;</span>This is a paragraph.
                      <span className="text-red-400">&lt;/p&gt;</span>
                      {"\n\n"}
                      <span className="text-red-400">&lt;/body&gt;</span>
                      {"\n"}
                      <span className="text-red-400">&lt;/html&gt;</span>
                    </code>
                  </pre>
                </div>
                <div className="bg-[#0f0f0f] px-4 py-3 border-t border-gray-700">
                  <button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded cursor-default">
                    Try it Yourself »
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-sm">Click on the "Try it Yourself" button to see how it works.</p>
            </div>

            {/* What is HTML Section */}
            <div className="mb-12">
              <ScrollReveal size="xl" align="left" containerClassName="mb-6" textClassName="text-white font-bold">
                What is HTML?
              </ScrollReveal>
              <ul className="space-y-3 text-gray-300 text-lg list-disc list-inside">
                <li>HTML stands for Hyper Text Markup Language</li>
                <li>HTML is the standard markup language for creating Web pages</li>
                <li>HTML describes the structure of a Web page</li>
                <li>HTML consists of a series of elements</li>
                <li>HTML elements tell the browser how to display the content</li>
                <li>HTML elements label pieces of content such as "this is a heading", "this is a paragraph", etc.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
