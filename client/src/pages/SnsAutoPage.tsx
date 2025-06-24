import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Share2, 
  Instagram, 
  Twitter, 
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Play,
  Pause,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SnsAutoPage() {
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
      "SNS 플랫폼 연동 확인 중...",
      "해시태그 최적화 중...",
      "이미지 생성 중...",
      "SNS 포스팅 예약 중...",
      "완료!"
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < tasks.length) {
        setCurrentTask(tasks[currentStep]);
        setProgress((currentStep / (tasks.length - 1)) * 100);
        
        if (currentStep >= 3) {
          setGeneratedPosts(prev => prev + 1);
        }
      } else {
        clearInterval(interval);
        setCurrentTask("자동화 진행 중... (24시간 운영)");
        setProgress(100);
      }
    }, 1500);
    
    toast({
      title: "SNS 자동화 시작!",
      description: "SNS 자동화가 시작되었습니다.",
    });
  };

  const handlePauseAutomation = () => {
    setIsAutomationActive(false);
    setProgress(0);
    setCurrentTask("");
    toast({
      title: "SNS 자동화 일시정지",
      description: "SNS 자동화가 일시정지되었습니다.",
    });
  };

  const handlePurchaseAutomation = () => {
    toast({
      title: "SNS 자동화 구매 완료!",
      description: "SNS 자동화 서비스를 구매했습니다. AI캐쉬 3000캐쉬가 차감되었습니다.",
    });
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              📱 SNS 자동화
            </h1>
            <div className="flex space-x-2">
              <Button
                onClick={handlePurchaseAutomation}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                SNS 자동화 구매
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
                  자동화 시작
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            소셜미디어 콘텐츠를 자동으로 생성하고 예약 발행합니다
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
                <Share2 className="h-5 w-5 animate-pulse" />
                <span>SNS 자동화 실행 중</span>
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

        {/* 플랫폼 연결 상태 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Instagram</h3>
                    <p className="text-sm text-green-600">연결됨</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  활성
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Twitter className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Twitter</h3>
                    <p className="text-sm text-yellow-600">대기중</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  대기
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">KakaoTalk</h3>
                    <p className="text-sm text-red-600">연결 필요</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  중단
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="automation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="automation">자동화 설정</TabsTrigger>
            <TabsTrigger value="content">콘텐츠 관리</TabsTrigger>
            <TabsTrigger value="analytics">성과 분석</TabsTrigger>
          </TabsList>

          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>포스팅 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">포스팅 빈도</span>
                    <Badge variant="outline">하루 5회</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">최적 시간대</span>
                    <Badge variant="outline">오전 9시, 오후 2시, 저녁 7시</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">해시태그 자동 생성</span>
                    <Badge className="bg-green-100 text-green-800">활성</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>콘텐츠 유형</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">제품 소개</span>
                      <Badge className="bg-blue-100 text-blue-800">40%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">일상 공유</span>
                      <Badge className="bg-green-100 text-green-800">30%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">이벤트 홍보</span>
                      <Badge className="bg-purple-100 text-purple-800">20%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">고객 후기</span>
                      <Badge className="bg-orange-100 text-orange-800">10%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>예약된 콘텐츠</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">신메뉴 라떼 소개</h4>
                      <Badge className="bg-blue-100 text-blue-800">Instagram</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">새롭게 출시된 시즌 라떼를 소개합니다 #신메뉴 #라떼 #카페</p>
                    <p className="text-xs text-gray-500">예약 시간: 오후 2:30</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">매장 분위기 사진</h4>
                      <Badge className="bg-green-100 text-green-800">발행완료</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">아늑한 카페 분위기를 담은 사진 #분위기 #카페 #힐링</p>
                    <p className="text-xs text-gray-500">발행 시간: 오전 10:15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>이번 주 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">24,891</div>
                      <div className="text-sm text-gray-500">총 도달 수</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">1,456</div>
                      <div className="text-sm text-gray-500">좋아요</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-gray-500">댓글</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>플랫폼별 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Instagram</span>
                      <span className="font-semibold">15,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Twitter</span>
                      <span className="font-semibold">7,892</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">KakaoTalk</span>
                      <span className="font-semibold">1,765</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>인기 해시태그</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">#강남카페</Badge>
                    <Badge variant="outline" className="mr-2">#신메뉴</Badge>
                    <Badge variant="outline" className="mr-2">#라떼아트</Badge>
                    <Badge variant="outline" className="mr-2">#데이트</Badge>
                    <Badge variant="outline" className="mr-2">#분위기</Badge>
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