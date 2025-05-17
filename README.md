# 🌍 World Clock - 세계시계

전 세계 주요 도시의 실시간 시간을 한눈에 확인할 수 있는 현대적인 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🏙️ **40개 이상의 주요 도시** - 6개 대륙의 대표 도시들
- 🔍 **스마트 검색** - 도시명과 국가명으로 쉽게 찾기
- 🌤️ **실시간 날씨 정보** - 각 도시의 현재 온도와 날씨 상태
- 🌙 **자동 다크모드** - 각 도시의 현지 시간 기준 (밤 9시~오전 7시)
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크톱 모두 지원
- 🎯 **드래그 앤 드롭** - 시계 순서를 자유롭게 변경
- 🔗 **URL 공유** - 설정한 시계들을 링크로 공유
- 🏷️ **커스텀 라벨** - 시계에 원하는 이름 설정
- 🌍 **서머타임 표시** - DST 적용 지역 자동 감지
- 🕐 **디지털/아날로그** - 두 가지 시계 스타일 선택
- 💾 **자동 저장** - 설정이 자동으로 브라우저에 저장

## 🚀 시작하기

### 필요 조건

- Node.js 18+ 
- npm 또는 pnpm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/superwhyun/WorldClock.git
cd WorldClock

# 의존성 설치
npm install --legacy-peer-deps

# 환경변수 설정 (선택사항 - 날씨 기능 활성화)
cp .env.example .env.local
# .env.local 파일을 편집하여 WeatherAPI 키 추가:
# NEXT_PUBLIC_WEATHER_API_KEY=your_weatherapi_key_here

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 날씨 기능 설정 (선택사항)

1. [WeatherAPI.com](https://www.weatherapi.com/)에서 무료 API 키 발급
2. `.env.local` 파일에 API 키 추가:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_weatherapi_key_here
   ```
3. Vercel 배포 시: 환경변수로 `NEXT_PUBLIC_WEATHER_API_KEY` 추가

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Radix UI + shadcn/ui
- **상태 관리**: React Hooks
- **드래그 앤 드롭**: @dnd-kit
- **아이콘**: Lucide React
- **날짜/시간**: Luxon.js

## 📚 사용법

### 시계 추가
1. "시계 추가" 버튼 클릭
2. 대륙별로 정리된 도시 목록에서 선택
3. 또는 검색창에서 도시명/국가명 입력

### 시계 관리
- **순서 변경**: 시계를 드래그하여 원하는 위치로 이동
- **라벨 수정**: 시계의 연필 아이콘을 클릭하여 이름 변경
- **삭제**: 시계 우측 상단의 X 버튼 클릭

### 설정
- **표시 형식**: 디지털/아날로그 선택
- **시간 형식**: 12시간/24시간 선택
- **자동 다크모드**: 현지 시간 기준 다크모드 on/off

### 공유
- Share 버튼을 클릭하여 현재 설정된 시계들의 URL 생성
- 링크를 공유하면 동일한 시계 구성을 볼 수 있음

## 🌏 지원 도시

### 아시아
서울, 도쿄, 베이징, 상하이, 싱가포르, 홍콩, 타이베이, 방콕, 뭄바이, 두바이

### 유럽  
런던, 파리, 베를린, 로마, 마드리드, 암스테르담, 취리히, 제네바, 모스크바

### 북미
뉴욕, 로스앤젤레스, 시카고, 토론토, 밴쿠버, 멕시코시티

### 남미
상파울루, 부에노스아이레스, 리마

### 아프리카
카이로, 요하네스버그, 라고스

### 오세아니아
시드니, 멜버른, 오클랜드

## 🔧 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start
```

## 📝 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 확인하세요.

## 🤝 기여하기

Pull Request와 Issue는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 문의

궁금한 점이 있으시면 [GitHub Issues](https://github.com/superwhyun/WorldClock/issues)를 이용해 주세요.

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!