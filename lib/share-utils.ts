import type { Clock } from "@/types"
import { getCountries } from "./timezone-utils"

// URL 파라미터로 변환할 때 사용할 구분자
const CLOCK_SEPARATOR = ","
const CLOCK_DATA_SEPARATOR = ":"

// 시계 배열을 URL 파라미터 문자열로 변환
export function clocksToUrlParam(clocks: Clock[]): string {
  return clocks
    .map((clock) => {
      // 각 시계를 "countryCode:timezone:label" 형식으로 변환
      // label이 없거나 국가 이름과 같으면 생략
      const label = clock.label && clock.label !== clock.countryName ? `:${encodeURIComponent(clock.label)}` : ""
      return `${clock.countryCode}:${encodeURIComponent(clock.timezone)}${label}`
    })
    .join(CLOCK_SEPARATOR)
}

// URL 파라미터 문자열을 시계 배열로 변환
export async function urlParamToClocks(param: string): Promise<Clock[]> {
  if (!param) return []

  try {
    // 모든 국가 데이터 가져오기
    const countries = await getCountries()
    const countryMap = new Map(countries.map((country) => [country.code, country]))

    // 파라미터 파싱
    return param
      .split(CLOCK_SEPARATOR)
      .map((clockParam) => {
        const parts = clockParam.split(CLOCK_DATA_SEPARATOR)
        const countryCode = parts[0]
        const timezone = decodeURIComponent(parts[1])
        const label = parts.length > 2 ? decodeURIComponent(parts[2]) : ""

        // 국가 코드가 유효한지 확인
        const country = countryMap.get(countryCode)
        if (!country) return null

        return {
          id: crypto.randomUUID(), // 새 ID 생성
          countryCode,
          timezone,
          countryName: country.name,
          label,
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
