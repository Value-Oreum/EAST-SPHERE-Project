# 동구(EAST SPHERE) 조성사업 — HTML 디지털 제안서

대구 동구청 정책사업 제안서 | 금호강 관광벨트 디지털 랜드마크 조성사업

---

## 프로젝트 구조

```
HTML Proposal/
├── index.html              # 메인 제안서 페이지
├── css/
│   └── style.css           # 전체 스타일시트
├── js/
│   └── main.js             # 인터랙션 스크립트
├── assets/
│   ├── images/             # 이미지 파일 (Main.png, 1.png ~ 11.png)
│   └── videos/             # 동영상 파일 (별도 추가 필요)
├── README.md               # 이 문서
└── East Sphere proposal_0615.pdf  # 원본 제안서 PDF
```

---

## 로컬 실행 방법

### 방법 1 — 브라우저에서 직접 열기
`index.html` 파일을 Chrome, Edge, Safari 등 최신 브라우저에서 직접 열면 됩니다.

### 방법 2 — 로컬 서버 실행 (권장)
이미지·동영상 경로 이슈 없이 완전히 동작하려면 간단한 로컬 서버를 사용하세요.

```bash
# Python 3
python -m http.server 8080

# Node.js (npx 사용)
npx serve .

# VS Code — Live Server 익스텐션 사용
```

브라우저에서 `http://localhost:8080` 접속

---

## 동영상 추가 방법

1. 동영상 파일(`.mp4` 권장)을 `assets/videos/` 폴더에 복사합니다.
2. `index.html`의 Video Section에서 `<!-- video 태그 주석 -->` 부분을 해제합니다:

```html
<video autoplay muted loop playsinline controls preload="metadata">
  <source src="assets/videos/your-video.mp4" type="video/mp4">
  <p>브라우저가 동영상을 지원하지 않습니다.</p>
</video>
```

3. `src="assets/videos/your-video.mp4"` 경로를 실제 파일명으로 수정합니다.

---

## GitHub Pages 배포 방법

### 새 저장소에 처음 올리는 경우

```bash
git init
git remote add origin https://github.com/Value-Oreum/EAST-SPHERE-Project.git
git add .
git commit -m "Create EAST SPHERE HTML proposal"
git branch -M main
git push -u origin main
```

### 이미 저장소가 연결된 경우

```bash
git add .
git commit -m "Update EAST SPHERE HTML proposal"
git push
```

### GitHub Pages 활성화

1. GitHub 저장소 → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)` 선택 → **Save**
4. 잠시 후 `https://Value-Oreum.github.io/EAST-SPHERE-Project/` 에서 접근 가능

---

## 기술 스택

- HTML5 / CSS3 / Vanilla JavaScript
- 외부 의존성: Google Fonts (Noto Sans KR) — 오프라인 환경에서는 시스템 폰트로 폴백
- 별도 프레임워크/빌드 도구 없음 — 정적 파일 그대로 배포 가능

---

## 제안 기관

OREUM Inc. & DK Global  
문의: narrsis01@gmail.com / eastsea.chae@gmail.com

---

Copyright © 2026 OREUM Inc. All Rights Reserved
