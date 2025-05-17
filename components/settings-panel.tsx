"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ClockDisplayType, TimeFormat } from "@/types"

interface SettingsPanelProps {
  displayType: ClockDisplayType
  setDisplayType: (type: ClockDisplayType) => void
  timeFormat: TimeFormat
  setTimeFormat: (format: TimeFormat) => void
  autoDarkMode: boolean
  setAutoDarkMode: (enabled: boolean) => void
}

export default function SettingsPanel({
  displayType,
  setDisplayType,
  timeFormat,
  setTimeFormat,
  autoDarkMode,
  setAutoDarkMode,
}: SettingsPanelProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize how your clocks are displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Clock Style</Label>
            <RadioGroup
              value={displayType}
              onValueChange={(value) => setDisplayType(value as ClockDisplayType)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="digital" id="digital" />
                <Label htmlFor="digital">Digital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="analog" id="analog" />
                <Label htmlFor="analog">Analog</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Time Format</Label>
            <RadioGroup
              value={timeFormat}
              onValueChange={(value) => setTimeFormat(value as TimeFormat)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="12h" id="12h" />
                <Label htmlFor="12h">12-hour (AM/PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="24h" id="24h" />
                <Label htmlFor="24h">24-hour</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the appearance of the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-dark-mode">Automatic Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Automatically switch to dark mode at night (8 PM - 6 AM)</p>
            </div>
            <Switch id="auto-dark-mode" checked={autoDarkMode} onCheckedChange={setAutoDarkMode} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
