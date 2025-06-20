import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  TrendingUp, 
  Store, 
  Star, 
  BookOpen, 
  ShoppingBag,
  ArrowRight,
  Edit3,
  Eye,
  Upload,
  CheckCircle,
  Coins
} from "lucide-react";

export default function BlogAutoPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const blogTemplates = [
    {
      id: "traffic",
      name: "방문자 늘리기",
      description: "황금키워드 기준으로 글을 작성하여 방문자가 지속적으로 진입되게 합니다",
      icon: TrendingUp,
      cost: 0,
      color: "bg-green-500",
      inputs: []
    },
    {
      id: "store",
      name: "매장 홍보용 블로그",
      description: "URL링크, 제품/상호명, 키워드, 해시태그 입력으로 매장 홍보",
      icon: Store,
      cost: 2,
      color: "bg-blue-500",
      inputs: ["url", "storeName", "keywords", "hashtags"]
    },
    {
      id: "review",
      name: "체험 후기/여행기",
      description: "SEO 최적화 기반 광고주용 글 자동작성",
      icon: Star,
      cost: 3,
      color: "bg-purple-500",
      inputs: ["subject", "location", "experience"]
    },
    {
      id: "expert",
      name: "전문 정보 블로그",
      description: "전문가의 글을 참고한 SEO형 2000자 블로그 생성",
      icon: BookOpen,
      cost: 4,
      color: "bg-orange-500",
      inputs: ["topic", "targetKeywords", "expertiseLevel"]
    },
    {
      id: "business",
      name: "부업/제품홍보 블로그",
      description: "스마트스토어, 쿠팡 링크 기반 글 작성",
      icon: ShoppingBag,
      cost: 3,
      color: "bg-red-500",
      inputs: ["productLink", "productName", "targetAudience"]
    }
  ];

  const workflowSteps = [
    { id: 1, name: "키워드 입력", icon: Edit3, status: "completed" },
    { id: 2, name: "AI 생성", icon: Zap, status: isGenerating ? "current" : "pending" },
    { id: 3, name: "인터넷 접속", icon: TrendingUp, status: "pending" },
    { id: 4, name: "업로딩", icon: Upload, status: "pending" },
    { id: 5, name: "게시완료", icon: CheckCircle, status: "pending" }
  ];

  const generateContent = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI generation process
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress((i / steps) * 100);
    }
    
    setGeneratedContent(`
# ${selectedTemplate === 'traffic' ? '방문자를 늘리는 블로그 포스트' : '생성된 블로그 콘텐츠'}

이것은 AI가 생성한 샘플 블로그 콘텐츠입니다. 실제 서비스에서는 선택한 템플릿과 입력한 정보를 바탕으로 SEO 최적화된 고품질 콘텐츠가 생성됩니다.

## 주요 특징
- SEO 최적화된 키워드 배치
- 독자 참여를 유도하는 구조
- 검색엔진 친화적인 제목과 소제목
- 자연스러운 키워드 밀도

## 결론
이 블로그 포스트는 target 키워드에 대한 상위 노출을 목표로 작성되었습니다.

*귀여운이모티콘+ 2코인 사용됨*
    `);
    
    setIsGenerating(false);
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "current": return "text-hermes-orange bg-orange-100";
      default: return "text-gray-400 bg-gray-100";
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            딸깍AI - 블로그 자동화
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI가 자동으로 SEO 최적화된 블로그 글을 작성해드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>블로그 템플릿 선택</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedTemplate === template.id 
                          ? 'ring-2 ring-hermes-orange border-hermes-orange' 
                          : ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center`}>
                            <template.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-sm">{template.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Coins className="h-3 w-3 text-hermes-orange" />
                                <span className="text-xs text-hermes-orange font-bold">
                                  {template.cost}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Input Form */}
            {selectedTemplate && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>입력 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTemplate === 'traffic' ? (
                    <div className="text-center py-8">
                      <Zap className="h-12 w-12 text-hermes-orange mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">원클릭 생성</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        추가 입력 없이 바로 글을 생성할 수 있습니다
                      </p>
                      <Button 
                        onClick={generateContent}
                        disabled={isGenerating}
                        className="bg-hermes-orange hover:bg-hermes-orange/90"
                      >
                        {isGenerating ? "생성중..." : "바로 생성하기"}
                      </Button>
                    </div>
                  ) : (
                    <>
                      {selectedTemplate === 'store' && (
                        <>
                          <div className="space-y-2">
                            <Label>매장 URL</Label>
                            <Input placeholder="https://store.example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label>매장/상호명</Label>
                            <Input placeholder="우리 카페" />
                          </div>
                          <div className="space-y-2">
                            <Label>주요 키워드</Label>
                            <Input placeholder="카페, 원두, 디저트" />
                          </div>
                          <div className="space-y-2">
                            <Label>해시태그</Label>
                            <Input placeholder="#카페 #원두 #디저트" />
                          </div>
                        </>
                      )}
                      
                      {selectedTemplate === 'review' && (
                        <>
                          <div className="space-y-2">
                            <Label>체험 주제</Label>
                            <Input placeholder="제주도 여행" />
                          </div>
                          <div className="space-y-2">
                            <Label>장소/위치</Label>
                            <Input placeholder="제주도 서귀포시" />
                          </div>
                          <div className="space-y-2">
                            <Label>체험 내용</Label>
                            <Textarea placeholder="어떤 체험을 했는지 간단히 설명해주세요" />
                          </div>
                        </>
                      )}

                      <Button 
                        onClick={generateContent}
                        disabled={isGenerating}
                        className="w-full bg-hermes-orange hover:bg-hermes-orange/90"
                      >
                        {isGenerating ? "생성중..." : "AI 블로그 생성하기"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Generated Content */}
            {generatedContent && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>생성된 콘텐츠</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        수정
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        미리보기
                      </Button>
                      <Button size="sm" className="bg-hermes-orange hover:bg-hermes-orange/90">
                        <Upload className="h-4 w-4 mr-2" />
                        발행하기
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Progress Dashboard */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>업무 진척도</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflowSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepColor(step.status)}`}>
                        <step.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step.name}</p>
                        {step.status === "current" && (
                          <Progress value={progress} className="mt-1" />
                        )}
                      </div>
                      {index < workflowSteps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>사용 안내</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-hermes-orange rounded-full mt-2"></div>
                  <p>템플릿을 선택하고 필요한 정보를 입력하세요</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-hermes-orange rounded-full mt-2"></div>
                  <p>AI가 SEO 최적화된 글을 자동 생성합니다</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-hermes-orange rounded-full mt-2"></div>
                  <p>생성된 글은 수정 후 네이버 블로그로 발행됩니다</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-hermes-orange rounded-full mt-2"></div>
                  <p>글 하단에 사용된 코인 수가 표시됩니다</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}