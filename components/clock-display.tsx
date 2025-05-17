"use client"

import { useState, useEffect } from "react"
import { DateTime } from "luxon"
import { X, Edit2, Check, GripVertical, Sun } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AnalogClock from "@/components/analog-clock"
import { useTranslations, formatDate } from "@/lib/i18n"
import DigitalClock from "@/components/digital-clock"
import Weather from "@/components/weather"
import WeatherDetailDialog from "@/components/weather-detail-dialog"
import type { Clock, ClockDisplayType, TimeFormat, Language } from "@/types"

interface ClockDisplayProps {
  clock: Clock
  displayType: ClockDisplayType
  timeFormat: TimeFormat
  language: Language
  onRemove: () => void
  onLabelChange: (label: string) => void
}

// Add a function to check if it's nighttime in the given timezone
const isNightTime = (datetime: DateTime) => {
  const hour = datetime.hour
  return hour >= 21 || hour < 7
}

export default function ClockDisplay({ clock, displayType, timeFormat, language, onRemove, onLabelChange }: ClockDisplayProps) {
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now().setZone(clock.timezone))
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState(clock.label || clock.cityName)
  const [isDST, setIsDST] = useState(false)
  const [weatherDialogOpen, setWeatherDialogOpen] = useState(false)

  const t = useTranslations(language)

  // Set up sortable
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: clock.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  useEffect(() => {
    const updateTime = () => {
      const now = DateTime.now().setZone(clock.timezone)
      setCurrentTime(now)
      setIsDST(now.isInDST)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [clock.timezone])

  const handleSaveLabel = () => {
    onLabelChange(label)
    setEditing(false)
  }

  const getTimeDifference = () => {
    const localTime = DateTime.local()
    const diff = currentTime.offset - localTime.offset
    const hours = Math.abs(Math.floor(diff / 60))
    const minutes = Math.abs(diff % 60)

    let result = ""
    if (hours > 0) result += `${hours}h `
    if (minutes > 0) result += `${minutes}m`

    if (result === "") return t.sameTime
    return `${diff > 0 ? "+" : "-"} ${result.trim()}`
  }

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isNightTime(currentTime) 
          ? "bg-gray-900 text-white shadow-md hover:shadow-gray-700/25" 
          : "shadow-md hover:shadow-gray-400/25"
      }`}>
        <CardHeader className={`pb-2 relative ${isNightTime(currentTime) ? "border-gray-700" : ""}`}>
          <div className="flex items-center justify-between">
            {editing ? (
              <div className="flex items-center gap-2 w-full">
                <Input value={label} onChange={(e) => setLabel(e.target.value)} className="h-8" autoFocus />
                <Button size="icon" variant="ghost" onClick={handleSaveLabel}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200 group"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
                  </div>
                  <img
                    src={`https://flagcdn.com/w20/${clock.countryCode.toLowerCase()}.png`}
                    width="20"
                    height="15"
                    alt={`${clock.countryName} flag`}
                    className="rounded-sm"
                  />
                  <CardTitle className="text-lg font-medium">{clock.label || clock.cityName}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-6 w-6 ${isNightTime(currentTime) ? "hover:bg-gray-800" : ""}`}
                    onClick={() => setEditing(true)}
                  >
                    <Edit2 className="h-3 w-3" />
                    <span className="sr-only">Edit label</span>
                  </Button>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className={`h-6 w-6 absolute top-3 right-3 ${isNightTime(currentTime) ? "hover:bg-gray-800" : ""}`}
                  onClick={onRemove}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove clock</span>
                </Button>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${isNightTime(currentTime) ? "text-gray-400" : "text-muted-foreground"}`}
          >
            <span>{clock.countryName}</span>
            <span>•</span>
            <span>{currentTime.toFormat("ZZZZ")}</span>
            <span>•</span>
            <span>{getTimeDifference()}</span>
            {isDST && (
              <>
                <span>•</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="secondary"
                        className={`text-xs h-5 px-1 flex items-center gap-1 ${
                          isNightTime(currentTime) ? "bg-amber-800 text-amber-200" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        <Sun className="h-3 w-3" />
                        DST
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.dstTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <div className="py-1">
            {displayType === "analog" ? (
              <AnalogClock datetime={currentTime} />
            ) : (
              <DigitalClock datetime={currentTime} timeFormat={timeFormat} />
            )}
            <div
              className={`text-center mt-2 text-base font-medium ${
                isNightTime(currentTime) ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {formatDate(currentTime.toJSDate(), language)}
            </div>
            
            {/* Weather Information */}
            <div className="mt-3">
              <Weather 
                cityName={clock.cityName} 
                cityNameEn={clock.cityNameEn}
                isDarkMode={isNightTime(currentTime)}
                language={language}
                onWeatherClick={() => setWeatherDialogOpen(true)}
              />
            </div>
          </div>
        </CardContent>

        {/* Weather Detail Dialog */}
        <WeatherDetailDialog
          open={weatherDialogOpen}
          onOpenChange={setWeatherDialogOpen}
          cityName={clock.cityName}
          cityNameEn={clock.cityNameEn}
          timezone={clock.timezone}
          language={language}
        />
      </Card>
    </div>
  )
}
