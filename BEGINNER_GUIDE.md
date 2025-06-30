# 🔧 초보자를 위한 UI 수정 가이드

이 가이드는 비개발자도 쉽게 텍스트와 색상을 변경할 수 있도록 작성되었습니다.

## 📁 주요 파일 위치

### 1. 홈페이지 수정
**파일**: `client/src/pages/HomePage.tsx`
- 메인 화면의 모든 텍스트와 색상을 관리합니다
- 성과 배너, 게시글 목록, 프리미엄 콘텐츠 등이 포함됩니다

### 2. 사이드바 네비게이션 수정
**파일**: `client/src/components/layout/Sidebar.tsx`
- 왼쪽 메뉴와 모바일 하단 메뉴를 관리합니다
- 메뉴 이름, 아이콘, 색상을 변경할 수 있습니다

## 🎨 색상 변경 방법

### 기본 색상 클래스
```
bg-white (흰색 배경)
bg-blue-50 (연한 파란색 배경)
bg-gray-100 (연한 회색 배경)
bg-red-500 (빨간색 배경)
bg-green-500 (초록색 배경)
bg-orange-500 (주황색 배경)

text-white (흰색 글자)
text-black (검은색 글자)
text-blue-600 (파란색 글자)
text-red-600 (빨간색 글자)
text-gray-900 (진한 회색 글자)
```

### 브랜드 컬러 (hermes-orange)
현재 주황색 브랜드 컬러를 다른 색으로 변경하려면:
- `text-hermes-orange` → `text-blue-600`
- `bg-hermes-orange` → `bg-blue-600`
- `border-hermes-orange` → `border-blue-600`

## 📝 텍스트 변경 방법

### 1. 메뉴 이름 변경
**파일**: `client/src/components/layout/Sidebar.tsx`
```tsx
// 예시: "딸깍AI 자동포스팅" → "AI 자동화"
{ id: "sns-auto", label: "AI 자동화", icon: Zap, path: "/sns-auto" }
```

### 2. 홈페이지 배너 텍스트 변경
**파일**: `client/src/pages/HomePage.tsx`
```tsx
// 성과 텍스트 변경
<span>2025년 서울AI허브 기업 선정</span>
// ↓ 변경
<span>새로운 성과나 소식</span>
```

### 3. 버튼 텍스트 변경
```tsx
// 버튼 텍스트 변경
<Button>🚀 딸깍AI 자동포스팅</Button>
// ↓ 변경
<Button>🚀 새로운 버튼명</Button>
```

## 🖼️ 아이콘 변경 방법

### 사용 가능한 아이콘들
```tsx
Home (집 모양)
Zap (번개 모양)
MessageCircle (메시지 원형)
Trophy (트로피)
User (사용자)
Star (별)
Play (재생 버튼)
Settings (설정 톱니바퀴)
```

### 아이콘 변경 예시
```tsx
// 기존
{ id: "sns-auto", label: "자동포스팅", icon: Zap, path: "/sns-auto" }
// ↓ 변경
{ id: "sns-auto", label: "자동포스팅", icon: Star, path: "/sns-auto" }
```

## 📱 반응형 디스플레이

### 화면 크기별 표시/숨김
```tsx
// 작은 화면에서만 표시
<div className="block sm:hidden">모바일에서만 보임</div>

// 큰 화면에서만 표시
<div className="hidden sm:block">PC에서만 보임</div>

// 중간 화면 이상에서만 표시
<div className="hidden md:block">태블릿 이상에서 보임</div>
```

## ⚠️ 주의사항

### 1. 따옴표 주의
- 텍스트는 반드시 따옴표 안에 넣어주세요
- `"텍스트"` 또는 `'텍스트'` 형태로 작성

### 2. 태그 구조 유지
- `<div>`, `<span>`, `<Button>` 등의 태그는 열었으면 반드시 닫아주세요
- `<div>내용</div>` 형태로 작성

### 3. 클래스명 공백 주의
- `className="bg-white text-black"` (올바름)
- `className="bg-white text-black"` (공백으로 구분)

## 🎯 주요 수정 포인트

### 1. 회사 성과 배너 (HomePage.tsx)
```tsx
// 37-67번째 줄 근처
<span>2025년 서울AI허브 기업 선정</span>
<span>🎉 경축! AI 혁신 기업으로 선정되었습니다</span>
```

### 2. 프리미엄 콘텐츠 제목 (HomePage.tsx)
```tsx
// 업그레이드 제목
<h4>📝 정보성 블로그 v2 Upgrade!</h4>

// 특징 리스트
<p>• 더 정확한 정보 제공과 최신 트렌드 반영</p>
<p>• SEO 최적화된 글 구조로 검색 노출 향상</p>
```

### 3. 버튼 텍스트 (HomePage.tsx)
```tsx
<Button>🚀 딸깍AI 자동포스팅</Button>
<Button>⚡ 7일 챌린저</Button>
<Button>💬 카카오 1:1 상담</Button>
<Button>⭐ 프리미엄 업그레이드</Button>
```

### 4. 메뉴 구조 (Sidebar.tsx)
```tsx
// menuSections 배열에서 수정
{
  title: "자동화 기능", // 섹션 제목
  items: [
    { id: "sns-auto", label: "딸깍AI 자동포스팅", icon: Zap, path: "/sns-auto" },
    // 새 메뉴 추가나 기존 메뉴 수정
  ]
}
```

이 가이드를 참고하여 원하는 텍스트와 색상을 자유롭게 변경하세요!