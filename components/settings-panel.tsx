"use client"

import { useState } from "react"
import { Eye, EyeOff, ExternalLink } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations } from "@/lib/i18n"
import type { ClockDisplayType, TimeFormat, Language } from "@/types"

interface SettingsPanelProps {
  displayType: ClockDisplayType
  setDisplayType: (type: ClockDisplayType) => void
  timeFormat: TimeFormat
  setTimeFormat: (format: TimeFormat) => void
  autoDarkMode: boolean
  setAutoDarkMode: (enabled: boolean) => void
  weatherApiKey: string
  setWeatherApiKey: (apiKey: string) => void
  language: Language
  setLanguage: (language: Language) => void
}

export default function SettingsPanel({
  displayType,
  setDisplayType,
  timeFormat,
  setTimeFormat,
  autoDarkMode,
  setAutoDarkMode,
  weatherApiKey,
  setWeatherApiKey,
  language,
  setLanguage,
}: SettingsPanelProps) {
  const [apiKeyInput, setApiKeyInput] = useState(weatherApiKey)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeySaved, setApiKeySaved] = useState(false)
  
  const t = useTranslations(language)

  const handleSaveApiKey = () => {
    setWeatherApiKey(apiKeyInput)
    setApiKeySaved(true)
    setTimeout(() => setApiKeySaved(false), 3000) // 3초 후 메시지 숨김
  }

  const handleClearApiKey = () => {
    setApiKeyInput("")
    setWeatherApiKey("")
    // localStorage에 빈 문자열 명시적으로 저장
    localStorage.setItem('world-clock-weather-api-key', '')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.languageSettings}</CardTitle>
          <CardDescription>{t.languageSettingsDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>{t.language}</Label>
            <RadioGroup
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ko" id="korean" />
                <Label htmlFor="korean">{t.korean}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="english" />
                <Label htmlFor="english">{t.english}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.weatherSettings}</CardTitle>
          <CardDescription>{t.weatherSettingsDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weather-api-key">{t.weatherApiKey}</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="weather-api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder={t.enterApiKey}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showApiKey ? "Hide" : "Show"} API key
                  </span>
                </Button>
              </div>
              <Button 
                onClick={handleSaveApiKey} 
                disabled={!apiKeyInput.trim() || apiKeyInput === weatherApiKey}
              >
                {t.save}
              </Button>
              {weatherApiKey && (
                <Button 
                  variant="outline" 
                  onClick={handleClearApiKey}
                >
                  {t.clear}
                </Button>
              )}
            </div>
            {apiKeySaved && (
              <Alert className="mt-2">
                <AlertDescription>
                  {t.apiKeySaved}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>{t.getWeatherInfo}</p>
            <div className="flex items-center gap-2">
              <span>{t.getFreeKey}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-auto px-2 py-1 text-xs"
                onClick={() => window.open('https://www.weatherapi.com/signup.aspx', '_blank')}
              >
                WeatherAPI.com
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1 ml-2">
              {t.apiKeyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.displaySettings}</CardTitle>
          <CardDescription>{t.displaySettingsDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t.clockStyle}</Label>
            <RadioGroup
              value={displayType}
              onValueChange={(value) => setDisplayType(value as ClockDisplayType)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="digital" id="digital" />
                <Label htmlFor="digital">{t.digital}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="analog" id="analog" />
                <Label htmlFor="analog">{t.analog}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>{t.timeFormat}</Label>
            <RadioGroup
              value={timeFormat}
              onValueChange={(value) => setTimeFormat(value as TimeFormat)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="12h" id="12h" />
                <Label htmlFor="12h">{t.hour12}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="24h" id="24h" />
                <Label htmlFor="24h">{t.hour24}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.themeSettings}</CardTitle>
          <CardDescription>{t.themeSettingsDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-dark-mode">{t.autoDarkMode}</Label>
              <p className="text-sm text-muted-foreground">
                {t.autoDarkModeDesc}
              </p>
            </div>
            <Switch 
              id="auto-dark-mode" 
              checked={autoDarkMode} 
              onCheckedChange={setAutoDarkMode} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
//%%%%%%%%%%LAST%%%%%