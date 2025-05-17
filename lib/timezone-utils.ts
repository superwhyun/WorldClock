"use client"

import { DateTime } from "luxon"
import type { Country } from "@/types"

// List of countries with their timezones
// This is a simplified list - in a production app, you might want to use a more comprehensive database
const COUNTRIES_DATA: Country[] = [
  { name: "United States", code: "US", timezone: "America/New_York" },
  { name: "United Kingdom", code: "GB", timezone: "Europe/London" },
  { name: "Japan", code: "JP", timezone: "Asia/Tokyo" },
  { name: "Australia", code: "AU", timezone: "Australia/Sydney" },
  { name: "Germany", code: "DE", timezone: "Europe/Berlin" },
  { name: "France", code: "FR", timezone: "Europe/Paris" },
  { name: "Canada", code: "CA", timezone: "America/Toronto" },
  { name: "China", code: "CN", timezone: "Asia/Shanghai" },
  { name: "India", code: "IN", timezone: "Asia/Kolkata" },
  { name: "Brazil", code: "BR", timezone: "America/Sao_Paulo" },
  { name: "Russia", code: "RU", timezone: "Europe/Moscow" },
  { name: "South Africa", code: "ZA", timezone: "Africa/Johannesburg" },
  { name: "Mexico", code: "MX", timezone: "America/Mexico_City" },
  { name: "Spain", code: "ES", timezone: "Europe/Madrid" },
  { name: "Italy", code: "IT", timezone: "Europe/Rome" },
  { name: "South Korea", code: "KR", timezone: "Asia/Seoul" },
  { name: "Netherlands", code: "NL", timezone: "Europe/Amsterdam" },
  { name: "Sweden", code: "SE", timezone: "Europe/Stockholm" },
  { name: "Switzerland", code: "CH", timezone: "Europe/Zurich" },
  { name: "Singapore", code: "SG", timezone: "Asia/Singapore" },
  { name: "New Zealand", code: "NZ", timezone: "Pacific/Auckland" },
  { name: "Israel", code: "IL", timezone: "Asia/Jerusalem" },
  { name: "United Arab Emirates", code: "AE", timezone: "Asia/Dubai" },
  { name: "Argentina", code: "AR", timezone: "America/Argentina/Buenos_Aires" },
  { name: "Thailand", code: "TH", timezone: "Asia/Bangkok" },
  { name: "Egypt", code: "EG", timezone: "Africa/Cairo" },
  { name: "Norway", code: "NO", timezone: "Europe/Oslo" },
  { name: "Denmark", code: "DK", timezone: "Europe/Copenhagen" },
  { name: "Finland", code: "FI", timezone: "Europe/Helsinki" },
  { name: "Ireland", code: "IE", timezone: "Europe/Dublin" },
]

// Get all countries with timezone information
export async function getCountries(): Promise<Country[]> {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(COUNTRIES_DATA.sort((a, b) => a.name.localeCompare(b.name)))
    }, 500)
  })
}

// Check if a timezone is currently observing DST
export function isInDST(timezone: string): boolean {
  return DateTime.now().setZone(timezone).isInDST
}

// Get the current UTC offset for a timezone
export function getUTCOffset(timezone: string): string {
  return DateTime.now().setZone(timezone).toFormat("ZZZZ")
}

// Get the time difference between two timezones in minutes
export function getTimeDifference(timezone1: string, timezone2: string): number {
  const time1 = DateTime.now().setZone(timezone1)
  const time2 = DateTime.now().setZone(timezone2)
  return time1.offset - time2.offset
}
