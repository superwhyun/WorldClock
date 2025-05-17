"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Droplets, Wind, Cloud } from "lucide-react"
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { getForecastData, getWeatherEmoji } from "@/lib/weather-utils"
import { useTranslations } from "@/lib/i18n"
import { MAJOR_CITIES } from "@/lib/city-data"
import type { Language } from "@/types"

interface WeatherDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cityName: string
  cityNameEn: string
  timezone: string
  language: Language
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      code: number;
    };
  };
  hour: Array<{
    time: string;
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
    chance_of_rain: number;
  }>;
}

interface ForecastData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export default function WeatherDetailDialog({ 
  open, 
  onOpenChange, 
  cityName, 
  cityNameEn, 
  timezone,
  language 
}: WeatherDetailDialogProps) {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const t = useTranslations(language)

  useEffect(() => {
    if (open && cityNameEn) {
      fetchForecastData()
    }
  }, [open, cityNameEn])

  const fetchForecastData = async () => {
    setLoading(true)
    setError(false)
    
    try {
      const data = await getForecastData(cityNameEn)
      if (data) {
        setForecastData(data)
      } else {
        setError(true)
      }
    } catch (error) {
      console.error('Error fetching forecast:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return language === 'ko' ? '오늘' : 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return language === 'ko' ? '내일' : 'Tomorrow'
    } else {
      return language === 'ko' 
        ? date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })
    }
  }

  const formatHour = (timeString: string) => {
    // 해당 도시의 시간대로 변환
    const date = new Date(timeString)
    return language === 'ko' 
      ? date.toLocaleTimeString('ko-KR', { 
          hour: 'numeric', 
          hour12: true,
          timeZone: timezone
        })
      : date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true,
          timeZone: timezone
        })
  }

  // 해당 도시의 현재 시간을 가져오는 함수
  const getCityCurrentTime = () => {
    return new Date().toLocaleString('en-US', { timeZone: timezone })
  }

  // 시간별 예보 차트 데이터 준비
  const prepareHourlyChartData = () => {
    if (!forecastData) return []
    
    // 현재 시간을 해당 도시의 시간대로 변환
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    const cityTimeString = formatter.format(now).replace(',', '')
    const cityNow = new Date(cityTimeString)
    
    console.log('City now:', cityTimeString, cityNow)
    
    const allHours = forecastData.forecast.forecastday[0].hour
    
    // WeatherAPI의 hour.time은 이미 해당 지역의 로컬 시간
    const filteredHours = allHours.filter((hour) => {
      const hourTime = new Date(hour.time)
      
      // 현재 시간 이후이고 당일 23:59까지
      return hourTime >= cityNow && hourTime.getDate() === cityNow.getDate()
    })
    
    console.log(`Showing ${filteredHours.length} hours from ${allHours.length} total`)
    
    return filteredHours.map((hour) => ({
      time: formatHour(hour.time),
      fullTime: hour.time,
      temp: Math.round(hour.temp_c),
      chanceOfRain: hour.chance_of_rain,
      emoji: getWeatherEmoji(hour.condition.code),
      condition: hour.condition.text
    }))
  }

  const chartData = prepareHourlyChartData()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t.weatherDetail} - {cityName}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="relative">
              <div className="animate-spin h-8 w-8 border-2 border-current border-t-transparent rounded-full"></div>
              <div className="absolute inset-0 h-8 w-8 border-2 border-current border-b-transparent rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="ml-3">{t.weatherLoading}</span>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>{t.weatherFailed}</p>
          </div>
        )}

        {forecastData && !loading && !error && (
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">
                    {Math.round(forecastData.current.temp_c)}°C
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {forecastData.current.condition.text}
                  </div>
                </div>
                <div className="text-4xl">
                  {getWeatherEmoji(forecastData.current.condition.code)}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  {t.humidity}: {forecastData.current.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4" />
                  {t.windSpeed}: {Math.round(forecastData.current.wind_kph)}km/h
                </span>
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {t.threeDayForecast}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {forecastData.forecast.forecastday.map((day, index) => (
                  <div 
                    key={day.date} 
                    className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="text-xs font-medium mb-1">{formatDate(day.date)}</div>
                    <div className="text-xl mb-1">
                      {getWeatherEmoji(day.day.condition.code)}
                    </div>
                    <div className="text-sm font-semibold">
                      {Math.round(day.day.maxtemp_c)}°/{Math.round(day.day.mintemp_c)}°
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {day.day.condition.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Hourly Forecast Chart */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">{t.hourlyForecast}</h3>
              {chartData.length > 0 ? (
                <div className="space-y-2">
                  {/* Weather Icons */}
                  <div className="flex justify-between items-center mb-2">
                    {chartData.map((hour, index) => (
                      <div key={index} className="text-center min-w-0">
                        <div className="text-lg">
                          {hour.emoji}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart */}
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11 }}
                        />
                        <YAxis 
                          yAxisId="left"
                          domain={[0, 100]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11 }}
                          label={{ value: t.rainChance + ' (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11 }}
                          label={{ value: t.temperature + ' (°C)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="chanceOfRain" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                          activeDot={{ r: 5, fill: '#1d4ed8' }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="temp" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                          activeDot={{ r: 5, fill: '#dc2626' }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-6 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>{t.rainChance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>{t.temperature}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>{t.noHourlyData}</p>
                </div>
              )}
            </div>

            {/* Close button */}
            <div className="pt-2">
              <Button onClick={() => onOpenChange(false)} className="w-full">
                {t.closeWeather}
              </Button>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
//%%%%%%%%%%LAST%%%%%