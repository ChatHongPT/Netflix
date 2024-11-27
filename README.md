<div align="center">
  <img src="https://github.com/user-attachments/assets/93149c01-b35a-4133-901b-62b8300ba17e" alt="Netflix Clone Project">
  <h2>TMDB API를 활용한 넷플릭스 클론 사이트</h2>
</div>

### NETFLIX CLONE PROJECT
```
🎬 TMDB API를 활용한 넷플릭스 클론 사이트
📆 2024.10.27 ~ 2024.11.27
👨🏻‍💻 Front-End Demo Site 개발 프로젝트
```
<div align="center">
  <a href="https://github.com/ChatHongPT/Netflix/tree/for_android"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fkfpd.org&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%2370FF00&title=Netflix+Main+Repository&edge_flat=false"/></a>
</div>

---
### 👥 Developer
| 최홍석 |
| :---: |
| <img width="160px" src="https://github.com/user-attachments/assets/e42318eb-0b49-4d00-8310-90fa23610a63"/> |
| [@ChatHongPT](https://github.com/ChatHongPT) |
| Vue.js(JS)

---

### 🛠️ Tech Stack

<img src="https://img.shields.io/static/v1?label=Vue.js&message=3.5.13&color=4FC08D&logo=kotlin&logoColor=4FC08D" alt="Vue.js">
<img src="https://img.shields.io/static/v1?label=Tailwind CSS&message=3.4.1&color=06B6D4&logo=Gradle&logoColor=06B6D4" alt="Tailwind">
- Frontend : Vue.js <br></br>
- Styling : Tailwind CSS<br></br>
- API : TMDB API<br></br>
- Deploy : Github Pages<br></br>
- CI/CD : Github Actions<br></br>

---

### 🕹 Features

🔗 **인기 영화 목록 조회**
🔗 **영화 검색**
🔗 **반응형 디자인**
🔗 **위시리스트 관리**
🔗 **테이블/그리드뷰 토글**

---
### 🎥 페이지 리뷰

## 메인 페이지

인기 콘텐츠 영화와 현재 상영작의 영화를 확인할 수 있는 메인 페이지입니다.

<img width="1493" alt="메인 페이지" src="https://github.com/user-attachments/assets/d4a11696-cea8-4e37-8fa7-c8f443dab6f4">

## 검색 페이지

원하는 영화를 검색하고 테이블/무한스크롤 뷰로 확인할 수 있습니다.

### 테이블 뷰

<img width="1493" alt="테이블 뷰" src="https://github.com/user-attachments/assets/db863b7b-73de-49ea-bc87-e63067feaf83">

### 무한스크롤 뷰

<img width="1493" alt="무한스크롤 뷰" src="https://github.com/user-attachments/assets/ab680a44-ab77-4b38-b88d-490f0adc122d">

## 위시리스트 뷰

사용자가 저장한 영화 리스트를 볼 수 있습니다.

### 그리드 뷰

<img width="1493" alt="스크린샷 2024-11-27 오후 2 28 09" src="https://github.com/user-attachments/assets/d0336981-d2a8-406f-9494-827d6c589dfc">

### 테이블 뷰

<img width="1493" alt="스크린샷 2024-11-27 오후 2 29 08" src="https://github.com/user-attachments/assets/82e18db0-6d2d-4f36-beb2-c34e89d1c2fb">

## 모바일 최적화

![Mobile](https://github.com/user-attachments/assets/f8d2d239-188d-4439-b3d1-358b8c4315b0)
---

### 💿 설치/실행

## 필수 요구사항

#### 1) Node.js

- 추천 버전: 16.x 이상 (최소 14.x 이상)

#### 2) npm

- 추천 버전: 7.x 이상 (최소 6.x 이상)

### Install/Run

```
# 저장소 클론
git clone https://ChatHongPT.github.io/Netflix

# 디렉터리 이동
cd Netflix

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로젝트 빌드
npm run build

# 빌드 미리보기
npm run preview
```
### 📁 프로젝트 구조

```
src/
├── assets/          # 이미지 및 전역 스타일과 같은 정적 파일
├── components/      # 재사용 가능한 Vue 컴포넌트
├── composables/     # Vue Composition API 훅
├── directives/      # 커스텀 Vue 디렉티브
├── router/          # Vue Router 설정 파일
├── services/        # API 서비스 및 데이터 가져오기 관련 파일
└── views/           # 페이지 단위 컴포넌트
```

### 📜 개발 가이드

#### Git 컨벤션

##### 브랜치 전략 (GitFlow)

- main: 배포 브랜치
- develop: 개발 브랜치
- feature/*: 기능 개발 브랜치
- gh-pages: 호스팅 브랜치

##### 브랜치 운영 규칙
- 메인기능 개발은 feature/ 브랜치에서 진행
- 개발 완료된 기능은 develop 브랜치로 병합
- develop 브랜치에서 테스트 및 main 브랜치로 전달
- 최종 배포는 main 브랜치에서 수행

### 🔁 CI/CD

#### Github Workflow

```
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # main 브랜치에 푸시될 때 실행

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18 # 사용 중인 Node.js 버전

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```          
---
