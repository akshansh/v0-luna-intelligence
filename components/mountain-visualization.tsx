"use client"

import { useEffect, useRef } from "react"

interface MountainVisualizationProps {
  progress: number
}

export function MountainVisualization({ progress }: MountainVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate mountain height based on progress
    const maxHeight = canvas.height * 0.8
    const currentHeight = (progress / 100) * maxHeight

    // Draw mountain
    const drawMountain = () => {
      const baseY = canvas.height
      const peakX = canvas.width / 2
      const peakY = baseY - currentHeight

      // Mountain gradient
      const gradient = ctx.createLinearGradient(0, peakY, 0, baseY)
      gradient.addColorStop(0, "#17A2B8") // Digital Teal at peak
      gradient.addColorStop(0.6, "#2E3A59") // Shadow Slate for middle
      gradient.addColorStop(1, "#0D1B2A") // Luna Navy at base

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(0, baseY)

      // Left side of mountain
      ctx.quadraticCurveTo(peakX * 0.5, baseY - currentHeight * 0.7, peakX, peakY)

      // Right side of mountain
      ctx.quadraticCurveTo(peakX * 1.5, baseY - currentHeight * 0.6, canvas.width, baseY)

      ctx.closePath()
      ctx.fill()

      // Add snow cap if progress is high enough
      if (progress > 60) {
        const snowCapHeight = currentHeight * 0.2

        ctx.fillStyle = "#E5EDEF" // Birch Silver for snow
        ctx.beginPath()
        ctx.moveTo(peakX - currentHeight * 0.15, peakY + snowCapHeight)
        ctx.quadraticCurveTo(peakX, peakY - snowCapHeight * 0.2, peakX + currentHeight * 0.15, peakY + snowCapHeight)
        ctx.quadraticCurveTo(peakX, peakY + snowCapHeight * 0.8, peakX - currentHeight * 0.15, peakY + snowCapHeight)
        ctx.closePath()
        ctx.fill()
      }

      // Add Luna silhouette if progress is high enough
      if (progress > 85) {
        const lunaSize = currentHeight * 0.15
        const lunaX = peakX + currentHeight * 0.1
        const lunaY = peakY + currentHeight * 0.3

        // Draw Luna silhouette
        ctx.fillStyle = "#0D1B2A" // Luna Navy
        ctx.beginPath()

        // Body
        ctx.ellipse(lunaX, lunaY, lunaSize, lunaSize * 0.5, 0, 0, Math.PI * 2)

        // Head
        ctx.moveTo(lunaX + lunaSize * 0.8, lunaY - lunaSize * 0.2)
        ctx.arc(lunaX + lunaSize, lunaY - lunaSize * 0.3, lunaSize * 0.4, 0, Math.PI * 2)

        // Tail
        ctx.moveTo(lunaX - lunaSize * 0.8, lunaY)
        ctx.quadraticCurveTo(
          lunaX - lunaSize * 1.2,
          lunaY - lunaSize * 0.5,
          lunaX - lunaSize * 1.5,
          lunaY - lunaSize * 0.2,
        )

        ctx.fill()
      }
    }

    drawMountain()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawMountain()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [progress])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
