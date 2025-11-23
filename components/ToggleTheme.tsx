"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

type AnimationType = "circle-spread"

interface ToggleThemeProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  animationType?: AnimationType
}

export const ToggleTheme = ({
  className,
  duration = 400,
  animationType = "circle-spread",
  ...props
}: ToggleThemeProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top))

    if (animationType === "circle-spread") {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      )
    }
  }, [isDark, duration, animationType])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-full transition-colors duration-300 hover:bg-green-500/20",
          isDark ? "text-green-400" : "text-gray-700",
          className,
        )}
        aria-label="Toggle theme"
        {...props}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation: none;
              mix-blend-mode: normal;
            }
          `,
        }}
      />
    </>
  )
}
