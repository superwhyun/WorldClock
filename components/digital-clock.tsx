import type { DateTime } from "luxon"

interface DigitalClockProps {
  datetime: DateTime
  timeFormat: "12h" | "24h"
}

export default function DigitalClock({ datetime, timeFormat }: DigitalClockProps) {
  // Check if it's night time (9 PM to 7 AM)
  const hour = datetime.hour
  const isNightTime = hour >= 21 || hour < 7

  if (timeFormat === "12h") {
    const time = datetime.toFormat("hh:mm:ss")
    const period = datetime.toFormat("a")
    const isAM = period === "AM"

    return (
      <div className="flex justify-center items-center h-[180px] relative">
        <div className="relative">
          {/* AM/PM 상단 왼쪽에 위치 - 더 멀리 배치 */}
          <span className={`absolute -top-8 -left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
            isAM 
              ? isNightTime
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" 
                : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
              : isNightTime
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" 
                : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
          }`}>
            {period}
          </span>
          {/* 시간 표시 */}
          <span className={`text-5xl font-mono font-bold tabular-nums leading-none ${
            isNightTime ? "text-white" : "text-gray-900"
          }`}>
            {time}
          </span>
        </div>
      </div>
    )
  } else {
    const time = datetime.toFormat("HH:mm:ss")
    
    return (
      <div className="flex justify-center items-center h-[180px]">
        <span className={`text-5xl font-mono font-bold tabular-nums ${
          isNightTime ? "text-white" : "text-gray-900"
        }`}>
          {time}
        </span>
      </div>
    )
  }
}
//%%%%%%%%%%LAST%%%%%