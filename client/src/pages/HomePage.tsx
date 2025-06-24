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

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full max-h-[calc(100vh-100px)]">
        {/* Left 60% - 2 vertical sections */}
        <div className="lg:col-span-3 grid grid-rows-2 gap-4">
          {/* Top Left - Message Board */}
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-hermes-orange" />
                <span>사용자 게시판</span>
              </CardTitle>
              <Button variant="outline" size="sm">더보기</Button>
            </CardHeader>
            <CardContent className="space-y-2 max-h-48 overflow-y-auto">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {post.hot && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          🔥 HOT
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-hermes-orange transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {post.author} · {post.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <MessageSquare className="h-3 w-3" />
                    <span>{post.replies}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bottom Left - Notice Section */}
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Megaphone className="h-5 w-5 text-hermes-orange" />
                <span>공지사항</span>
              </CardTitle>
              <Button variant="outline" size="sm">전체보기</Button>
            </CardHeader>
            <CardContent className="space-y-2 max-h-48 overflow-y-auto">
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
        <div className="lg:col-span-2 grid grid-rows-2 gap-4">
          {/* Top Right - Tutorial Video */}
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Play className="h-5 w-5 text-hermes-orange" />
                <span>튜토리얼 영상</span>
                {isAuthenticated && (
                  <Badge className="bg-green-100 text-green-800 text-xs">자동재생</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0${isAuthenticated ? '&autoplay=1' : ''}`}
                  title="걱정마AI 사용법"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  걱정마AI 시작하기 - 기본 사용법
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  초보자를 위한 완벽한 AI 글쓰기 가이드를 확인해보세요.
                  {isAuthenticated ? ' 자동재생 중!' : ' 로그인하면 자동재생됩니다.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Right - Premium Content Section */}
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Star className="h-5 w-5 text-hermes-orange" />
                <span>프리미엄 콘텐츠</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              <div 
                className="bg-gradient-to-r from-hermes-orange to-soft-pink text-white p-3 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              >
                <h4 className="font-semibold mb-1 text-sm flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  🎥 고급 AI 활용법
                </h4>
                <p className="text-xs opacity-90 mb-2">
                  전문가만 아는 AI 글쓰기 노하우를 공개합니다.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-75">15분 강의</span>
                  <Button 
                    size="sm" 
                    className="bg-white text-hermes-orange hover:bg-gray-50 text-xs h-6"
                  >
                    YouTube에서 보기
                  </Button>
                </div>
              </div>
              
              <div 
                className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              >
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 text-sm flex items-center">
                  <Play className="h-4 w-4 mr-2 text-hermes-orange" />
                  📚 마스터 클래스
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  AI를 활용한 마케팅 전략과 실전 기법을 배워보세요.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">25분 강의</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-6"
                  >
                    YouTube에서 보기
                  </Button>
                </div>
              </div>

              <div 
                className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              >
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 text-sm flex items-center">
                  <Play className="h-4 w-4 mr-2 text-hermes-orange" />
                  🚀 실전 프로젝트
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  실제 프로젝트를 통해 AI 도구 활용법을 익혀보세요.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">35분 강의</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-6"
                  >
                    YouTube에서 보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}