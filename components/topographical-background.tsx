"use client"

import { useEffect, useRef } from "react"
import { useTime } from "@/components/time-provider"

export function TopographicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { timeOfDay, timePercentage } = useTime()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw topographical lines
    const drawTopography = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const numLines = 15
      const lineSpacing = canvas.height / numLines

      // Draw horizontal lines
      for (let i = 0; i < numLines; i++) {
        const y = i * lineSpacing
        const amplitude = 20 + (i % 3) * 10
        const frequency = 0.01 + (i % 5) * 0.002
        const timeOffset = timePercentage / 1000

        ctx.beginPath()
        ctx.moveTo(0, y)

        for (let x = 0; x < canvas.width; x += 2) {
          const noise1 = Math.sin(x * frequency + timeOffset) * amplitude
          const noise2 = Math.cos(x * frequency * 0.5 + timeOffset * 0.7) * amplitude * 0.5
          const noise = noise1 + noise2

          ctx.lineTo(x, y + noise)
        }

        ctx.strokeStyle = i % 2 === 0 ? "var(--topography-primary)" : "var(--topography-secondary)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw vertical lines
      const numVertLines = 20
      const vertLineSpacing = canvas.width / numVertLines

      for (let i = 0; i < numVertLines; i++) {
        const x = i * vertLineSpacing
        const amplitude = 15 + (i % 4) * 8
        const frequency = 0.01 + (i % 3) * 0.003
        const timeOffset = timePercentage / 800

        ctx.beginPath()
        ctx.moveTo(x, 0)

        for (let y = 0; y < canvas.height; y += 2) {
          const noise1 = Math.sin(y * frequency + timeOffset) * amplitude
          const noise2 = Math.cos(y * frequency * 0.6 + timeOffset * 0.5) * amplitude * 0.4
          const noise = noise1 + noise2

          ctx.lineTo(x + noise, y)
        }

        ctx.strokeStyle = i % 2 === 0 ? "var(--topography-secondary)" : "var(--topography-primary)"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    drawTopography()

    // Animate subtly
    let animationId: number
    const animate = () => {
      drawTopography()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [timeOfDay, timePercentage])

  return (
    <>
      {/* Gradient background based on time of day */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-20 time-transition"
        style={{
          background: `linear-gradient(to bottom, rgb(var(--bg-gradient-start)), rgb(var(--bg-gradient-end)))`,
        }}
      />

      {/* Overlay to adjust the mood */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-15 time-transition"
        style={{
          backgroundColor: `var(--bg-overlay)`,
          mixBlendMode: "multiply",
        }}
      />

      {/* Topographical lines */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
    </>
  )
}
