// 다국어 지원 텍스트
export type Language = "ko" | "en";

export const translations = {
  ko: {
    // Header
    worldClock: "세계시계",
    clocks: "시계",
    settings: "설정",
    share: "공유",
    
    // Clock Management
    addClock: "시계 추가",
    removeClock: "시계 제거",
    editLabel: "라벨 편집",
    firstClock: "첫 번째 시계 추가",
    firstClockDesc: "도시를 선택하여 시계를 추가하고 다양한 시간대를 추적해보세요",
    searchCityCountry: "도시 또는 국가 검색...",
    searchResults: "검색 결과",
    noSearchResults: "검색된 도시가 없습니다.",
    
    // Time Display
    sameTime: "현지 시간",
    
    // Share
    shareTitle: "시계 구성 공유",
    shareDescription: "이 URL을 복사하여 다른 사람과 현재 시계 구성을 공유하세요.",
    shareUrl: "공유 URL",
    copyUrl: "URL 복사",
    copied: "복사됨!",
    noClocks: "공유할 시계가 없습니다",
    noClockDesc: "공유하기 전에 최소 1개의 시계를 추가해주세요.",
    
    // Settings
    weatherSettings: "날씨 설정",
    weatherSettingsDesc: "시계의 날씨 정보를 설정하세요",
    weatherApiKey: "WeatherAPI 키",
    enterApiKey: "WeatherAPI 키를 입력하세요",
    save: "저장",
    clear: "지우기",
    apiKeySaved: "Weather API 키가 성공적으로 저장되었습니다!",
    getWeatherInfo: "시계에 날씨 정보를 표시하려면 WeatherAPI의 무료 API 키가 필요합니다.",
    getFreeKey: "무료 API 키 받기:",
    apiKeyFeatures: [
      "무료 플랜으로 월 1,000,000회 호출 가능",
      "무료 플랜에 신용카드 불필요",
      "API 키는 브라우저에 로컬 저장"
    ],
    
    displaySettings: "화면 설정",
    displaySettingsDesc: "시계 표시 방식을 설정하세요",
    clockStyle: "시계 스타일",
    digital: "디지털",
    analog: "아날로그",
    timeFormat: "시간 형식",
    hour12: "12시간 (AM/PM)",
    hour24: "24시간",
    
    themeSettings: "테마 설정",
    themeSettingsDesc: "애플리케이션 테마를 설정하세요",
    autoDarkMode: "자동 다크모드",
    autoDarkModeDesc: "밤 시간(오후 8시 ~ 오전 6시)에 자동으로 다크모드로 전환",
    
    languageSettings: "언어 설정",
    languageSettingsDesc: "애플리케이션 언어를 설정하세요",
    language: "언어",
    korean: "한국어",
    english: "English",
    
    // Weather
    weatherLoading: "날씨 정보 로딩 중...",
    weatherFailed: "날씨 로딩 실패",
    
    // Days of week
    monday: "월요일",
    tuesday: "화요일", 
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
    sunday: "일요일",
    
    // Months
    january: "1월",
    february: "2월",
    march: "3월",
    april: "4월",
    may: "5월",
    june: "6월",
    july: "7월",
    august: "8월",
    september: "9월",
    october: "10월",
    november: "11월",
    december: "12월",
    
    // DST
    dstTooltip: "이 지역은 현재 서머타임을 적용하고 있습니다"
  },
  
  en: {
    // Header
    worldClock: "World Clock",
    clocks: "Clocks",
    settings: "Settings",
    share: "Share",
    
    // Clock Management
    addClock: "Add Clock",
    removeClock: "Remove Clock",
    editLabel: "Edit Label",
    firstClock: "Add Your First Clock",
    firstClockDesc: "Select a city to add a clock and track different time zones",
    searchCityCountry: "Search cities or countries...",
    searchResults: "Search Results",
    noSearchResults: "No cities found.",
    
    // Time Display
    sameTime: "Same time",
    
    // Share
    shareTitle: "Share Clock Configuration",
    shareDescription: "Copy this URL to share your current clock configuration with others.",
    shareUrl: "Share URL",
    copyUrl: "Copy URL",
    copied: "Copied!",
    noClocks: "No clocks to share",
    noClockDesc: "Add at least one clock before sharing.",
    
    // Settings
    weatherSettings: "Weather Settings",
    weatherSettingsDesc: "Configure weather information for your clocks",
    weatherApiKey: "WeatherAPI Key",
    enterApiKey: "Enter your WeatherAPI key",
    save: "Save",
    clear: "Clear",
    apiKeySaved: "Weather API key has been saved successfully!",
    getWeatherInfo: "To get weather information for your clocks, you need a free API key from WeatherAPI.",
    getFreeKey: "Get your free API key:",
    apiKeyFeatures: [
      "Free plan includes 1,000,000 calls/month",
      "No credit card required for free plan",
      "API key is stored locally in your browser"
    ],
    
    displaySettings: "Display Settings",
    displaySettingsDesc: "Customize how your clocks are displayed",
    clockStyle: "Clock Style",
    digital: "Digital",
    analog: "Analog",
    timeFormat: "Time Format",
    hour12: "12-hour (AM/PM)",
    hour24: "24-hour",
    
    themeSettings: "Theme Settings",
    themeSettingsDesc: "Customize the appearance of the application",
    autoDarkMode: "Automatic Dark Mode",
    autoDarkModeDesc: "Automatically switch to dark mode at night (8 PM - 6 AM)",
    
    languageSettings: "Language Settings",
    languageSettingsDesc: "Set the application language",
    language: "Language",
    korean: "한국어",
    english: "English",
    
    // Weather
    weatherLoading: "Loading weather...",
    weatherFailed: "Weather failed",
    
    // Days of week
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday", 
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    
    // Months
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    
    // DST
    dstTooltip: "This location is currently observing Daylight Saving Time"
  }
};

// 현재 언어 가져오기
export function useTranslations(language: Language) {
  return translations[language];
}

// 날짜 형식화 함수
export function formatDate(date: Date, language: Language): string {
  const t = translations[language];
  
  const days = [
    t.sunday, t.monday, t.tuesday, t.wednesday, 
    t.thursday, t.friday, t.saturday
  ];
  
  const months = [
    t.january, t.february, t.march, t.april,
    t.may, t.june, t.july, t.august,
    t.september, t.october, t.november, t.december
  ];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();
  
  if (language === 'ko') {
    return `${year}년 ${monthName} ${dayNumber}일 ${dayName}`;
  } else {
    return `${dayName}, ${monthName} ${dayNumber}, ${year}`;
  }
}
//%%%%%%%%%%LAST%%%%%