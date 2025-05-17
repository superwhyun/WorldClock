"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { DateTime } from "luxon"
import { Clock, Settings, Share2 } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import ClockDisplay from "@/components/clock-display"
import CountrySelector from "@/components/city-selector"
import SettingsPanel from "@/components/settings-panel"
import ShareDialog from "@/components/share-dialog"
import { useClockStore } from "@/lib/clock-store"
import { useTranslations } from "@/lib/i18n"
import { generateShareUrl } from "@/lib/share-utils"

export default function WorldClock() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("clocks")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const { toast } = useToast()

  const {
    clocks,
    addClock,
    removeClock,
    updateClockLabel,
    reorderClocks,
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
    isLoading,
  } = useClockStore()

  const t = useTranslations(language)

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Check if it's nighttime (between 8 PM and 6 AM local time)
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }

    if (autoDarkMode) {
      const checkDarkMode = () => {
        const hour = DateTime.local().hour
        if ((hour >= 20 || hour < 6) && theme !== "dark") {
          setTheme("dark")
        } else if (hour >= 6 && hour < 20 && theme !== "light") {
          setTheme("light")
        }
      }

      checkDarkMode()
      const interval = setInterval(checkDarkMode, 60000) // Check every minute

      return () => clearInterval(interval)
    }
  }, [mounted, theme, setTheme, autoDarkMode])

  const handleAddClock = (timezone: string, countryCode: string, cityName: string, cityNameEn: string, countryName: string) => {
    if (clocks.length < 8) {
      addClock(timezone, countryCode, cityName, cityNameEn, countryName)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      reorderClocks(active.id as string, over.id as string)
    }
  }

  const handleShare = () => {
    if (clocks.length === 0) {
      toast({
        title: t.noClocks,
        description: t.noClockDesc,
        variant: "destructive",
      })
      return
    }

    setShareDialogOpen(true)
  }

  const shareUrl = generateShareUrl(clocks)

  if (!mounted) {
    return null // 클라이언트 사이드 렌더링이 완료될 때까지 아무것도 표시하지 않음
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Clock className="h-10 w-10 text-blue-600" />
            {t.worldClock}
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
              <Share2 className="h-4 w-4" />
              <span>{t.share}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setActiveTab(activeTab === "settings" ? "clocks" : "settings")}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">{t.settings}</span>
            </Button>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="clocks" className="px-6 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">{t.clocks}</TabsTrigger>
          <TabsTrigger value="settings" className="px-6 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700">{t.settings}</TabsTrigger>
        </TabsList>

        <TabsContent value="clocks" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={clocks.map((clock) => clock.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {clocks.map((clock) => (
                      <ClockDisplay
                        key={clock.id}
                        clock={clock}
                        displayType={displayType}
                        timeFormat={timeFormat}
                        language={language}
                        onRemove={() => removeClock(clock.id)}
                        onLabelChange={(label) => updateClockLabel(clock.id, label)}
                      />
                    ))}

                    {clocks.length < 8 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center min-h-[225px] transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500">
                        <CountrySelector onSelect={handleAddClock} language={language} />
                      </div>
                    )}
                  </div>
                </SortableContext>
              </DndContext>

              {clocks.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">{t.firstClock}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t.firstClockDesc}
                  </p>
                  <CountrySelector onSelect={handleAddClock} language={language} />
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel
            displayType={displayType}
            setDisplayType={setDisplayType}
            timeFormat={timeFormat}
            setTimeFormat={setTimeFormat}
            autoDarkMode={autoDarkMode}
            setAutoDarkMode={setAutoDarkMode}
            weatherApiKey={weatherApiKey}
            setWeatherApiKey={setWeatherApiKey}
            language={language}
            setLanguage={setLanguage}
          />
        </TabsContent>
      </Tabs>

      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} shareUrl={shareUrl} language={language} />
    </div>
  )
}
