import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Megaphone, Play, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  // ✅ [게시글 데이터] - 홈페이지에 표시할 인기 게시글 목록입니다
  // 새로운 게시글을 추가하거나 제목을 변경하려면 아래 배열을 수정하세요
  const recentPosts = [
    { id: 1, title: "블로그 수익화 3개월 만에 100만원 돌파!", author: "수익왕", date: "2025-01-20", replies: 24, hot: true },
    { id: 2, title: "딸깍AI로 인스타 팔로워 1만 달성 후기", author: "인플루언서지망생", date: "2025-01-20", replies: 18 },
    { id: 3, title: "ChatGPT 프롬프트 엔지니어링 완전정복", author: "AI전문가김씨", date: "2025-01-19", replies: 31, hot: true },
    { id: 4, title: "네이버 블로그 SEO 최적화 꿀팁 10가지", author: "마케터박", date: "2025-01-19", replies: 15 }
  ];

  // ✅ [공지사항 데이터] - 홈페이지에 표시할 공지사항 목록입니다
  // 새로운 공지사항을 추가하거나 내용을 변경하려면 아래 배열을 수정하세요
  const notices = [
    { id: 1, title: "걱정마AI 서비스 업데이트 안내", date: "2025-01-20", important: true },
    { id: 2, title: "신규 기능 추가 - 기능 사용법", date: "2025-01-19", important: false },
    { id: 3, title: "🎉 2025년 신규 회원 특별 혜택", date: "2025-01-18", important: true },
    { id: 4, title: "AI캐쉬 충전 이벤트 진행중", date: "2025-01-17", important: false }
  ];

  const handleMenuNavigation = (path: string) => {
    window.location.href = path;
  };

  const handleKakaoConsultation = () => {
    window.open('https://open.kakao.com/o/your-consultation-link', '_blank');
  };

  return (
    // ✅ [전체 페이지 배경] - 홈페이지 전체의 배경색과 레이아웃을 설정합니다
    // 배경색 변경: bg-white (밝은 배경) → bg-blue-50 (연한 파란색) 등으로 변경 가능
    // 다크모드 배경: dark:bg-gray-900 (어두운 배경) → dark:bg-blue-900 등으로 변경 가능
    <div className="min-h-full bg-white dark:bg-gray-900 overflow-auto pb-16 md:pb-4">
      
      {/* ✅ [상단 성과 발표 배너] - 회사의 주요 성과나 소식을 알리는 배너입니다 */}
      {/* 배너 색상 변경: from-orange-300 via-orange-400 to-orange-500 → from-blue-300 via-blue-400 to-blue-500 등으로 변경 */}
      <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 text-white relative overflow-hidden">
        
        {/* ✅ [배너 장식 효과들] - 시각적 효과를 위한 그라데이션 레이어들 (건드리지 않아도 됩니다) */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-orange-300/20 to-orange-400/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center space-x-3 sm:space-x-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* ✅ [트로피 아이콘 영역] - 성과를 나타내는 트로피 아이콘 */}
              {/* 아이콘 배경 색상: bg-white → bg-yellow-100 등으로 변경 가능 */}
              {/* 아이콘 색상: text-orange-600 → text-blue-600 등으로 변경 가능 */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-orange-600 text-sm sm:text-base font-bold">🏆</span>
              </div>
              
              {/* ✅ [메인 성과 텍스트] - 주요 성과나 소식의 제목입니다 */}
              {/* 텍스트 변경: "2025년 서울AI허브 기업 선정" 부분을 원하는 내용으로 수정하세요 */}
              <span className="text-sm sm:text-lg font-bold tracking-wide">2025년 서울AI허브 기업 선정</span>
            </div>
            
            {/* ✅ [구분선] - 텍스트들 사이의 세로 구분선 (작은 화면에서는 숨겨짐: hidden sm:block) */}
            <div className="hidden sm:block w-px h-8 bg-white/40"></div>
            
            {/* ✅ [부가 설명 텍스트] - 성과에 대한 추가 설명 또는 축하 메시지 */}
            {/* 텍스트 변경: "🎉 경축! AI 혁신 기업으로 선정되었습니다" 부분을 원하는 내용으로 수정하세요 */}
            <span className="text-sm sm:text-base opacity-95 font-medium">🎉 경축! AI 혁신 기업으로 선정되었습니다</span>
          </div>
        </div>
        
        {/* ✅ [장식용 원형 효과들] - 배너의 시각적 효과를 위한 장식들 (건드리지 않아도 됩니다) */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-pulse"></div>
      </div>

      {/* ✅ [메인 콘텐츠 영역] - 홈페이지의 주요 내용들이 들어가는 영역 */}
      <div className="max-w-6xl mx-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-4 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-100px)]">
          
          {/* ✅ [왼쪽 영역 (60%)] - 게시판과 공지사항이 들어가는 영역 */}
          <div className="lg:col-span-3 grid grid-rows-1 lg:grid-rows-2 gap-2 sm:gap-4">
            
            {/* ✅ [사용자 게시판 카드] - 인기 게시글들을 보여주는 영역 */}
            <Card className="h-auto lg:h-full">
              
              {/* ✅ [게시판 헤더] - 게시판 제목과 더보기 버튼 */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-4">
                
                {/* ✅ [게시판 제목] - "사용자 게시판" 텍스트와 아이콘 */}
                {/* 제목 변경: "사용자 게시판" → "커뮤니티" 등으로 변경 가능 */}
                {/* 아이콘 색상: text-hermes-orange → text-blue-500 등으로 변경 가능 */}
                <CardTitle className="text-sm sm:text-lg font-semibold flex items-center space-x-1 sm:space-x-2">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-hermes-orange" />
                  <span>사용자 게시판</span>
                </CardTitle>
                
                {/* ✅ [더보기 버튼] - 게시판 전체 페이지로 이동하는 버튼 */}
                {/* 버튼 텍스트 변경: "더보기" → "전체보기" 등으로 변경 가능 */}
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">더보기</Button>
              </CardHeader>
              
              {/* ✅ [게시글 목록] - 인기 게시글들이 표시되는 영역 */}
              <CardContent className="space-y-2 max-h-32 sm:max-h-48 overflow-y-auto">
                {recentPosts.slice(0, 3).map((post) => (
                  
                  {/* ✅ [개별 게시글 항목] - 각각의 게시글을 나타내는 박스 */}
                  {/* 배경색 변경: bg-gray-50 → bg-blue-50 등으로 변경 가능 */}
                  {/* 호버 색상: hover:bg-gray-100 → hover:bg-blue-100 등으로 변경 가능 */}
                  <div key={post.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                        
                        {/* ✅ [HOT 뱃지] - 인기 게시글에 표시되는 🔥 표시 */}
                        {/* 뱃지 색상: bg-red-100 text-red-800 → bg-orange-100 text-orange-800 등으로 변경 가능 */}
                        {post.hot && (
                          <span className="inline-flex items-center px-1 sm:px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            🔥
                          </span>
                        )}
                      </div>
                      
                      {/* ✅ [게시글 제목] - 각 게시글의 제목 텍스트 */}
                      {/* 제목 색상: text-gray-900 → text-blue-900 등으로 변경 가능 */}
                      {/* 호버 색상: group-hover:text-hermes-orange → group-hover:text-blue-600 등으로 변경 가능 */}
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-hermes-orange transition-colors">
                        {post.title}
                      </h4>
                      
                      {/* ✅ [게시글 정보] - 작성자와 날짜 (작은 화면에서는 숨김: hidden sm:block) */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
                        {post.author} · {post.date}
                      </p>
                    </div>
                    
                    {/* ✅ [댓글 수] - 게시글의 댓글 개수를 표시 */}
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <MessageSquare className="h-3 w-3" />
                      <span>{post.replies}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ✅ [공지사항 카드] - 공지사항들을 보여주는 영역 (큰 화면에서만 표시: hidden lg:block) */}
            <Card className="h-auto lg:h-full hidden lg:block">
              
              {/* ✅ [공지사항 헤더] - 공지사항 제목과 더보기 버튼 */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-4">
                
                {/* ✅ [공지사항 제목] - "공지사항" 텍스트와 확성기 아이콘 */}
                {/* 제목 변경: "공지사항" → "새소식" 등으로 변경 가능 */}
                <CardTitle className="text-sm sm:text-lg font-semibold flex items-center space-x-1 sm:space-x-2">
                  <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 text-hermes-orange" />
                  <span>공지사항</span>
                </CardTitle>
                
                {/* ✅ [더보기 버튼] - 공지사항 전체 페이지로 이동하는 버튼 */}
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">더보기</Button>
              </CardHeader>
              
              {/* ✅ [공지사항 목록] - 공지사항들이 표시되는 영역 */}
              <CardContent className="space-y-2 max-h-32 sm:max-h-48 overflow-y-auto">
                {notices.slice(0, 3).map((notice) => (
                  
                  {/* ✅ [개별 공지사항 항목] - 각각의 공지사항을 나타내는 박스 */}
                  <div key={notice.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                        
                        {/* ✅ [중요 공지 뱃지] - 중요한 공지사항에 표시되는 "중요" 표시 */}
                        {/* 뱃지 색상: bg-red-100 text-red-800 → bg-yellow-100 text-yellow-800 등으로 변경 가능 */}
                        {notice.important && (
                          <Badge variant="destructive" className="text-xs px-1 sm:px-2 py-0.5">
                            중요
                          </Badge>
                        )}
                      </div>
                      
                      {/* ✅ [공지사항 제목] - 각 공지사항의 제목 텍스트 */}
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-hermes-orange transition-colors">
                        {notice.title}
                      </h4>
                      
                      {/* ✅ [공지사항 날짜] - 공지사항 작성 날짜 */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notice.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ✅ [오른쪽 영역 (40%)] - 프리미엄 콘텐츠와 버튼들이 들어가는 영역 */}
          <div className="lg:col-span-2 grid grid-rows-1 lg:grid-rows-2 gap-2 sm:gap-4">
            
            {/* ✅ [프리미엄 콘텐츠 카드] - 업그레이드 안내와 동영상이 들어가는 영역 */}
            <Card className="h-auto lg:h-full relative overflow-hidden">
              
              {/* ✅ [프리미엄 콘텐츠 배경] - 그라데이션 배경 효과 */}
              {/* 배경 색상 변경: from-hermes-orange/10 via-orange-200/20 to-orange-300/30 → from-blue-200/10 등으로 변경 */}
              <div className="absolute inset-0 bg-gradient-to-br from-hermes-orange/10 via-orange-200/20 to-orange-300/30"></div>
              
              <CardContent className="p-3 sm:p-4 relative z-10 h-full flex flex-col">
                
                {/* ✅ [업그레이드 안내 섹션] - 상단의 업그레이드 정보 */}
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-hermes-orange to-orange-600 rounded-lg text-white shadow-lg">
                  
                  {/* ✅ [업그레이드 제목] - "정보성 블로그 v2 Upgrade!" 텍스트 */}
                  {/* 제목 변경: "📝 정보성 블로그 v2 Upgrade!" → 원하는 제목으로 변경 가능 */}
                  <h4 className="font-bold mb-1 text-xs sm:text-sm text-white">
                    📝 정보성 블로그 v2 Upgrade!
                  </h4>
                  
                  {/* ✅ [업그레이드 특징 리스트] - 각 항목은 새로운 기능을 설명합니다 */}
                  {/* 각 <p> 태그 안의 텍스트를 변경하거나 새로운 항목을 추가할 수 있습니다 */}
                  <div className="text-xs mb-2 text-white/90">
                    
                    {/* 🔹 첫 번째 특징 - 정보 정확성 */}
                    <p>• 더 정확한 정보 제공과 최신 트렌드 반영</p>
                    
                    {/* 🔹 두 번째 특징 - SEO 최적화 */}
                    <p>• SEO 최적화된 글 구조로 검색 노출 향상</p>
                    
                    {/* 🔹 세 번째 특징 - 템플릿 (작은 화면에서는 숨김: hidden sm:block) */}
                    <p className="hidden sm:block">
                      • 다양한 템플릿과 스타일 옵션 추가
                    </p>
                    
                    {/* 🔹 네 번째 특징 - 속도와 품질 (작은 화면에서는 숨김: hidden sm:block) */}
                    <p className="hidden sm:block">
                      • 빠른 생성 속도와 향상된 품질
                    </p>
                  </div>
                  
                  {/* ✅ [가격 정보] - 월 구독료 정보 */}
                  {/* 가격 변경: "월 99,000원" → 원하는 가격으로 변경 가능 */}
                  <div className="text-xs font-semibold text-white/95">
                    월 99,000원 (Basic 플랜)
                  </div>
                </div>

                {/* ✅ [동영상 영역] - 프리미엄 콘텐츠 미리보기 동영상 */}
                <div className="flex-1 min-h-[120px] sm:min-h-[200px] relative">
                  
                  {/* ✅ [동영상 제목] - 동영상 위에 표시되는 제목 */}
                  {/* 제목 변경: "프리미엄 콘텐츠 미리보기" → 원하는 제목으로 변경 가능 */}
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
                    프리미엄 콘텐츠 미리보기
                  </h3>
                  
                  {/* ✅ [YouTube 동영상 임베드] - 실제 동영상이 재생되는 영역 */}
                  {/* 동영상 변경: src 주소의 VIDEO_ID 부분을 바꾸면 다른 YouTube 동영상으로 변경됩니다 */}
                  <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-lg">
                    {isAuthenticated ? (
                      <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=1&modestbranding=1&rel=0"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="프리미엄 콘텐츠 미리보기"
                      />
                    ) : (
                      
                      {/* ✅ [로그인 전 표시 영역] - 로그인하지 않은 사용자에게 보이는 내용 */}
                      <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-2 sm:space-y-3">
                        
                        {/* ✅ [재생 버튼 아이콘] */}
                        <Play className="h-8 w-8 sm:h-12 sm:w-12" />
                        
                        {/* ✅ [로그인 안내 텍스트] - 로그인 유도 메시지 */}
                        {/* 텍스트 변경: 아래 내용을 원하는 메시지로 변경 가능 */}
                        <p className="text-xs sm:text-sm text-center px-2">
                          로그인하면 프리미엄 콘텐츠를<br />
                          미리 체험할 수 있습니다
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ✅ [퀵 액션 버튼들] - 주요 기능 바로가기 버튼들 */}
            <Card className="h-auto lg:h-full">
              <CardContent className="p-3 sm:p-4 h-full flex flex-col justify-center space-y-2 sm:space-y-3">
                
                {/* ✅ [딸깍AI 버튼] - 자동포스팅 기능 바로가기 */}
                {/* 버튼 색상: bg-hermes-orange hover:bg-orange-600 → bg-blue-500 hover:bg-blue-600 등으로 변경 */}
                {/* 버튼 텍스트: "🚀 딸깍AI 자동포스팅" → 원하는 텍스트로 변경 가능 */}
                <Button 
                  onClick={() => handleMenuNavigation('/automation')}
                  className="w-full bg-hermes-orange hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 text-xs sm:text-sm"
                >
                  🚀 딸깍AI 자동포스팅
                </Button>
                
                {/* ✅ [챌린저 버튼] - 7일 미션 바로가기 */}
                {/* 버튼 텍스트: "⚡ 7일 챌린저" → 원하는 텍스트로 변경 가능 */}
                <Button 
                  onClick={() => handleMenuNavigation('/challenger')}
                  variant="outline" 
                  className="w-full font-semibold py-2 sm:py-3 text-xs sm:text-sm border-hermes-orange text-hermes-orange hover:bg-hermes-orange hover:text-white"
                >
                  ⚡ 7일 챌린저
                </Button>
                
                {/* ✅ [카카오 상담 버튼] - 카카오톡 상담 바로가기 */}
                {/* 버튼 텍스트: "💬 카카오 1:1 상담" → 원하는 텍스트로 변경 가능 */}
                <Button 
                  onClick={handleKakaoConsultation}
                  variant="outline" 
                  className="w-full font-semibold py-2 sm:py-3 text-xs sm:text-sm"
                >
                  💬 카카오 1:1 상담
                </Button>
                
                {/* ✅ [업그레이드 버튼] - 구독 업그레이드 바로가기 */}
                {/* 버튼 텍스트: "⭐ 프리미엄 업그레이드" → 원하는 텍스트로 변경 가능 */}
                <Button 
                  onClick={() => handleMenuNavigation('/payment')}
                  variant="outline" 
                  className="w-full font-semibold py-2 sm:py-3 text-xs sm:text-sm border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white"
                >
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  ⭐ 프리미엄 업그레이드
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}