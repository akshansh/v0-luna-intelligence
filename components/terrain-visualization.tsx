"use client"

import { useEffect, useRef } from "react"
import { useTime } from "@/components/time-provider"

interface TerrainVisualizationProps {
  progress: number
}

export function TerrainVisualization({ progress }: TerrainVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { timeOfDay } = useTime()

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

    // Get colors based on time of day
    const getColors = () => {
      switch (timeOfDay) {
        case "dawn":
          return {
            peak: "#5EEAD4",
            middle: "#0E7490",
            base: "#0D1B2A",
            snow: "#F8FAFC",
          }
        case "day":
          return {
            peak: "#17A2B8",
            middle: "#0E7490",
            base: "#0D1B2A",
            snow: "#F8FAFC",
          }
        case "dusk":
          return {
            peak: "#0E7490",
            middle: "#134E4A",
            base: "#0D1B2A",
            snow: "#F1F5F9",
          }
        case "night":
          return {
            peak: "#0F766E",
            middle: "#134E4A",
            base: "#0D1B2A",
            snow: "#E2E8F0",
          }
      }
    }

    const colors = getColors()

    // Calculate mountain height based on progress
    const maxHeight = canvas.height * 0.8
    const currentHeight = (progress / 100) * maxHeight

    // Draw terrain
    const drawTerrain = () => {
      const baseY = canvas.height
      const peakX = canvas.width / 2
      const peakY = baseY - currentHeight

      // Create multiple layers of mountains for depth
      for (let i = 3; i >= 0; i--) {
        const layerOffset = i * 20
        const layerHeight = currentHeight * (1 - i * 0.15)
        const layerPeakY = baseY - layerHeight
        const opacity = 1 - i * 0.2

        // Mountain gradient
        const gradient = ctx.createLinearGradient(0, layerPeakY, 0, baseY)
        gradient.addColorStop(0, i === 0 ? colors.peak : `rgba(14, 116, 144, ${opacity})`) // Peak color
        gradient.addColorStop(0.6, i === 0 ? colors.middle : `rgba(19, 78, 74, ${opacity})`) // Middle color
        gradient.addColorStop(1, colors.base) // Base color

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(0, baseY)

        // Create a more complex, natural-looking mountain range
        const points = 8
        const pointSpacing = canvas.width / points

        // First point is at the left edge
        ctx.lineTo(0, baseY - layerHeight * 0.3 + i * 10)

        // Generate random points for the mountain silhouette
        for (let p = 1; p < points; p++) {
          const x = p * pointSpacing
          const randomHeight = Math.random() * layerHeight * 0.4
          const y =
            p === Math.floor(points / 2)
              ? layerPeakY // Center peak
              : baseY - layerHeight * 0.3 - randomHeight + i * 10

          const cpx1 = x - pointSpacing * 0.5
          const cpy1 = y + Math.random() * 20 - 10

          ctx.quadraticCurveTo(cpx1, cpy1, x, y)
        }

        // Last point is at the right edge
        ctx.lineTo(canvas.width, baseY - layerHeight * 0.3 + i * 10)
        ctx.lineTo(canvas.width, baseY)
        ctx.closePath()
        ctx.fill()
      }

      // Add snow cap if progress is high enough
      if (progress > 60) {
        const snowCapHeight = currentHeight * 0.15
        const snowPeakY = peakY + snowCapHeight * 0.5

        ctx.fillStyle = colors.snow
        ctx.beginPath()
        ctx.moveTo(peakX - currentHeight * 0.2, peakY + snowCapHeight)

        // Create a more natural snow cap
        const snowPoints = 6
        const snowSpacing = (currentHeight * 0.4) / snowPoints

        for (let p = 0; p <= snowPoints; p++) {
          const x = peakX - currentHeight * 0.2 + p * snowSpacing
          const randomHeight = Math.random() * snowCapHeight * 0.3
          const y = p === Math.floor(snowPoints / 2) ? snowPeakY - randomHeight : peakY + snowCapHeight - randomHeight

          ctx.lineTo(x, y)
        }

        ctx.lineTo(peakX + currentHeight * 0.2, peakY + snowCapHeight)
        ctx.closePath()
        ctx.fill()
      }

      // Add topographical lines if progress is high enough
      if (progress > 40) {
        const numLines = Math.floor(progress / 10)
        const lineSpacing = currentHeight / numLines

        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
        ctx.lineWidth = 1

        for (let i = 1; i <= numLines; i++) {
          const lineY = baseY - i * lineSpacing
          const amplitude = 5 + i * 2

          ctx.beginPath()
          ctx.moveTo(peakX - currentHeight * 0.5, lineY)

          // Create wavy topographical lines
          for (let x = peakX - currentHeight * 0.5; x <= peakX + currentHeight * 0.5; x += 5) {
            const waviness = Math.sin(x * 0.05) * amplitude
            ctx.lineTo(x, lineY + waviness)
          }

          ctx.stroke()
        }
      }

      // Add Luna silhouette if progress is high enough
      if (progress > 85) {
        const lunaSize = currentHeight * 0.12
        const lunaX = peakX + currentHeight * 0.1
        const lunaY = peakY + currentHeight * 0.25

        // Draw Luna silhouette
        ctx.fillStyle = "#0D1B2A"
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

        // Add subtle spots if progress is complete
        if (progress > 95) {
          ctx.fillStyle = "rgba(23, 162, 184, 0.3)"

          // Create random spots
          for (let i = 0; i < 8; i++) {
            const spotX = lunaX + (Math.random() * lunaSize * 1.6 - lunaSize * 0.8)
            const spotY = lunaY + (Math.random() * lunaSize - lunaSize * 0.5)
            const spotSize = Math.random() * lunaSize * 0.15 + lunaSize * 0.05

            ctx.beginPath()
            ctx.ellipse(spotX, spotY, spotSize, spotSize * 0.8, 0, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    drawTerrain()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawTerrain()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [progress, timeOfDay])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
