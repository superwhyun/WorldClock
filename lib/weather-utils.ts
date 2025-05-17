interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
  };
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  hour: Array<{
    time_epoch: number;
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    chance_of_rain: number;
  }>;
}

interface ForecastData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

// WeatherAPI 3일 예보 데이터 조회
export async function getForecastData(cityName: string): Promise<ForecastData | null> {
  let apiKey: string | null = null;
  
  // localStorage를 우선적으로 확인 (클라이언트 사이드)
  if (typeof window !== 'undefined') {
    const storedApiKey = localStorage.getItem('world-clock-weather-api-key');
    if (storedApiKey !== null) {
      // localStorage에 값이 있으면 (빈 문자열이라도) 그것을 사용
      apiKey = storedApiKey.trim() || null;
    } else {
      // localStorage에 값이 없으면 환경변수 사용
      apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || null;
    }
  } else {
    // 서버사이드에서는 환경변수만 사용
    apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || null;
  }
  
  if (!apiKey) {
    console.warn('Weather API key not found. Skipping forecast data.');
    return null;
  }

  // 도시명 유효성 검사
  if (!cityName || cityName.trim() === '' || cityName === 'undefined') {
    console.error('Invalid city name provided for forecast API:', cityName);
    return null;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&days=3&aqi=no&alerts=no`;
  console.log('Weather Forecast API URL:', url.replace(apiKey, 'API_KEY_HIDDEN'));

  try {
    const response = await fetch(url);

    console.log('Weather Forecast API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather Forecast API error: ${response.status} - ${errorText}`);
      throw new Error(`Weather Forecast API error: ${response.status}`);
    }

    const data: ForecastData = await response.json();
    console.log('Parsed forecast data:', data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch forecast for ${cityName}:`, error);
    return null;
  }
}

// WeatherAPI 날씨 데이터 조회
export async function getWeatherData(cityName: string): Promise<WeatherData | null> {
  let apiKey: string | null = null;
  
  // localStorage를 우선적으로 확인 (클라이언트 사이드)
  if (typeof window !== 'undefined') {
    const storedApiKey = localStorage.getItem('world-clock-weather-api-key');
    if (storedApiKey !== null) {
      // localStorage에 값이 있으면 (빈 문자열이라도) 그것을 사용
      apiKey = storedApiKey.trim() || null;
    } else {
      // localStorage에 값이 없으면 환경변수 사용
      apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || null;
    }
  } else {
    // 서버사이드에서는 환경변수만 사용
    apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || null;
  }
  
  if (!apiKey) {
    console.warn('Weather API key not found. Skipping weather data.');
    return null;
  }

  // 도시명 유효성 검사
  if (!cityName || cityName.trim() === '' || cityName === 'undefined') {
    console.error('Invalid city name provided for weather API:', cityName);
    return null;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&aqi=no`;
  console.log('Weather API URL:', url.replace(apiKey, 'API_KEY_HIDDEN'));

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 }, // 10분 캐시
    });

    console.log('Weather API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error: ${response.status} - ${errorText}`);
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherData = await response.json();
    console.log('Parsed weather data:', data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch weather for ${cityName}:`, error);
    return null;
  }
}

// 날씨 코드에 따른 이모지 반환
export function getWeatherEmoji(code: number): string {
  // WeatherAPI 날씨 코드를 기반으로 이모지 매핑
  const weatherEmojis: { [key: number]: string } = {
    1000: '☀️', // Sunny
    1003: '⛅', // Partly cloudy
    1006: '☁️', // Cloudy
    1009: '☁️', // Overcast
    1030: '🌫️', // Mist
    1063: '🌦️', // Patchy rain possible
    1066: '🌨️', // Patchy snow possible
    1069: '🌨️', // Patchy sleet possible
    1072: '🌨️', // Patchy freezing drizzle possible
    1087: '⛈️', // Thundery outbreaks possible
    1114: '❄️', // Blowing snow
    1117: '❄️', // Blizzard
    1135: '🌫️', // Fog
    1147: '🌫️', // Freezing fog
    1150: '🌦️', // Patchy light drizzle
    1153: '🌦️', // Light drizzle
    1168: '🌨️', // Freezing drizzle
    1171: '🌨️', // Heavy freezing drizzle
    1180: '🌦️', // Patchy light rain
    1183: '🌧️', // Light rain
    1186: '🌦️', // Moderate rain at times
    1189: '🌧️', // Moderate rain
    1192: '🌦️', // Heavy rain at times
    1195: '🌧️', // Heavy rain
    1198: '🌨️', // Light freezing rain
    1201: '🌨️', // Moderate or heavy freezing rain
    1204: '🌧️', // Light sleet
    1207: '🌧️', // Moderate or heavy sleet
    1210: '🌨️', // Patchy light snow
    1213: '❄️', // Light snow
    1216: '🌨️', // Patchy moderate snow
    1219: '❄️', // Moderate snow
    1222: '🌨️', // Patchy heavy snow
    1225: '❄️', // Heavy snow
    1237: '🌨️', // Ice pellets
    1240: '🌦️', // Light rain shower
    1243: '🌧️', // Moderate or heavy rain shower
    1246: '🌧️', // Torrential rain shower
    1249: '🌧️', // Light sleet showers
    1252: '🌧️', // Moderate or heavy sleet showers
    1255: '❄️', // Light snow showers
    1258: '❄️', // Moderate or heavy snow showers
    1261: '🌨️', // Light showers of ice pellets
    1264: '🌨️', // Moderate or heavy showers of ice pellets
    1273: '⛈️', // Patchy light rain with thunder
    1276: '⛈️', // Moderate or heavy rain with thunder
    1279: '⛈️', // Patchy light snow with thunder
    1282: '⛈️', // Moderate or heavy snow with thunder
  };

  return weatherEmojis[code] || '🌤️';
}

// 온도 단위 변환
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${Math.round(temp)}°${unit}`;
}