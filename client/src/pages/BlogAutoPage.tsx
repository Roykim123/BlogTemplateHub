import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap, 
  Clock, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Users,
  Play,
  Pause,
  Settings,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BlogAutoPage() {
  const [isAutomationActive, setIsAutomationActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState(0);
  const { toast } = useToast();

  const handleStartAutomation = () => {
    setIsAutomationActive(true);
    setProgress(0);
    setCurrentTask("매장 정보 분석 중...");
    setGeneratedPosts(0);
    
    // 진행도 시뮬레이션
    const tasks = [
      "매장 정보 분석 중...",
      "키워드 리서치 진행 중...",
      "AI 콘텐츠 생성 중...",
      "SEO 최적화 적용 중...",
      "블로그 포스팅 업로드 중...",
      "완료!"
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < tasks.length) {
        setCurrentTask(tasks[currentStep]);
        setProgress((currentStep / (tasks.length - 1)) * 100);
        
        if (currentStep >= 2) {
          setGeneratedPosts(prev => prev + 1);
        }
      } else {
        clearInterval(interval);
        setCurrentTask("자동화 진행 중... (24시간 운영)");
        setProgress(100);
      }
    }, 2000);
    
    toast({
      title: "딸깍AI 자동화 시작!",
      description: "블로그 자동화가 시작되었습니다.",
    });
  };

  const handlePauseAutomation = () => {
    setIsAutomationActive(false);
    setProgress(0);
    setCurrentTask("");
    toast({
      title: "딸깍AI 자동화 일시정지",
      description: "블로그 자동화가 일시정지되었습니다.",
    });
  };

  const handlePurchaseAutomation = () => {
    toast({
      title: "딸깍AI 구매 완료!",
      description: "딸깍AI 자동화 서비스를 구매했습니다. AI캐쉬 5000캐쉬가 차감되었습니다.",
    });
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              ⚡ 딸깍AI 블로그 자동화
            </h1>
            <div className="flex space-x-2">
              <Button
                onClick={handlePurchaseAutomation}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                딸깍AI 구매하기
              </Button>
              {isAutomationActive ? (
                <Button
                  onClick={handlePauseAutomation}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  일시정지
                </Button>
              ) : (
                <Button
                  onClick={handleStartAutomation}
                  className="bg-hermes-orange hover:bg-hermes-orange/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  딸깍 시작하기
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            AI가 자동으로 블로그 콘텐츠를 생성하고 발행합니다
          </p>
        </div>

        {/* 매장 정보 선택 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>매장 정보 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="사용할 매장 정보를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="store1">카페 걱정마 - 아메리카노</SelectItem>
                <SelectItem value="add-new">+ 새 매장 정보 추가 (마이페이지에서)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-2">
              매장 정보는 마이페이지 &gt; 상품정보에서 관리할 수 있습니다.
            </p>
          </CardContent>
        </Card>

        {/* 실시간 진행 상황 */}
        {isAutomationActive && (
          <Card className="mb-6 border-hermes-orange bg-orange-50 dark:bg-orange-900/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-hermes-orange">
                <Zap className="h-5 w-5 animate-pulse" />
                <span>딸깍AI 실행 중</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{currentTask}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-hermes-orange">{generatedPosts}</div>
                    <div className="text-xs text-gray-500">생성된 포스트</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-hermes-orange">
                      {isAutomationActive ? "진행중" : "대기"}
                    </div>
                    <div className="text-xs text-gray-500">현재 상태</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-hermes-orange">
                      {new Date().toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-gray-500">시작 시간</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 현재 진행 상황 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">오늘 생성</p>
                  <p className="text-2xl font-bold">{24 + generatedPosts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">이번 달 총</p>
                  <p className="text-2xl font-bold">347</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">평균 조회수</p>
                  <p className="text-2xl font-bold">1.2K</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="automation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="automation">자동화 설정</TabsTrigger>
            <TabsTrigger value="schedule">스케줄 관리</TabsTrigger>
            <TabsTrigger value="analytics">성과 분석</TabsTrigger>
          </TabsList>

          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>자동화 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AI 글쓰기 강도</span>
                    <Badge variant="outline">창의적</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">포스팅 주기</span>
                    <Badge variant="outline">매일 3회</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SEO 최적화</span>
                    <Badge className="bg-green-100 text-green-800">활성</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    고급 설정
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>자동 발행 플랫폼</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">네이버 블로그</span>
                      <Badge className="bg-green-100 text-green-800">연결됨</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">티스토리</span>
                      <Badge className="bg-yellow-100 text-yellow-800">대기중</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">워드프레스</span>
                      <Badge variant="outline">연결 필요</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    플랫폼 연결 관리
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>예약 발행 일정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">오늘의 커피 트렌드</h4>
                      <Badge className="bg-blue-100 text-blue-800">예약됨</Badge>
                    </div>
                    <p className="text-sm text-gray-600">발행 예정: 오후 2:00</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">신메뉴 소개 포스트</h4>
                      <Badge className="bg-green-100 text-green-800">발행됨</Badge>
                    </div>
                    <p className="text-sm text-gray-600">발행 완료: 오전 10:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>이번 주 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">총 조회수</span>
                      <span className="font-semibold">12,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">평균 체류시간</span>
                      <span className="font-semibold">2분 15초</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">댓글 수</span>
                      <span className="font-semibold">89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>인기 키워드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">#강남카페</Badge>
                    <Badge variant="outline" className="mr-2">#아메리카노</Badge>
                    <Badge variant="outline" className="mr-2">#커피맛집</Badge>
                    <Badge variant="outline" className="mr-2">#데이트코스</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}