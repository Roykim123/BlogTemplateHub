import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Zap, Users, Calendar, Play, CheckCircle, Target, Trophy, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const quickStats = [
    { label: "총 사용자", value: "15,247명", change: "+12.3%", icon: Users, color: "text-blue-600" },
    { label: "AI 글 생성", value: "128K+", change: "+24.7%", icon: Zap, color: "text-purple-600" },
    { label: "블로그 자동화", value: "3,421개", change: "+18.2%", icon: Trophy, color: "text-green-600" },
    { label: "평균 만족도", value: "4.8/5", change: "+0.3", icon: Star, color: "text-orange-600" }
  ];

  const aiTools = [
    { id: "sns-auto", name: "딸깍AI 자동포스팅", description: "SNS 콘텐츠 자동 생성 및 발행", users: "2.1K", rating: 4.9, hot: true },
    { id: "blog-templates", name: "블로그 템플릿", description: "SEO 최적화 블로그 글 템플릿", users: "1.8K", rating: 4.8 },
    { id: "insta-threads", name: "인스타/쓰레드 템플릿", description: "소셜미디어 전용 콘텐츠", users: "1.5K", rating: 4.7 },
    { id: "youtube-auto", name: "유튜브 자동화", description: "유튜브 콘텐츠 기획 및 제작", users: "900", rating: 4.6, badge: "예정" }
  ];

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            AI와 함께하는 
            <span className="bg-gradient-to-r from-hermes-orange to-soft-pink bg-clip-text text-transparent"> 스마트한 일상</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            걱정마AI로 당신의 생산성을 높이고, AI 기술을 활용한 콘텐츠 제작의 새로운 경험을 시작해보세요
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left 60% - AI Tools */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-hermes-orange" />
                  <span>인기 AI 도구</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiTools.map((tool) => (
                  <div 
                    key={tool.id}
                    onClick={() => setLocation(`/${tool.id}`)}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800 hover:border-hermes-orange"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{tool.name}</h3>
                          {tool.hot && <Badge className="bg-red-100 text-red-800 text-xs">HOT</Badge>}
                          {tool.badge && <Badge variant="outline" className="text-xs">{tool.badge}</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tool.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>사용자 {tool.users}</span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            {tool.rating}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-hermes-orange hover:bg-hermes-orange/90 ml-4">
                        시작하기
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right 40% - Tutorial Video Section */}
          <div className="lg:col-span-2">
            {/* Tutorial Video - Expanded Height */}
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
              <CardContent className="h-[calc(100%-80px)]">
                <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="aspect-video w-full h-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0${isAuthenticated ? '&autoplay=1' : ''}`}
                      title="걱정마AI 사용법"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    걱정마AI 시작하기 - 기본 사용법
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    초보자를 위한 완벽한 AI 글쓰기 가이드를 확인해보세요. 
                    {isAuthenticated ? ' 로그인하셨으니 자동으로 재생됩니다!' : ' 로그인하시면 자동 재생됩니다.'}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-xs">
                      15분 강의
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      초급자용
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      2024년 최신
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


    </div>
  );
}