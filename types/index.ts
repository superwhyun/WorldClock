// Clock display type
export type ClockDisplayType = "analog" | "digital"

// Time format
export type TimeFormat = "12h" | "24h"

// Clock object
export interface Clock {
  id: string
  timezone: string
  countryCode: string
  cityName: string
  cityNameEn: string
  countryName: string
  label: string
}

// Country object
export interface Country {
  name: string
  code: string
  timezone: string
}
