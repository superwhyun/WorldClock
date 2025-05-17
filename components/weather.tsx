"use client"

import { useState, useEffect } from "react"
import { getWeatherData, getWeatherEmoji, formatTemperature } from "@/lib/weather-utils"

interface WeatherProps {
  cityName: string;
  cityNameEn: string; // 영문명 추가
  isDarkMode?: boolean;
}

interface WeatherState {
  temp: number;
  condition: string;
  emoji: string;
  loading: boolean;
  error: boolean;
}

export default function Weather({ cityName, cityNameEn, isDarkMode = false }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherState>({
    temp: 0,
    condition: '',
    emoji: '',
    loading: true,
    error: false,
  })

  useEffect(() => {
    async function fetchWeather() {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      console.log('Weather API Key:', apiKey ? 'Present' : 'Missing');
      console.log('Fetching weather for:', cityName);
      
      // API 키가 없으면 날씨 표시하지 않음
      if (!apiKey) {
        console.warn('Weather API key not found. Skipping weather data.');
        setWeather(prev => ({ ...prev, loading: false, error: true }))
        return
      }

      try {
        setWeather(prev => ({ ...prev, loading: true, error: false }))
        const data = await getWeatherData(cityNameEn) // 영문명 사용
        console.log('Weather data received:', data);
        
        if (data) {
          setWeather({
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            emoji: getWeatherEmoji(data.current.condition.code),
            loading: false,
            error: false,
          })
        } else {
          console.warn('No weather data received for:', cityName);
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
  }, [cityName, cityNameEn])

  // API 키가 없거나 에러가 발생한 경우 표시하지 않음
  if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
    console.log('Weather API key not found, not rendering weather component');
    return null;
  }

  if (weather.error) {
    // 개발 환경에서만 에러 표시
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`flex items-center justify-center gap-2 text-xs ${
          isDarkMode ? 'text-red-400' : 'text-red-500'
        }`}>
          <span>날씨 로딩 실패</span>
        </div>
      );
    }
    return null;
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