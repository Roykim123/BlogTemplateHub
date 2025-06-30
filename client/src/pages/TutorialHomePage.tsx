import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  Play, 
  BookOpen, 
  Zap, 
  TrendingUp, 
  Users,
  Star,
  Clock,
  CheckCircle,
  GraduationCap
} from "lucide-react";

// ✅ [유튜브 영상 변경 가이드]
// 새로운 유튜브 영상으로 바꾸는 방법:
// 1. 유튜브에서 원하는 영상의 URL을 복사합니다
//    예시: https://www.youtube.com/watch?v=dQw4w9WgXcQ
// 2. URL에서 "v=" 뒤의 부분을 찾습니다 (이것이 embedId입니다)
//    예시: dQw4w9WgXcQ
// 3. 아래 tutorialVideos 배열에서 해당 영상의 embedId를 새로운 값으로 변경합니다
// 4. title과 description도 새로운 영상에 맞게 수정합니다

function TutorialHomePage() {
  const { isAuthenticated } = useAuth();
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);

  // ✅ [유튜브 영상 설정] - 튜토리얼에 표시할 영상들을 관리합니다
  // 영상을 변경하려면 아래 정보들을 수정하세요:
  // - title: 영상 제목
  // - description: 영상 설명
  // - duration: 영상 길이 (MM:SS 형식)
  // - embedId: 유튜브 영상 ID (URL에서 v= 뒤의 부분)
  //   예시: https://www.youtube.com/watch?v=dQw4w9WgXcQ → embedId는 "dQw4w9WgXcQ"
  const tutorialVideos = [
    {
      id: 1,
      title: "걱정마AI 시작하기 - 기본 사용법", // ✅ 1번 영상 제목 (원하는 제목으로 변경하세요)
      description: "초보자를 위한 완벽한 AI 글쓰기 가이드", // ✅ 1번 영상 설명
      duration: "12:45", // ✅ 1번 영상 길이
      level: "초급",
      embedId: "dQw4w9WgXcQ", // ✅ 1번 영상 ID - 이 부분을 변경하면 다른 영상이 재생됩니다
      category: "기초",
      autoplay: true // ✅ 1번 영상은 자동재생됩니다
    },
    {
      id: 2,
      title: "딸깍AI SNS 자동화 완벽 활용법", // ✅ 2번 영상 제목
      description: "인스타그램, 페이스북 자동 포스팅 마스터하기", // ✅ 2번 영상 설명
      duration: "18:30", // ✅ 2번 영상 길이
      level: "중급",
      embedId: "9bZkp7q19f0", // ✅ 2번 영상 ID
      category: "자동화"
    },
    {
      id: 3,
      title: "블로그 템플릿으로 수익형 글쓰기", // ✅ 3번 영상 제목
      description: "SEO 최적화된 블로그 글로 수익 창출하는 방법", // ✅ 3번 영상 설명
      duration: "25:15", // ✅ 3번 영상 길이
      level: "중급",
      embedId: "kJQP7kiw5Fk", // ✅ 3번 영상 ID
      category: "블로그"
    },
    {
      id: 4,
      title: "AI 캐시 활용과 챌린저 미션 공략법", // ✅ 4번 영상 제목
      description: "7일 챌린지 완주하고 최대 혜택 받는 전략", // ✅ 4번 영상 설명
      duration: "15:20", // ✅ 4번 영상 길이
      level: "고급",
      embedId: "lDK9QqIzhwk", // ✅ 4번 영상 ID
      category: "전략"
    }
  ];

  const handleVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  const handleMenuNavigation = (path: string) => {
    window.location.href = path;
  };

  const progressPercentage = (completedVideos.length / tutorialVideos.length) * 100;

  return (
    <div className="min-h-full bg-white dark:bg-gray-900 overflow-auto pb-16 md:pb-4">
      
      {/* Tutorial Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-indigo-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">걱정마AI 튜토리얼</h1>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">📝 정보성 블로그 v2 Upgrade!</span>
              </div>
            </div>
            <p className="text-lg opacity-90 mb-6">AI 콘텐츠 생성의 모든 것을 배워보세요</p>
            
            {/* ✅ [학습 진도 표시] - 1,2,3,4 숫자로 진도를 표시합니다 */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">학습 진도</span>
                <span className="text-sm font-semibold">{completedVideos.length}/4 완료</span>
              </div>
              
              {/* 숫자 진도 표시 */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3, 4].map((num) => {
                  const isCompleted = completedVideos.includes(num);
                  return (
                    <div
                      key={num}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        isCompleted
                          ? 'bg-white text-blue-600 shadow-lg scale-110'
                          : 'bg-white/30 text-white border-2 border-white/50'
                      }`}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
              
              {/* 기존 진도바도 유지 */}
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        
        {/* Tutorial Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {tutorialVideos.map((video) => {
            const isCompleted = completedVideos.includes(video.id);
            
            return (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Play className="h-5 w-5 text-blue-600" />
                        <span className="line-clamp-2">{video.title}</span>
                        {isCompleted && <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />}
                      </CardTitle>
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge variant={video.level === "초급" ? "default" : video.level === "중급" ? "secondary" : "destructive"}>
                          {video.level}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* ✅ [유튜브 플레이어] - 영상이 재생되는 영역입니다 */}
                  <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {/* 좌측 상단 영상 번호 표시 */}
                    <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {video.id}번
                    </div>
                    
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.embedId}?controls=1&modestbranding=1&rel=0${video.autoplay ? '&autoplay=1' : ''}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Video Description */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant={isCompleted ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVideoComplete(video.id)}
                        className="flex items-center space-x-2"
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            <span>완료됨</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            <span>시청 완료</span>
                          </>
                        )}
                      </Button>
                      
                      {video.category === "자동화" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMenuNavigation('/sns-auto')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          실습하기 →
                        </Button>
                      )}
                      
                      {video.category === "블로그" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMenuNavigation('/blog-templates')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          실습하기 →
                        </Button>
                      )}
                      
                      {video.category === "전략" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMenuNavigation('/challenger')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          챌린지 참여 →
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card 
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleMenuNavigation('/sns-auto')}
          >
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">딸깍AI 시작하기</h3>
              <p className="text-sm opacity-90">자동 포스팅으로 SNS 운영 자동화</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleMenuNavigation('/blog-templates')}
          >
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">블로그 템플릿</h3>
              <p className="text-sm opacity-90">SEO 최적화된 수익형 블로그 작성</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleMenuNavigation('/challenger')}
          >
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">7일 챌린지</h3>
              <p className="text-sm opacity-90">AI 마스터 되는 특별한 여정</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Progress Summary */}
        {completedVideos.length > 0 && (
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                    학습 진행 상황
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    {completedVideos.length}개 영상을 완료했습니다! 
                    {completedVideos.length === tutorialVideos.length && " 🎉 모든 튜토리얼을 완주하셨네요!"}
                  </p>
                </div>
                {completedVideos.length === tutorialVideos.length && (
                  <Button 
                    onClick={() => handleMenuNavigation('/challenger')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    챌린지 도전하기
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default TutorialHomePage;