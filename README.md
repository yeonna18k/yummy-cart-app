# 야미 장바구니 앱 🛒

React Native로 제작된 모바일 장바구니 관리 앱입니다. 사용자는 장바구니에 상품을 추가하고, 내역을 확인 및 수정할 수 있습니다.

## 🚀 프로젝트 실행 방법

### 1. 개발 환경 설정

#### 필수 요구사항

- Node.js (v20 이상)
- React Native CLI
- Android Studio (Android 개발)
- Xcode (iOS 개발 - macOS만 해당)

#### React Native 환경 설정

```bash
# Node.js 설치 후
npm install -g react-native-cli

# 또는 npx 사용 (권장)
npm install -g @react-native-community/cli
```

### 2. 프로젝트 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/yeonna18k/yummy-cart-app.git
cd yummy-cart-app

# 의존성 설치
npm install

# iOS 의존성 설치 (macOS만 해당)
cd ios && pod install && cd ..
```

### 3. 앱 실행

#### Android

```bash
# Android 에뮬레이터 또는 실제 기기 연결 후
npm run android
```

#### iOS (macOS만 해당)

```bash
# iOS 시뮬레이터에서 실행
npm run ios
```

#### Metro 서버 별도 실행 (필요한 경우)

```bash
npm start
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── common                   # 공통 컴포넌트
│   ├── product                  # 상품 관련 컴포넌트
│   ├── cart                     # 장바구니 관련 컴포넌트
│   └── icons                    # 아이콘 컴포넌트
├── screens/                     # 화면 컴포넌트
│   ├── ProductListScreen.tsx    # 상품 목록 화면
│   ├── ProductDetailScreen.tsx  # 상품 상세 화면
│   └── CartScreen.tsx           # 장바구니 화면
├── contexts/                    # Context API
│   ├── cartReducer.ts           # 장바구니 상태 리듀서
│   └── CartContext.tsx          # 장바구니 상태 전역 관리
├── hooks/                       # 커스텀 훅
│   ├── useCart.ts               # 장바구니 상태 관리 훅
│   └── useProductNavigation.ts  # 상품 디테일 이동 네비게이션 훅
├── navigation/                  # 네비게이션 설정
│   └── AppNavigation.tsx        # 메인 네비게이션 구조
├── services/                    # API 및 서비스
│   ├── mockApi.ts               # mock API 호출 함수
│   └── storage.ts               # AsyncStorage 관리
├── types/                       # 타입 정의
│   ├── cartTypes.ts             # 장바구니 관련 타입
│   ├── productTypes.ts          # 상품 관련 타입
│   └── navigationTypes.ts       # 네비게이션 관련 타입
├── data/                        # Mock 데이터
│   └── products.json            # 상품 데이터
└── utils/                       # 유틸리티 함수
    └── calculateTotals.ts       # 합계 금액, 총합 계산 유틸 함수
```

## 🛠 기술 스택

### Core

- **React Native**: 0.81.x
- **React**: 19.x
- **TypeScript**: ES6+

### 네비게이션

- **@react-navigation/native**: 화면 네비게이션
- **@react-navigation/native-stack**: 스택 네비게이션
- **@react-navigation/bottom-tabs**: 탭 네비게이션

### 상태 관리

- **React Context API**: 전역 상태 관리 (장바구니 상태)

### 네트워킹

- **axios**: HTTP 클라이언트 (예정)

### 스토리지

- **@react-native-async-storage/async-storage**: 로컬 데이터 저장

### 스타일링

- **React Native StyleSheet**: 기본 스타일링

## 🎯 구현된 기능

### ✅ 완료된 기능

- **상품 목록 보기**
  - Mock 데이터 기반 상품 목록 표시
  - 한 페이지당 10개 상품 노출
  - 무한 스크롤 구현 (onEndReached)
- **상품 상세 보기**
  - 상품 클릭 시 상세 페이지로 이동
  - 상품 정보 상세 표시
- **장바구니 기능**

  - 장바구니에 상품 추가
  - 수량 변경 (+/- 버튼)
  - 상품 삭제
  - 총 합계 금액 계산 및 표시
  - AsyncStorage를 통한 데이터 영구 저장
  - 앱 재시작 후 장바구니 복원

- **결제 기능**
  - Alert를 통한 결제 완료 시뮬레이션

### 📱 화면 구성

1. **상품 목록 화면**: 상품들을 카드 형태로 표시
2. **상품 상세 화면**: 상품 정보 및 수량 선택 후 장바구니 추가 버튼
3. **장바구니 화면**: 장바구니 아이템 관리 및 결제

## ⚖️ 기술적 의사결정 및 트레이드오프

### Context API 선택 이유

- **장점**:
  - Redux보다 설정이 간단함
  - 작은 규모 앱에 적합
  - React 내장 기능으로 추가 의존성 없음
- **트레이드오프**:
  - 복잡한 상태 로직에는 Redux가 더 적합
  - 미들웨어 지원 제한적

### AsyncStorage 사용

- **장점**:
  - 간단한 key-value 저장 방식
  - React Native 공식 지원
- **트레이드오프**:
  - 대용량 데이터에는 부적합
  - 복잡한 쿼리 불가능

### Mock 데이터 활용

- **장점**:
  - 백엔드 없이 빠른 테스트 가능
  - 일관된 테스트 데이터
- **트레이드오프**:
  - 실제 API 연동 시 추가 작업 필요

## 🚧 개발 중 발생한 이슈 및 해결방안

### AsyncStorage 데이터 동기화

- **문제**: Context 상태 변경 시마다 AsyncStorage 업데이트 필요
- **해결**: useEffect를 통한 자동 동기화 구현

### 무한 스크롤 성능

- **성능 문제**:
  - 많은 데이터 로딩 시 스크롤 성능 저하
  - 컴포넌트 불필요한 리렌더링
- **데이터 중복 문제**:
  - 빠른 스크롤 시 loadMoreProducts 함수 중복 호출
  - 같은 상품 데이터가 여러 번 추가되어 FlatList 키 중복 에러 발생
- **해결 방안**:
  - **FlatList 최적화**: getItemLayout, windowSize, removeClippedSubviews 설정
  - **로딩 상태 관리**: isLoadingMore 플래그로 중복 API 호출 차단
  - **중복 데이터 방지**: Set 자료구조를 활용한 고유 ID 필터링
  - **컴포넌트 최적화**: React.memo와 useCallback을 통한 렌더링 최적화

## ⏰ 개발 소요 시간

- **프로젝트 설정 및 환경 구성**: 2시간
- **상품 목록 화면 구현**: 2시간
- **상품 상세 화면 구현**: 2시간
- **장바구니 기능 구현**: 3시간
- **AsyncStorage 연동**: 1시간
- **스타일링 및 UX 개선**: 2시간
- **테스트 및 디버깅**: 2시간
- **문서 작성**: 1시간

**총 소요 시간**: 약 15시간

## 🎬 데모 영상

https://drive.google.com/file/d/1SAEbwqj7djLuCpqkjKjvNbYVwyAQkag4/view?usp=sharing

## 📦 Android APK

https://drive.google.com/file/d/1nDbEEVfo7t6A_vEJoKh-SPqzMw9irOc0/view?usp=sharing

**이메일**: yeonna18k@gmail.com |
**개발 기간**: 2025년 9월
