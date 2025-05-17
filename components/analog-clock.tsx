"use client"

import { useEffect, useRef } from "react"
import type { DateTime } from "luxon"

interface AnalogClockProps {
  datetime: DateTime
}

export default function AnalogClock({ datetime }: AnalogClockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawClock = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(centerX, centerY) - 10

      // Check if it's night time for this clock
      const hour = datetime.hour
      const isNightTime = hour >= 21 || hour < 7

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw clock face with conditional colors
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fillStyle = isNightTime ? "#1f2937" : "white"
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = isNightTime ? "#9ca3af" : "#333"
      ctx.stroke()

      // Draw hour markers with conditional colors
      ctx.lineWidth = 2
      ctx.strokeStyle = isNightTime ? "#9ca3af" : "#333"
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6
        const x1 = centerX + (radius - 10) * Math.sin(angle)
        const y1 = centerY - (radius - 10) * Math.cos(angle)
        const x2 = centerX + radius * Math.sin(angle)
        const y2 = centerY - radius * Math.cos(angle)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Get time components
      const minute = datetime.minute
      const second = datetime.second

      // Draw hour hand with conditional colors
      const hourAngle = ((hour % 12) + minute / 60) * (Math.PI / 6)
      const hourHandLength = radius * 0.5
      ctx.lineWidth = 4
      ctx.strokeStyle = isNightTime ? "#e5e7eb" : "#333"
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + hourHandLength * Math.sin(hourAngle), centerY - hourHandLength * Math.cos(hourAngle))
      ctx.stroke()

      // Draw minute hand with conditional colors
      const minuteAngle = minute * (Math.PI / 30)
      const minuteHandLength = radius * 0.7
      ctx.lineWidth = 2
      ctx.strokeStyle = isNightTime ? "#d1d5db" : "#666"
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + minuteHandLength * Math.sin(minuteAngle), centerY - minuteHandLength * Math.cos(minuteAngle))
      ctx.stroke()

      // Draw second hand
      const secondAngle = second * (Math.PI / 30)
      const secondHandLength = radius * 0.8
      ctx.lineWidth = 1
      ctx.strokeStyle = "#f00"
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + secondHandLength * Math.sin(secondAngle), centerY - secondHandLength * Math.cos(secondAngle))
      ctx.stroke()

      // Draw center dot
      ctx.beginPath()
      ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
      ctx.fillStyle = "#f00"
      ctx.fill()
    }

    drawClock()
  }, [datetime])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={200} height={200} className="max-w-full" />
    </div>
  )
}
