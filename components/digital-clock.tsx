import type { DateTime } from "luxon"

interface DigitalClockProps {
  datetime: DateTime
  timeFormat: "12h" | "24h"
}

export default function DigitalClock({ datetime, timeFormat }: DigitalClockProps) {
  const format = timeFormat === "12h" ? "hh:mm:ss a" : "HH:mm:ss"
  const time = datetime.toFormat(format)

  // Check if it's night time (9 PM to 7 AM)
  const hour = datetime.hour
  const isNightTime = hour >= 21 || hour < 7

  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className={`text-5xl font-mono font-semibold tabular-nums ${isNightTime ? "text-white" : ""}`}>{time}</div>
    </div>
  )
}
