# Netflix Demo 

TMDB API 기반 Netflix 스타일 영화 정보 서비스입니다.  
로그인/회원가입, 인기 영화, 검색, 위시리스트 등을 포함한 SPA 구조의 웹 애플리케이션입니다.

**배포 URL:**  
👉 https://donghun712.github.io/pb_Netflixdemo_kdh/

---

## 1. 🔎 프로젝트 소개

TMDB API를 기반으로 영화 데이터를 불러오며, 로그인/회원가입, 찜 목록 저장, 검색, 인기 영화 리스트 등 다양한 기능을 갖춘 SPA입니다.

### 주요 특징
- React 기반 SPA
- gh-pages 자동 배포 적용 완료
- LocalStorage 기반 로그인 유지 및 위시리스트 저장
- 반응형 UI 구성
- 로그인/회원가입 3D 카드 플립 애니메이션
- TMDB API 사용

---

## 2. 🛠 기술 스택

- **Frontend:** React, JavaScript, Vite  
- **Styling:** Custom CSS  
- **State/Data:** React Hooks, Axios  
- **Routing:** React Router DOM  
- **Deployment:** GitHub Actions + gh-pages 자동 배포  
- **API:** TMDB API

---

## 3. 🚀 실행 방법

아래 명령어만 있으면 로컬에서 실행 가능합니다.

### 1) 패키지 설치
npm install

### 2) 개발 서버 실행
npm run dev

### 3) 프로덕션 빌드
npm run build

### 4) gh-pages 수동 배포 (자동 배포도 동작함)
npm run deploy

---

## 4. 🔑 TMDB API Key 사용 방식

이 프로젝트는 별도의 환경변수(.env)를 사용하지 않으며,  
비밀번호에 TMDB API Key를 사용하는 방식으로 구현하였습니다.

---

## 5. 📁 폴더 구조

```text
.
├── public/                 # 정적 리소스 (favicon, robots.txt 등)
├── src/                    # 소스 코드 메인 디렉토리
│   ├── api/                # API 통신 관련 로직 (TMDB axios 인스턴스 등)
│   ├── components/         # 재사용 가능한 UI 컴포넌트 (Header, MovieCard 등)
│   ├── context/            # 전역 상태 관리 (AuthContext, ToastContext)
│   ├── hooks/              # 커스텀 훅 (useDebounce, useMovieFetch 등)
│   ├── pages/              # 라우트별 페이지 컴포넌트 (Home, Search, SignIn 등)
│   ├── router/             # 라우팅 설정 (AppRouter, ProtectedRoute)
│   ├── styles/             # 전역 스타일 및 CSS 파일 (global.css, auth.css 등)
│   ├── App.tsx             # 앱 메인 컴포넌트 (Provider 래핑)
│   └── main.tsx            # 앱 진입점 (HashRouter 설정 및 렌더링)
├── package.json            # 프로젝트 의존성 및 스크립트 관리
└── vite.config.ts          # Vite 빌드 및 배포 설정
```

---

## 6. ✨ 주요 기능

### 🔐 6-1. 로그인 / 회원가입 (/signin)

이메일/비밀번호 기반 로그인/회원가입

LocalStorage 기반 로그인 유지

3D 카드 플립 애니메이션 적용

### 🏠 6-2. 홈 (/)

TMDB Now Playing / Popular 등 섹션 표시

영화 카드 Hover 시 확대 애니메이션

카드에서 위시리스트 토글 기능 제공

### ⭐ 6-3. 인기 영화 (/popular)

인기 영화 리스트 조회

무한 스크롤 또는 테이블 뷰 구성

상단 이동 버튼

### 🔍 6-4. 검색 (/search)

검색어 기반 영화 검색

장르 / 평점 / 정렬 기준 필터

### ❤️ 6-5. 위시리스트 (/wishlist)

LocalStorage 기반 찜 목록 표시

API 재호출 없이 저장된 데이터만 사용

### 6-6. 영화 상세 페이지 (/movie/movieid)

영화 상세 정보 조회

---

## 7. 💾 LocalStorage Key 구조
Key	설명
pb:user	        로그인한 사용자 정보
pb:keepLogin	로그인 유지 여부
pb:wishlist	    찜한 영화 목록

---

## 8. 🌿 Git 브랜치 전략 (Git Flow)

본 프로젝트는 Git Flow 기반으로 브랜치를 운영했습니다.

### 🔵 main
- 최종 배포용 브랜치
- GitHub Pages가 이 브랜치를 기준으로 gh-pages 배포 자동화 수행
- 안정적인 코드만 병합됨

### 🟡 develop
- 기능 통합 브랜치
- feature 브랜치들이 완료될 때마다 이곳에 병합
- 배포 직전까지 지속적으로 변경되는 브랜치

### 🟢 feature/*
- 개별 기능 개발용 브랜치
- 브랜치 예시:
  - `feature/login`
  - `feature/signup`
  - `feature/search`
  - `feature/popular`
  - `feature/wishlist`
- 완료되면 PR 또는 merge를 통해 develop으로 병합

### 🔴 hotfix/*
- main에서 급하게 수정해야 할 버그가 발생할 때 사용하는 브랜치
- main에서 분기하여 버그를 수정한 뒤:
  - main에 병합
  - develop에도 병합하여 양쪽 코드 불일치 방지
- 예: `hotfix/login-null-error`

---

### 📌 브랜치 작업 흐름(요약)

1. 기능 개발 시작 → `feature/*` 생성  
2. 기능 완료 → develop에 병합   
3. develop에서 전체 기능 테스트
4. develop를 main에 병합 → 배포  
5. 필요 시 hotfix로 main 긴급 수정 후 develop과 동기화

---

### 📌 자동 배포 흐름

## 🔄 CI/CD 파이프라인
1. **Pull Request (Release):** 개발이 완료된 `develop` 브랜치에서 `main`으로 PR을 생성하면 **자동 빌드 및 테스트**가 수행됩니다.
2. **Merge:** 테스트가 통과된 코드가 `main` 브랜치에 병합(Merge)됩니다.
3. **Auto Deployment:** GitHub Actions가 `main`의 변경 사항을 감지하여 최종 빌드를 수행하고, 결과물을 `gh-pages` 브랜치로 자동 배포합니다.
4. **Hosting:** GitHub Pages를 통해 최신 버전이 서비스됩니다.

---

## 9. 🤖 AI 활용 요약

본 프로젝트는 아래 항목에서 ChatGPT를 활용했습니다:

로그인/회원가입 UI 3D 플립 애니메이션 설계

TMDB API 연동 구조 설계

컴포넌트 / 폴더 구조 분리 전략

gh-pages 배포 오류 해결 및 vite base 문제 해결

README 및 제출 문서 구성 가이드 제공

---

