import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Instagram, 
  MessageSquare, 
  Chrome,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

export default function SnsAutoPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    storeName: "",
    location: "",
    description: "",
    targetKeywords: ""
  });

  const steps = [
    { id: 1, name: "매장 정보 분석", status: "pending", progress: 0 },
    { id: 2, name: "블로그 콘텐츠 생성", status: "pending", progress: 0 },
    { id: 3, name: "인스타그램 포스트 생성", status: "pending", progress: 0 },
    { id: 4, name: "스레드 콘텐츠 생성", status: "pending", progress: 0 },
    { id: 5, name: "크롬 확장프로그램 실행", status: "pending", progress: 0 },
    { id: 6, name: "자동 업로드 대기", status: "pending", progress: 0 }
  ];

  const [processSteps, setProcessSteps] = useState(steps);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startAutomation = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    // 각 단계별 진행 시뮬레이션
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setProcessSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: "running" } : step
      ));
      
      // 진행률 시뮬레이션
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress((i * 100 + progress) / steps.length);
        setProcessSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, progress } : step
        ));
      }
      
      setProcessSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: "completed", progress: 100 } : step
      ));
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "running":
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            딸깍AI - SNS 자동화
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            한 번의 클릭으로 블로그, 인스타그램, 스레드 콘텐츠를 자동 생성하고 업로드합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 입력 폼 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-hermes-orange" />
                <span>매장 정보 입력</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="storeName">매장명</Label>
                <Input 
                  id="storeName"
                  placeholder="매장 이름을 입력하세요"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">위치</Label>
                <Input 
                  id="location"
                  placeholder="매장 위치를 입력하세요"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">매장 설명</Label>
                <Textarea 
                  id="description"
                  placeholder="매장의 특징과 장점을 설명해주세요"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="targetKeywords">타겟 키워드</Label>
                <Input 
                  id="targetKeywords"
                  placeholder="예: 강남 카페, 원두 커피, 디저트"
                  value={formData.targetKeywords}
                  onChange={(e) => handleInputChange('targetKeywords', e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full bg-hermes-orange hover:bg-hermes-orange/90 text-xl font-bold py-6"
                onClick={startAutomation}
                disabled={isRunning || !formData.storeName}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    실행 중...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    딸깍 시작
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 진행 상황 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>진행 상황</span>
                <Badge variant="outline" className="text-hermes-orange border-hermes-orange">
                  {Math.round(progress)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>전체 진행률</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-3">
                {processSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      step.status === 'running' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                      step.status === 'completed' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                      'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(step.status)}
                      <span className={`text-sm ${
                        step.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                        step.status === 'running' ? 'text-blue-700 dark:text-blue-300' :
                        'text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    {step.status === 'running' && (
                      <div className="text-right">
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          {step.progress}%
                        </div>
                        <Progress value={step.progress} className="w-16 h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {progress === 100 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">자동화 완료!</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    모든 콘텐츠가 생성되고 업로드되었습니다.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 생성된 콘텐츠 미리보기 */}
        {progress > 20 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>블로그 콘텐츠</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.storeName && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <h4 className="font-medium mb-2">{formData.storeName} - 최고의 선택!</h4>
                      <p className="text-xs">
                        {formData.location}에 위치한 {formData.storeName}은(는) {formData.description}...
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Instagram className="h-4 w-4" />
                  <span>인스타그램</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.storeName && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <p className="text-xs">
                        ✨ {formData.storeName} ✨<br/>
                        📍 {formData.location}<br/>
                        🔥 {formData.description}<br/>
                        #{formData.targetKeywords?.split(',')[0]?.trim()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Chrome className="h-4 w-4" />
                  <span>스레드</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.storeName && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <p className="text-xs">
                        {formData.storeName}을 소개합니다! 🎉<br/>
                        위치: {formData.location}<br/>
                        특징: {formData.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}