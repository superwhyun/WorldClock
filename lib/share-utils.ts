import type { Clock } from "@/types"
import { MAJOR_CITIES } from "./city-data"

// URL 파라미터로 변환할 때 사용할 구분자
const CLOCK_SEPARATOR = ","
const CLOCK_DATA_SEPARATOR = ":"

// 시계 배열을 URL 파라미터 문자열로 변환
export function clocksToUrlParam(clocks: Clock[]): string {
  return clocks
    .map((clock) => {
      // 각 시계를 "cityId:timezone:label" 형식으로 변환
      // 도시 ID 찾기
      const city = MAJOR_CITIES.find(city => 
        city.timezone === clock.timezone && 
        city.countryCode === clock.countryCode
      )
      
      if (!city) return null
      
      // label이 없거나 도시 이름과 같으면 생략
      const label = clock.label && clock.label !== clock.cityName ? `:${encodeURIComponent(clock.label)}` : ""
      return `${city.id}${label ? `:${encodeURIComponent(clock.label)}` : ""}`
    })
    .filter(Boolean)
    .join(CLOCK_SEPARATOR)
}

// URL 파라미터 문자열을 시계 배열로 변환
export async function urlParamToClocks(param: string): Promise<Clock[]> {
  if (!param) return []

  try {
    // 파라미터 파싱
    return param
      .split(CLOCK_SEPARATOR)
      .map((clockParam) => {
        const parts = clockParam.split(CLOCK_DATA_SEPARATOR)
        const cityId = parts[0]
        const label = parts.length > 1 ? decodeURIComponent(parts[1]) : ""

        // 도시 ID로 도시 정보 찾기
        const city = MAJOR_CITIES.find(city => city.id === cityId)
        if (!city) return null

        return {
          id: crypto.randomUUID(), // 새 ID 생성
          timezone: city.timezone,
          countryCode: city.countryCode,
          cityName: city.name,
          cityNameEn: city.nameEn,
          countryName: city.country,
          label: label || "",
        }
      })
      .filter((clock): clock is Clock => clock !== null)
  } catch (error) {
    console.error("Error parsing URL parameter:", error)
    return []
  }
}

// 현재 시계 구성으로 공유 URL 생성
export function generateShareUrl(clocks: Clock[]): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : ""
  const clocksParam = clocksToUrlParam(clocks)
  return `${baseUrl}?clocks=${clocksParam}`
}

// URL에서 시계 파라미터 추출
export function getClockParamFromUrl(): string | null {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  return params.get("clocks")
}