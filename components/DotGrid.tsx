"use client"

import { useEffect, useRef } from "react"

interface DotGridProps {
  dotColor?: string
  hoverColor?: string
  dotSize?: number
  spacing?: number
}

export default function DotGrid({
  dotColor = "rgba(255, 255, 255, 0.1)",
  hoverColor = "rgb(34, 197, 94)",
  dotSize = 2,
  spacing = 30,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const dots: { x: number; y: number; scale: number; targetScale: number }[] = []

    for (let x = spacing / 2; x < canvas.width; x += spacing) {
      for (let y = spacing / 2; y < canvas.height; y += spacing) {
        dots.push({ x, y, scale: 1, targetScale: 1 })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      dots.forEach((dot) => {
        const dx = mouseX - dot.x
        const dy = mouseY - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          dot.targetScale = 1 + (1 - distance / 100) * 2
        } else {
          dot.targetScale = 1
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dots.forEach((dot) => {
        dot.scale += (dot.targetScale - dot.scale) * 0.1

        const isHovered = dot.scale > 1.1

        ctx.fillStyle = isHovered ? hoverColor : dotColor
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize * dot.scale, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [dotColor, hoverColor, dotSize, spacing])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
