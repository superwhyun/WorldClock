"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Clock, ClockDisplayType, TimeFormat } from "@/types"
import { urlParamToClocks, getClockParamFromUrl } from "./share-utils"

// Define the store state
interface ClockStore {
  clocks: Clock[]
  displayType: ClockDisplayType
  timeFormat: TimeFormat
  autoDarkMode: boolean
  isLoading: boolean
  addClock: (timezone: string, countryCode: string, countryName: string) => void
  removeClock: (id: string) => void
  updateClockLabel: (id: string, label: string) => void
  reorderClocks: (activeId: string, overId: string) => void
  setDisplayType: (type: ClockDisplayType) => void
  setTimeFormat: (format: TimeFormat) => void
  setAutoDarkMode: (enabled: boolean) => void
  setClocks: (clocks: Clock[]) => void
}

// Local storage keys
const STORAGE_KEYS = {
  CLOCKS: "world-clock-clocks",
  DISPLAY_TYPE: "world-clock-display-type",
  TIME_FORMAT: "world-clock-time-format",
  AUTO_DARK_MODE: "world-clock-auto-dark-mode",
}

export function useClockStore(): ClockStore {
  // Initialize state with default values
  const [clocks, setClocks] = useState<Clock[]>([])
  const [displayType, setDisplayTypeState] = useState<ClockDisplayType>("digital")
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>("12h")
  const [autoDarkMode, setAutoDarkModeState] = useState<boolean>(true)
  const [initialized, setInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load state from URL parameters or localStorage on component mount
  useEffect(() => {
    if (typeof window === "undefined") return

    const initializeClocks = async () => {
      try {
        setIsLoading(true)

        // 먼저 URL 파라미터 확인
        const clockParam = getClockParamFromUrl()

        if (clockParam) {
          // URL 파라미터가 있으면 그것을 사용
          const clocksFromUrl = await urlParamToClocks(clockParam)
          if (clocksFromUrl.length > 0) {
            setClocks(clocksFromUrl)

            // 다른 설정은 localStorage에서 로드
            loadOtherSettings()
            setInitialized(true)
            setIsLoading(false)
            return
          }
        }

        // URL 파라미터가 없거나 유효하지 않으면 localStorage 사용
        const savedClocks = localStorage.getItem(STORAGE_KEYS.CLOCKS)
        if (savedClocks) {
          setClocks(JSON.parse(savedClocks))
        }

        loadOtherSettings()
        setInitialized(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing clocks:", error)
        setIsLoading(false)
      }
    }

    const loadOtherSettings = () => {
      // Load display type
      const savedDisplayType = localStorage.getItem(STORAGE_KEYS.DISPLAY_TYPE)
      if (savedDisplayType) {
        setDisplayTypeState(savedDisplayType as ClockDisplayType)
      }

      // Load time format
      const savedTimeFormat = localStorage.getItem(STORAGE_KEYS.TIME_FORMAT)
      if (savedTimeFormat) {
        setTimeFormatState(savedTimeFormat as TimeFormat)
      }

      // Load auto dark mode
      const savedAutoDarkMode = localStorage.getItem(STORAGE_KEYS.AUTO_DARK_MODE)
      if (savedAutoDarkMode !== null) {
        setAutoDarkModeState(savedAutoDarkMode === "true")
      }
    }

    initializeClocks()
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!initialized || typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEYS.CLOCKS, JSON.stringify(clocks))
      localStorage.setItem(STORAGE_KEYS.DISPLAY_TYPE, displayType)
      localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, timeFormat)
      localStorage.setItem(STORAGE_KEYS.AUTO_DARK_MODE, String(autoDarkMode))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }, [clocks, displayType, timeFormat, autoDarkMode, initialized])

  // Add a new clock
  const addClock = (timezone: string, countryCode: string, countryName: string) => {
    const newClock: Clock = {
      id: uuidv4(),
      timezone,
      countryCode,
      countryName,
      label: "",
    }
    setClocks((prevClocks) => [...prevClocks, newClock])
  }

  // Remove a clock
  const removeClock = (id: string) => {
    setClocks((prevClocks) => prevClocks.filter((clock) => clock.id !== id))
  }

  // Update a clock's label
  const updateClockLabel = (id: string, label: string) => {
    setClocks((prevClocks) => prevClocks.map((clock) => (clock.id === id ? { ...clock, label } : clock)))
  }

  // Reorder clocks (for drag and drop)
  const reorderClocks = (activeId: string, overId: string) => {
    setClocks((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId)
      const newIndex = items.findIndex((item) => item.id === overId)

      if (oldIndex === -1 || newIndex === -1) return items

      const newItems = [...items]
      const [removed] = newItems.splice(oldIndex, 1)
      newItems.splice(newIndex, 0, removed)

      return newItems
    })
  }

  // Set display type
  const setDisplayType = (type: ClockDisplayType) => {
    setDisplayTypeState(type)
  }

  // Set time format
  const setTimeFormat = (format: TimeFormat) => {
    setTimeFormatState(format)
  }

  // Set auto dark mode
  const setAutoDarkMode = (enabled: boolean) => {
    setAutoDarkModeState(enabled)
  }

  // Set clocks directly (for URL parameter loading)
  const setClocksDirect = (newClocks: Clock[]) => {
    setClocks(newClocks)
  }

  return {
    clocks,
    displayType,
    timeFormat,
    autoDarkMode,
    isLoading,
    addClock,
    removeClock,
    updateClockLabel,
    reorderClocks,
    setDisplayType,
    setTimeFormat,
    setAutoDarkMode,
    setClocks: setClocksDirect,
  }
}
