"use client"

import { useState, useEffect } from "react"
import { getWeatherData, getWeatherEmoji, formatTemperature } from "@/lib/weather-utils"

interface WeatherProps {
  cityName: string;
  isDarkMode?: boolean;
}

interface WeatherState {
  temp: number;
  condition: string;
  emoji: string;
  loading: boolean;
  error: boolean;
}

export default function Weather({ cityName, isDarkMode = false }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherState>({
    temp: 0,
    condition: '',
    emoji: '',
    loading: true,
    error: false,
  })

  useEffect(() => {
    async function fetchWeather() {
      // API 키가 없으면 날씨 표시하지 않음
      if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
        setWeather(prev => ({ ...prev, loading: false, error: true }))
        return
      }

      try {
        setWeather(prev => ({ ...prev, loading: true, error: false }))
        const data = await getWeatherData(cityName)
        
        if (data) {
          setWeather({
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            emoji: getWeatherEmoji(data.current.condition.code),
            loading: false,
            error: false,
          })
        } else {
          setWeather(prev => ({ ...prev, loading: false, error: true }))
        }
      } catch (error) {
        console.error(`Weather fetch error for ${cityName}:`, error)
        setWeather(prev => ({ ...prev, loading: false, error: true }))
      }
    }

    fetchWeather()
    
    // 10분마다 날씨 정보 업데이트
    const interval = setInterval(fetchWeather, 600000)
    return () => clearInterval(interval)
  }, [cityName])

  // API 키가 없거나 에러가 발생한 경우 표시하지 않음
  if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY || weather.error) {
    return null
  }

  // 로딩 중
  if (weather.loading) {
    return (
      <div className={`flex items-center justify-center gap-2 text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-muted-foreground'
      }`}>
        <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full"></div>
        <span>날씨 정보 로딩 중...</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-2 text-sm ${
      isDarkMode ? 'text-gray-300' : 'text-muted-foreground'
    }`}>
      <span className="text-lg" role="img" aria-label={weather.condition}>
        {weather.emoji}
      </span>
      <span className="font-medium">
        {formatTemperature(weather.temp)}
      </span>
      <span className="text-xs">
        {weather.condition}
      </span>
    </div>
  )
}