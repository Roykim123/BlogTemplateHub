import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Megaphone, Play, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const recentPosts = [
    { id: 1, title: "블로그 수익화 3개월 만에 100만원 돌파!", author: "수익왕", date: "2025-01-20", replies: 24, hot: true },
    { id: 2, title: "딸깍AI로 인스타 팔로워 1만 달성 후기", author: "인플루언서지망생", date: "2025-01-20", replies: 18 },
    { id: 3, title: "ChatGPT 프롬프트 엔지니어링 완전정복", author: "AI전문가김씨", date: "2025-01-19", replies: 31, hot: true },
    { id: 4, title: "네이버 블로그 SEO 최적화 꿀팁 10가지", author: "마케터박", date: "2025-01-19", replies: 15 }
  ];

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
    <div className="min-h-full bg-white dark:bg-gray-900 overflow-auto pb-16 md:pb-4">
      {/* Achievement Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-2 sm:py-3">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-blue-900 text-xs sm:text-sm font-bold">🏆</span>
              </div>
              <span className="text-xs sm:text-base font-bold">2025년 서울AI허브 기업 선정</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <span className="text-xs sm:text-sm opacity-90">🎉 경축! AI 혁신 기업으로 선정되었습니다</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-4 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-100px)]">
          {/* Left 60% - 2 vertical sections */}
          <div className="lg:col-span-3 grid grid-rows-1 lg:grid-rows-2 gap-2 sm:gap-4">
            {/* Top Left - Message Board */}
            <Card className="h-auto lg:h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-4">
                <CardTitle className="text-sm sm:text-lg font-semibold flex items-center space-x-1 sm:space-x-2">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-hermes-orange" />
                  <span>사용자 게시판</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">더보기</Button>
              </CardHeader>
              <CardContent className="space-y-2 max-h-32 sm:max-h-48 overflow-y-auto">
                {recentPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                        {post.hot && (
                          <span className="inline-flex items-center px-1 sm:px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            🔥
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-hermes-orange transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
                        {post.author} · {post.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <MessageSquare className="h-3 w-3" />
                      <span>{post.replies}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bottom Left - Notice Section - Hidden on mobile */}
            <Card className="h-auto lg:h-full hidden lg:block">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-4">
                <CardTitle className="text-sm sm:text-lg font-semibold flex items-center space-x-1 sm:space-x-2">
                  <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 text-hermes-orange" />
                  <span>공지사항</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">전체보기</Button>
              </CardHeader>
              <CardContent className="space-y-2 max-h-32 sm:max-h-48 overflow-y-auto">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {notice.important && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            중요
                          </span>
                        )}
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {notice.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notice.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right 40% - 2 vertical sections */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-2 sm:gap-4">
            {/* Top Right - Tutorial Video */}
            <Card className="h-full">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-sm sm:text-lg font-semibold flex items-center space-x-1 sm:space-x-2 flex-wrap">
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 text-hermes-orange" />
                  <span className="truncate">튜토리얼 영상</span>
                  {isAuthenticated && (
                    <Badge className="bg-green-100 text-green-800 text-xs whitespace-nowrap">자동재생</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col p-2 sm:p-6">
                <div className="relative w-full flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0&loop=1&playlist=dQw4w9WgXcQ${isAuthenticated ? '&autoplay=1' : ''}`}
                    title="걱정마AI 사용법"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-2 sm:mt-3 flex-shrink-0">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 line-clamp-1">
                    걱정마AI 시작하기 - 기본 사용법
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                    초보자를 위한 완벽한 AI 글쓰기 가이드를 확인해보세요.
                    {isAuthenticated ? ' 자동재생 중!' : ' 로그인하면 자동재생됩니다.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Right - Premium Content Section */}
            <Card className="h-full">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-sm sm:text-lg font-semibold flex items-center space-x-1 sm:space-x-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-hermes-orange" />
                  <span>프리미엄 콘텐츠</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto p-2 sm:p-6">
                <div 
                  className="bg-gradient-to-r from-hermes-orange to-soft-pink text-white p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleMenuNavigation('/tutorial')}
                >
                  <h4 className="font-bold mb-1 text-xs sm:text-sm" style={{color: 'white'}}>🎥 고급 AI활용법</h4>
                  <p className="text-xs mb-2 hidden sm:block" style={{color: 'rgba(255,255,255,0.9)'}}>전문가만 아는 AI 글쓰기 노하우를 배워보세요</p>
                  <Button 
                    size="sm" 
                    className="bg-white text-hermes-orange hover:bg-gray-50 text-xs h-5 sm:h-6 w-full font-medium"
                  >
                    튜토리얼 페이지로 이동
                  </Button>
                </div>
                
                <div 
                  className="border border-hermes-orange bg-orange-50 dark:bg-orange-900/20 p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleMenuNavigation('/challenger')}
                >
                  <h4 className="font-semibold mb-1 text-xs sm:text-sm" style={{color: '#f97316'}}>🏆 7일 챌린지</h4>
                  <p className="text-xs mb-2 hidden sm:block" style={{color: '#374151'}}>AI 마스터가 되는 7일간의 특별한 여정</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-hermes-orange text-hermes-orange hover:bg-hermes-orange hover:text-white text-xs h-5 sm:h-6 w-full"
                  >
                    챌린지 참여하기
                  </Button>
                </div>

                <div 
                  className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={handleKakaoConsultation}
                >
                  <h4 className="font-semibold mb-1 text-xs sm:text-sm" style={{color: '#111827'}}>💬 1:1 컨설팅</h4>
                  <p className="text-xs mb-2 hidden sm:block" style={{color: '#4b5563'}}>개인 맞춤형 AI 활용 전략을 상담받아보세요</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-5 sm:h-6 w-full"
                  >
                    카카오톡 상담하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}