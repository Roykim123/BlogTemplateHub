import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Instagram, 
  MessageSquare, 
  Image, 
  Hash, 
  Calendar,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";

export default function InstaThreadsPage() {
  const [activeTab, setActiveTab] = useState("instagram");
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    hashtags: "",
    imagePrompt: "",
    schedule: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async (platform) => {
    setIsGenerating(true);
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const instagramTemplates = [
    { id: 1, name: "매장 홍보", description: "매장 소개 및 특별 이벤트" },
    { id: 2, name: "제품 소개", description: "신제품 및 인기 상품 홍보" },
    { id: 3, name: "고객 후기", description: "고객 리뷰 및 만족도" },
    { id: 4, name: "일상 공유", description: "매장 일상 및 비하인드" }
  ];

  const threadsTemplates = [
    { id: 1, name: "정보 공유", description: "업계 정보 및 팁 공유" },
    { id: 2, name: "토론 시작", description: "관련 주제 토론 유도" },
    { id: 3, name: "경험 공유", description: "개인적 경험 스토리" },
    { id: 4, name: "질문 & 답변", description: "커뮤니티 Q&A" }
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            인스타그램 & 스레드 자동화
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            플랫폼에 최적화된 콘텐츠를 자동으로 생성하고 관리하세요
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="instagram" className="flex items-center space-x-2">
              <Instagram className="h-4 w-4" />
              <span>인스타그램</span>
            </TabsTrigger>
            <TabsTrigger value="threads" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>스레드</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instagram" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 인스타그램 콘텐츠 생성 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <span>인스타그램 포스트 생성</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="insta-content">포스트 내용</Label>
                    <Textarea 
                      id="insta-content"
                      placeholder="포스트에 들어갈 내용을 입력하세요..."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insta-hashtags">해시태그</Label>
                    <Input 
                      id="insta-hashtags"
                      placeholder="#카페 #강남 #커피 #맛집"
                      value={formData.hashtags}
                      onChange={(e) => handleInputChange('hashtags', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image-prompt">이미지 생성 프롬프트</Label>
                    <Input 
                      id="image-prompt"
                      placeholder="아름다운 카페 인테리어, 따뜻한 조명"
                      value={formData.imagePrompt}
                      onChange={(e) => handleInputChange('imagePrompt', e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full bg-pink-500 hover:bg-pink-600 text-xl font-bold py-6"
                    onClick={() => handleGenerate('instagram')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? '생성 중...' : '딸깍'}
                  </Button>
                </CardContent>
              </Card>

              {/* 인스타그램 템플릿 */}
              <Card>
                <CardHeader>
                  <CardTitle>인스타그램 템플릿</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {instagramTemplates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        className="h-auto p-4 text-left"
                        onClick={() => {
                          // 템플릿 선택 로직
                        }}
                      >
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 인스타그램 분석 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>팔로워 증가</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-500">+234</div>
                  <p className="text-xs text-gray-600">이번 주</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>참여도</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">8.7%</div>
                  <p className="text-xs text-gray-600">평균 참여율</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Image className="h-4 w-4" />
                    <span>게시물</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">47</div>
                  <p className="text-xs text-gray-600">이번 달</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threads" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 스레드 콘텐츠 생성 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <span>스레드 포스트 생성</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="threads-content">스레드 내용</Label>
                    <Textarea 
                      id="threads-content"
                      placeholder="스레드에 공유할 내용을 입력하세요..."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={5}
                    />
                  </div>

                  <div>
                    <Label htmlFor="threads-topic">주제/카테고리</Label>
                    <Input 
                      id="threads-topic"
                      placeholder="카페 운영, 창업 팁, 업계 동향"
                      value={formData.hashtags}
                      onChange={(e) => handleInputChange('hashtags', e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-xl font-bold py-6"
                    onClick={() => handleGenerate('threads')}
                    disabled={isGenerating}
                  >
                    {isGenerating ? '생성 중...' : '딸깍'}
                  </Button>
                </CardContent>
              </Card>

              {/* 스레드 템플릿 */}
              <Card>
                <CardHeader>
                  <CardTitle>스레드 템플릿</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {threadsTemplates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        className="h-auto p-4 text-left"
                        onClick={() => {
                          // 템플릿 선택 로직
                        }}
                      >
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 스레드 분석 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>팔로워</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">1,234</div>
                  <p className="text-xs text-gray-600">총 팔로워</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>답글</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">156</div>
                  <p className="text-xs text-gray-600">이번 주</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>조회수</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-500">12.5K</div>
                  <p className="text-xs text-gray-600">이번 달</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 예약 게시 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>예약 게시</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">오늘 15:00</span>
                </div>
                <p className="text-xs text-gray-600">매장 홍보 포스트</p>
                <Badge variant="outline" className="mt-2">인스타그램</Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">내일 09:00</span>
                </div>
                <p className="text-xs text-gray-600">업계 정보 공유</p>
                <Badge variant="outline" className="mt-2">스레드</Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">목요일 18:00</span>
                </div>
                <p className="text-xs text-gray-600">고객 후기 소개</p>
                <Badge variant="outline" className="mt-2">인스타그램</Badge>
              </div>

              <div className="p-4 border dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Button variant="ghost" className="text-gray-500">
                  + 예약 추가
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}