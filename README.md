# Netflix Demo – 2차 과제 (WSD)

TMDB API 기반 Netflix 스타일 영화 정보 서비스입니다.  
로그인/회원가입, 인기 영화, 검색, 위시리스트 등을 포함한 SPA 구조의 웹 애플리케이션입니다.

**배포 URL:**  
👉 https://donghun712.github.io/pb_Netflixdemo_kdh/

---

## 1. 🔎 프로젝트 소개

이 프로젝트는 Web Service Development 2차 과제 제출용으로 제작되었습니다.  
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

## 4. 🔑 환경 변수 설정 (TMDB API KEY)

프로젝트 루트에 .env 파일을 만들고 아래를 입력하세요:

VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY

---

## 5. 📁 폴더 구조 요약
pb_Netflixdemo_kdh/
  public/
  src/
    api/
    components/
    pages/
    styles/
    utils/
    App.jsx
    main.jsx
  package.json
  vite.config.js

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
  - `feature/animation-flip`
- 완료되면 PR 또는 merge를 통해 develop으로 병합

### 🔴 hotfix/*
- main에서 급하게 수정해야 할 버그가 발생할 때 사용하는 브랜치
- main에서 분기하여 버그를 수정한 뒤:
  - main에 병합
  - develop에도 병합하여 양쪽 코드 불일치 방지
- 예: `hotfix/login-null-error`

### 🟣 release/*
- 배포 직전에 생성하는 안정화 브랜치
- 개발이 끝난 시점에 develop에서 분기
- QA 과정에서 발견된 오류를 수정하는 곳
- 안정화 후 main에 병합 → 버전 태깅 → 배포
- 예: `release/v1.0.0`

---

### 📌 브랜치 작업 흐름(요약)

1. 기능 개발 시작 → `feature/*` 생성  
2. 기능 완료 → develop에 병합  
3. 전체 기능 통합 후 → `release/*` 생성  
4. QA 및 버그 수정  
5. release를 main에 병합 → 배포  
6. 필요 시 hotfix로 main 긴급 수정 후 develop과 동기화

---

### 📌 자동 배포 흐름

1. main 브랜치에 머지  
2. GitHub Actions 또는 gh-pages 스크립트 실행  
3. 빌드 결과가 gh-pages 브랜치로 자동 반영  
4. GitHub Pages가 자동 업데이트

---

## 9. 🤖 AI 활용 요약

본 프로젝트는 아래 항목에서 ChatGPT를 활용했습니다:

로그인/회원가입 UI 3D 플립 애니메이션 설계

TMDB API 연동 구조 설계

컴포넌트 / 폴더 구조 분리 전략

gh-pages 배포 오류 해결 및 vite base 문제 해결

README 및 제출 문서 구성 가이드 제공

---

