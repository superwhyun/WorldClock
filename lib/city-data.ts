// 주요 도시들의 타임존 정보
export interface CityInfo {
  id: string;
  name: string;
  nameEn: string; // 영문명 추가
  country: string;
  timezone: string;
  countryCode: string;
  continent: string;
  utcOffset: string;
}

// 대륙별 주요 도시 목록
export const MAJOR_CITIES: CityInfo[] = [
  // 아시아
  { id: 'seoul', name: '서울', nameEn: 'Seoul', country: '대한민국', timezone: 'Asia/Seoul', countryCode: 'KR', continent: 'Asia', utcOffset: '+09:00' },
  { id: 'tokyo', name: '도쿄', nameEn: 'Tokyo', country: '일본', timezone: 'Asia/Tokyo', countryCode: 'JP', continent: 'Asia', utcOffset: '+09:00' },
  { id: 'beijing', name: '베이징', nameEn: 'Beijing', country: '중국', timezone: 'Asia/Shanghai', countryCode: 'CN', continent: 'Asia', utcOffset: '+08:00' },
  { id: 'shanghai', name: '상하이', nameEn: 'Shanghai', country: '중국', timezone: 'Asia/Shanghai', countryCode: 'CN', continent: 'Asia', utcOffset: '+08:00' },
  { id: 'singapore', name: '싱가포르', nameEn: 'Singapore', country: '싱가포르', timezone: 'Asia/Singapore', countryCode: 'SG', continent: 'Asia', utcOffset: '+08:00' },
  { id: 'hong_kong', name: '홍콩', nameEn: 'Hong Kong', country: '홍콩', timezone: 'Asia/Hong_Kong', countryCode: 'HK', continent: 'Asia', utcOffset: '+08:00' },
  { id: 'taipei', name: '타이베이', nameEn: 'Taipei', country: '대만', timezone: 'Asia/Taipei', countryCode: 'TW', continent: 'Asia', utcOffset: '+08:00' },
  { id: 'bangkok', name: '방콕', nameEn: 'Bangkok', country: '태국', timezone: 'Asia/Bangkok', countryCode: 'TH', continent: 'Asia', utcOffset: '+07:00' },
  { id: 'mumbai', name: '뭄바이', nameEn: 'Mumbai', country: '인도', timezone: 'Asia/Kolkata', countryCode: 'IN', continent: 'Asia', utcOffset: '+05:30' },
  { id: 'dubai', name: '두바이', nameEn: 'Dubai', country: '아랍에미리트', timezone: 'Asia/Dubai', countryCode: 'AE', continent: 'Asia', utcOffset: '+04:00' },

  // 유럽
  { id: 'london', name: '런던', nameEn: 'London', country: '영국', timezone: 'Europe/London', countryCode: 'GB', continent: 'Europe', utcOffset: '+00:00' },
  { id: 'paris', name: '파리', nameEn: 'Paris', country: '프랑스', timezone: 'Europe/Paris', countryCode: 'FR', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'berlin', name: '베를린', nameEn: 'Berlin', country: '독일', timezone: 'Europe/Berlin', countryCode: 'DE', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'rome', name: '로마', nameEn: 'Rome', country: '이탈리아', timezone: 'Europe/Rome', countryCode: 'IT', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'madrid', name: '마드리드', nameEn: 'Madrid', country: '스페인', timezone: 'Europe/Madrid', countryCode: 'ES', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'amsterdam', name: '암스테르담', nameEn: 'Amsterdam', country: '네덜란드', timezone: 'Europe/Amsterdam', countryCode: 'NL', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'zurich', name: '취리히', nameEn: 'Zurich', country: '스위스', timezone: 'Europe/Zurich', countryCode: 'CH', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'geneva', name: '제네바', nameEn: 'Geneva', country: '스위스', timezone: 'Europe/Zurich', countryCode: 'CH', continent: 'Europe', utcOffset: '+01:00' },
  { id: 'moscow', name: '모스크바', nameEn: 'Moscow', country: '러시아', timezone: 'Europe/Moscow', countryCode: 'RU', continent: 'Europe', utcOffset: '+03:00' },

  // 북미
  { id: 'new_york', name: '뉴욕', nameEn: 'New York', country: '미국', timezone: 'America/New_York', countryCode: 'US', continent: 'North America', utcOffset: '-05:00' },
  { id: 'los_angeles', name: '로스앤젤레스', nameEn: 'Los Angeles', country: '미국', timezone: 'America/Los_Angeles', countryCode: 'US', continent: 'North America', utcOffset: '-08:00' },
  { id: 'chicago', name: '시카고', nameEn: 'Chicago', country: '미국', timezone: 'America/Chicago', countryCode: 'US', continent: 'North America', utcOffset: '-06:00' },
  { id: 'toronto', name: '토론토', nameEn: 'Toronto', country: '캐나다', timezone: 'America/Toronto', countryCode: 'CA', continent: 'North America', utcOffset: '-05:00' },
  { id: 'vancouver', name: '밴쿠버', nameEn: 'Vancouver', country: '캐나다', timezone: 'America/Vancouver', countryCode: 'CA', continent: 'North America', utcOffset: '-08:00' },
  { id: 'mexico_city', name: '멕시코시티', nameEn: 'Mexico City', country: '멕시코', timezone: 'America/Mexico_City', countryCode: 'MX', continent: 'North America', utcOffset: '-06:00' },

  // 남미
  { id: 'sao_paulo', name: '상파울루', nameEn: 'Sao Paulo', country: '브라질', timezone: 'America/Sao_Paulo', countryCode: 'BR', continent: 'South America', utcOffset: '-03:00' },
  { id: 'buenos_aires', name: '부에노스아이레스', nameEn: 'Buenos Aires', country: '아르헨티나', timezone: 'America/Argentina/Buenos_Aires', countryCode: 'AR', continent: 'South America', utcOffset: '-03:00' },
  { id: 'lima', name: '리마', nameEn: 'Lima', country: '페루', timezone: 'America/Lima', countryCode: 'PE', continent: 'South America', utcOffset: '-05:00' },

  // 아프리카
  { id: 'cairo', name: '카이로', nameEn: 'Cairo', country: '이집트', timezone: 'Africa/Cairo', countryCode: 'EG', continent: 'Africa', utcOffset: '+02:00' },
  { id: 'johannesburg', name: '요하네스버그', nameEn: 'Johannesburg', country: '남아프리카공화국', timezone: 'Africa/Johannesburg', countryCode: 'ZA', continent: 'Africa', utcOffset: '+02:00' },
  { id: 'lagos', name: '라고스', nameEn: 'Lagos', country: '나이지리아', timezone: 'Africa/Lagos', countryCode: 'NG', continent: 'Africa', utcOffset: '+01:00' },

  // 오세아니아
  { id: 'sydney', name: '시드니', nameEn: 'Sydney', country: '호주', timezone: 'Australia/Sydney', countryCode: 'AU', continent: 'Oceania', utcOffset: '+10:00' },
  { id: 'melbourne', name: '멜버른', nameEn: 'Melbourne', country: '호주', timezone: 'Australia/Melbourne', countryCode: 'AU', continent: 'Oceania', utcOffset: '+10:00' },
  { id: 'auckland', name: '오클랜드', nameEn: 'Auckland', country: '뉴질랜드', timezone: 'Pacific/Auckland', countryCode: 'NZ', continent: 'Oceania', utcOffset: '+12:00' }
];

// 대륙별 도시 그룹핑
export const CITIES_BY_CONTINENT = {
  Asia: MAJOR_CITIES.filter(city => city.continent === 'Asia'),
  Europe: MAJOR_CITIES.filter(city => city.continent === 'Europe'),
  'North America': MAJOR_CITIES.filter(city => city.continent === 'North America'),
  'South America': MAJOR_CITIES.filter(city => city.continent === 'South America'),
  Africa: MAJOR_CITIES.filter(city => city.continent === 'Africa'),
  Oceania: MAJOR_CITIES.filter(city => city.continent === 'Oceania')
};

// 도시 검색 함수
export function searchCities(query: string): CityInfo[] {
  if (!query.trim()) return MAJOR_CITIES;
  
  const searchTerm = query.toLowerCase();
  return MAJOR_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchTerm) ||
    city.country.toLowerCase().includes(searchTerm)
  );
}