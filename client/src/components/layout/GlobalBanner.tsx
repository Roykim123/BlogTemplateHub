import { GraduationCap } from "lucide-react";

// ✅ [전역 배너 컴포넌트] - 모든 페이지에 표시되는 배너들
// 이 컴포넌트는 다음 배너들을 포함합니다:
// 1. 서울AI허브 기업 선정 배너 (오렌지)
// 2. 걱정마AI 튜토리얼 배너 (파란색-보라색)

export function GlobalBanner() {
  return (
    <>
      {/* ✅ [성과 발표 배너] - 상단의 회사 성과를 알리는 배너입니다 */}
      {/* 배너 색상 변경: from-orange-300 via-orange-400 to-orange-500 → from-blue-300 via-blue-400 to-blue-500 등으로 변경 */}
      <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 text-white relative overflow-hidden">
        
        {/* ✅ [배너 장식 효과] - 배너의 시각적 효과를 위한 그라데이션 레이어들 (수정 불필요) */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-orange-300/20 to-orange-400/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center space-x-3 sm:space-x-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* ✅ [트로피 아이콘] - 성과를 나타내는 트로피 아이콘입니다 */}
              {/* 아이콘 색상 변경: text-orange-600 → text-blue-600 등으로 변경 가능 */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-orange-600 text-sm sm:text-base font-bold">🏆</span>
              </div>
              
              {/* ✅ [메인 성과 텍스트] - 선정 소식을 알리는 메인 텍스트입니다 */}
              {/* 텍스트 변경: "2025년 서울AI허브 기업 선정" → 원하는 성과나 소식으로 변경 */}
              <span className="text-sm sm:text-lg font-bold tracking-wide">2025년 서울AI허브 기업 선정</span>
            </div>
            
            {/* ✅ [구분선] - 텍스트 사이의 세로 구분선 (작은 화면에서는 숨김) */}
            <div className="hidden sm:block w-px h-8 bg-white/40"></div>
            
            {/* ✅ [부가 설명 텍스트] - 성과에 대한 추가 설명입니다 */}
            {/* 텍스트 변경: "🎉 경축! AI 혁신 기업으로 선정되었습니다" → 원하는 설명으로 변경 */}
            <span className="text-sm sm:text-base opacity-95 font-medium">🎉 경축! AI 혁신 기업으로 선정되었습니다</span>
          </div>
        </div>
        
        {/* ✅ [장식용 원형 효과] - 배너 우측 상단의 장식 효과 (수정 불필요) */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse"></div>
      </div>

      {/* ✅ [튜토리얼 배너] - 튜토리얼 안내 배너입니다 */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-indigo-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold">걱정마AI 튜토리얼</h2>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-xs sm:text-sm font-medium">📝 정보성 블로그 v2 Upgrade!</span>
              </div>
            </div>
            <p className="text-sm opacity-90 mt-2">AI 콘텐츠 생성의 모든 것을 배워보세요</p>
          </div>
        </div>
        
        {/* 장식용 원형 효과 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </>
  );
}