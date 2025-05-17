"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "@/lib/i18n"
import { getWeatherData, getWeatherEmoji, formatTemperature } from "@/lib/weather-utils"
import type { Language } from "@/types"

interface WeatherProps {
  cityName: string;
  cityNameEn: string; // 영문명 추가
  isDarkMode?: boolean;
  language: Language;
}

interface WeatherState {
  temp: number;
  condition: string;
  emoji: string;
  loading: boolean;
  error: boolean;
}

export default function Weather({ cityName, cityNameEn, isDarkMode = false, language }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherState>({
    temp: 0,
    condition: '',
    emoji: '',
    loading: true,
    error: false,
  })

  const t = useTranslations(language)

  useEffect(() => {
    async function fetchWeather() {
      let apiKey: string | null = null;
      
      // localStorage를 우선적으로 확인 (클라이언트 사이드)
      if (typeof window !== 'undefined') {
        const storedApiKey = localStorage.getItem('world-clock-weather-api-key');
        if (storedApiKey !== null) {
          // localStorage에 값이 있으면 (빈 문자열이라도) 그것을 사용
          apiKey = storedApiKey.trim() || null;
        } else {
          // localStorage에 값이 없으면 환경변수 사용
          apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || null;
        }
      } else {
        // 서버사이드에서는 환경변수만 사용
        apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || null;
      }
      
      console.log('Weather API Key:', apiKey ? 'Present' : 'Missing');
      console.log('Fetching weather for city:', cityName, 'cityNameEn:', cityNameEn);
      
      // API 키가 없으면 날씨 표시하지 않음
      if (!apiKey) {
        console.warn('Weather API key not found. Skipping weather data.');
        setWeather(prev => ({ ...prev, loading: false, error: true }))
        return
      }

      // cityNameEn이 없거나 유효하지 않은 경우 처리
      const queryCity = cityNameEn || cityName || 'Seoul'
      if (!queryCity || queryCity === 'undefined') {
        console.warn('Invalid city name for weather API:', { cityName, cityNameEn });
        setWeather(prev => ({ ...prev, loading: false, error: true }))
        return
      }

      try {
        setWeather(prev => ({ ...prev, loading: true, error: false }))
        const data = await getWeatherData(queryCity) // 유효한 도시명 사용
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
  let hasApiKey = false;
  
  // localStorage를 우선 확인
  if (typeof window !== 'undefined') {
    const storedApiKey = localStorage.getItem('world-clock-weather-api-key');
    if (storedApiKey !== null) {
      // localStorage에 값이 있으면 (빈 문자열이라도) 그것을 사용
      hasApiKey = storedApiKey.trim() !== '';
    } else {
      // localStorage에 값이 없으면 환경변수 확인
      hasApiKey = !!(process.env.NEXT_PUBLIC_WEATHER_API_KEY && process.env.NEXT_PUBLIC_WEATHER_API_KEY.trim());
    }
  } else {
    // 서버사이드에서는 환경변수만 확인
    hasApiKey = !!(process.env.NEXT_PUBLIC_WEATHER_API_KEY && process.env.NEXT_PUBLIC_WEATHER_API_KEY.trim());
  }
  
  if (!hasApiKey) {
    console.log('Weather API key not found, not rendering weather component');
    return null;
  }

  if (weather.error) {
    // 개발 환경에서만 에러 표시
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`flex items-center justify-center gap-2 text-sm ${
          isDarkMode ? 'text-red-400' : 'text-red-500'
        }`}>
          <span>{t.weatherFailed}</span>
        </div>
      );
    }
    return null;
  }

  // 로딩 중
  if (weather.loading) {
    return (
      <div className={`flex items-center justify-center gap-3 text-base ${
        isDarkMode ? 'text-gray-400' : 'text-muted-foreground'
      }`}>
        <div className="relative">
          <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
          <div className="absolute inset-0 h-5 w-5 border-2 border-current border-b-transparent rounded-full animate-ping opacity-20"></div>
        </div>
        <span className="animate-pulse">{t.weatherLoading}</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-3 text-base ${
      isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      <span className="text-2xl" role="img" aria-label={weather.condition}>
        {weather.emoji}
      </span>
      <span className="font-semibold text-lg">
        {formatTemperature(weather.temp)}
      </span>
      <span className="text-sm font-medium">
        {weather.condition}
      </span>
    </div>
  )
}