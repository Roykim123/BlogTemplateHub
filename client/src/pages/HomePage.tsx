import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Megaphone, Play, Star } from "lucide-react";

export default function HomePage() {
  const recentPosts = [
    { id: 1, title: "AI 글쓰기 팁과 노하우", author: "관리자", date: "2025-01-20", replies: 5 },
    { id: 2, title: "새로운 템플릿 업데이트 안내", author: "운영팀", date: "2025-01-19", replies: 12 },
    { id: 3, title: "GPT 활용법 질문드려요", author: "사용자123", date: "2025-01-18", replies: 8 },
    { id: 4, title: "블로그 자동화 성공 후기", author: "블로거A", date: "2025-01-17", replies: 15 }
  ];

  const notices = [
    { id: 1, title: "정기 점검 안내 (1월 25일)", date: "2025-01-20", important: true },
    { id: 2, title: "새로운 AI 기능 업데이트", date: "2025-01-19", important: false },
    { id: 3, title: "프리미엄 요금제 할인 이벤트", date: "2025-01-18", important: true },
    { id: 4, title: "사용자 가이드 개선 안내", date: "2025-01-17", important: false }
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        {/* Left 60% - 2 vertical sections */}
        <div className="lg:col-span-3 grid grid-rows-2 gap-6">
          {/* Top Left - Message Board */}
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-hermes-orange" />
                <span>사용자 게시판</span>
              </CardTitle>
              <Button variant="outline" size="sm">더보기</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
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
            <CardContent className="space-y-3">
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
        <div className="lg:col-span-2 grid grid-rows-2 gap-6">
          {/* Top Right - YouTube Video */}
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Play className="h-5 w-5 text-hermes-orange" />
                <span>튜토리얼 영상</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="걱정마AI 사용법"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  걱정마AI 시작하기 - 기본 사용법
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  초보자를 위한 완벽한 AI 글쓰기 가이드를 확인해보세요.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Right - Premium Video Section */}
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Star className="h-5 w-5 text-hermes-orange" />
                <span>프리미엄 콘텐츠</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-hermes-orange to-soft-pink text-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🎥 고급 AI 활용법</h4>
                <p className="text-sm opacity-90 mb-3">
                  전문가만 아는 AI 글쓰기 노하우를 공개합니다.
                </p>
                <Button 
                  size="sm" 
                  className="bg-white text-hermes-orange hover:bg-gray-50"
                >
                  지금 시청하기
                </Button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  📚 마스터 클래스
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  블로그 수익화부터 SEO 최적화까지
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  자세히 보기
                </Button>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  🎯 1:1 컨설팅
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  개인 맞춤형 AI 활용 전략 상담
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  예약하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}