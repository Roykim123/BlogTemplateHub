import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Plus,
  Instagram, 
  MessageSquare,
  Share2,
  CheckCircle,
  Zap,
  Download,
  Chrome,
  ExternalLink,
  Clock,
  CreditCard,
  RotateCcw,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SnsAutoPage() {
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: 결제, 1: 콘텐츠작성, 2: 로그인, 3: 업로드, 4: 완료
  const [monthsRemaining, setMonthsRemaining] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [postText, setPostText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    naver: false,
    instagram: false,
    threads: false
  });
  // 새로운 상태들
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock product data - 실제로는 마이페이지 상품정보에서 가져옴
  const products = [
    { id: "1", name: "카페 걱정마 - 아메리카노", description: "진한 아메리카노 원두로 만든 시그니처 메뉴" },
    { id: "2", name: "카페 걱정마 - 라떼", description: "부드러운 우유와 에스프레소의 조화" },
    { id: "3", name: "베이커리 - 크루아상", description: "매일 아침 구워내는 신선한 크루아상" }
  ];

  const handlePurchase = () => {
    setIsPurchased(true);
    setMonthsRemaining(1);
    setCurrentStep(1);
    toast({
      title: "결제 완료",
      description: "SNS 자동화 서비스가 활성화되었습니다. (50 AI캐시/월 차감)",
    });
  };

  const handleLoadProduct = () => {
    if (selectedProduct) {
      const product = products.find(p => p.id === selectedProduct);
      if (product) {
        setPostText(`🎉 ${product.name} 
        
${product.description}

📍 매장 위치 정보
⏰ 운영시간 정보
💰 가격 정보

#카페 #신메뉴 #추천 #맛집`);
        toast({
          title: "상품정보 불러오기 완료",
          description: `${product.name} 정보가 텍스트에 추가되었습니다.`,
        });
      }
    } else {
      toast({
        title: "상품 선택 필요",
        description: "불러올 상품을 먼저 선택해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = 5 - uploadedImages.length;
    
    if (files.length > remainingSlots) {
      toast({
        title: "업로드 제한",
        description: `최대 5장까지 업로드 가능합니다. ${remainingSlots}장 더 추가할 수 있습니다.`,
        variant: "destructive",
      });
      return;
    }

    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      toast({
        title: "파일 형식 오류",
        description: "이미지 파일만 업로드 가능합니다.",
        variant: "destructive",
      });
    }

    setUploadedImages(prev => [...prev, ...imageFiles]);
    toast({
      title: "이미지 업로드 완료",
      description: `${imageFiles.length}장의 이미지가 추가되었습니다.`,
    });
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "이미지 삭제",
      description: "이미지가 삭제되었습니다.",
    });
  };

  const handleStartWriting = () => {
    if (uploadedImages.length === 0 || !postText.trim()) {
      toast({
        title: "콘텐츠 누락",
        description: "이미지와 텍스트를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(2);
    toast({
      title: "글쓰기 완료",
      description: "이제 SNS 플랫폼에 로그인하세요.",
    });
  };

  const handleLoginPlatform = (platform: 'naver' | 'instagram' | 'threads') => {
    // 실제로는 Chrome을 열어서 해당 플랫폼 로그인 페이지로 연결
    const urls = {
      naver: 'https://nid.naver.com/nidlogin.login',
      instagram: 'https://www.instagram.com/accounts/login/',
      threads: 'https://www.threads.net/login'
    };
    
    // 시뮬레이션: 실제로는 Chrome driver로 새 창 열기
    window.open(urls[platform], '_blank');
    
    // 시뮬레이션: 로그인 상태 업데이트
    setTimeout(() => {
      setLoginStatus(prev => ({ ...prev, [platform]: true }));
      toast({
        title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} 로그인 완료`,
        description: "로그인이 확인되었습니다.",
      });
    }, 2000);
  };

  const handleStartUpload = () => {
    const loggedInPlatforms = Object.values(loginStatus).filter(Boolean).length;
    if (loggedInPlatforms === 0) {
      toast({
        title: "로그인 필요",
        description: "최소 1개 이상의 플랫폼에 로그인해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep(3);
    setIsProcessing(true);
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    // 진행 상황 시뮬레이션
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // 업로드 결과 시뮬레이션 (90% 성공률)
    setTimeout(() => {
      clearInterval(progressInterval);
      const isSuccess = Math.random() > 0.1; // 90% 성공률
      
      if (isSuccess) {
        setUploadProgress(100);
        setUploadStatus('success');
        setCurrentStep(4);
        setIsProcessing(false);
        toast({
          title: "업로드 완료",
          description: "모든 SNS 플랫폼에 포스트가 업로드되었습니다.",
        });
      } else {
        setUploadStatus('error');
        setIsProcessing(false);
        toast({
          title: "업로드 실패",
          description: "업로드 중 오류가 발생했습니다. 재시도해주세요.",
          variant: "destructive",
        });
      }
    }, 3000);
  };

  const handleRetryUpload = () => {
    setRetryCount(prev => prev + 1);
    setUploadStatus('idle');
    setUploadProgress(0);
    handleStartUpload();
  };

  const getDashboardColor = () => {
    if (currentStep === 4) return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
    if (currentStep >= 1) return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "완료";
    if (step === currentStep) return "진행중";
    return "대기";
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            📱 딸깍 SNS 자동화
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            이미지와 텍스트로 SNS 콘텐츠를 자동으로 생성하고 발행합니다
          </p>
        </div>

        {/* Payment Button */}
        {!isPurchased && (
          <div className="text-center">
            <Button 
              onClick={handlePurchase}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              SNS 자동화 구매하기 (50 AI캐시/월)
            </Button>
          </div>
        )}

        {/* Progress Dashboard */}
        {isPurchased && (
          <Card className={getDashboardColor()}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">SNS 자동화 진행 상황</h3>
                  <p className="text-sm opacity-75">남은 기간: {monthsRemaining}개월</p>
                </div>
                <Badge className={currentStep === 4 ? "bg-green-500" : "bg-blue-500"} variant="secondary">
                  {currentStep === 4 ? "완료" : "진행중"}
                </Badge>
              </div>
              
              {/* Progress Steps */}
              <div className="grid grid-cols-5 gap-4">
                {["결제", "콘텐츠작성", "로그인", "업로드", "완료"].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mx-auto mb-2
                      ${index <= currentStep 
                        ? currentStep === 4 
                          ? "bg-green-500 text-white" 
                          : "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`}>
                      {index <= currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      index <= currentStep 
                        ? currentStep === 4 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-blue-600 dark:text-blue-400"
                        : "text-gray-500"}`}>
                      {step}
                    </span>
                    <div className="text-xs mt-1 opacity-75">
                      {getStepStatus(index)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 초보/고급 토글 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className={`font-medium ${!isAdvancedMode ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                  초보
                </span>
                <Switch
                  checked={isAdvancedMode}
                  onCheckedChange={setIsAdvancedMode}
                  className="data-[state=checked]:bg-purple-600"
                />
                <span className={`font-medium ${isAdvancedMode ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}>
                  고급
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {!isAdvancedMode ? (
                <span>실시간 급등 키워드에 맞춰 자동 글쓰기</span>
              ) : (
                <span>내 상품과 키워드를 조합하여 인플루언서처럼 글쓰기</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Creation Section */}
        {isPurchased && currentStep >= 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5" />
                <span>콘텐츠 작성</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">상품정보 불러오기</label>
                <div className="flex space-x-3">
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="마이페이지 상품정보에서 선택..." />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleLoadProduct}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>불러오기</span>
                  </Button>
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="text-sm font-medium mb-3 block">이미지 업로드 (최대 5장)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`업로드된 이미지 ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  {uploadedImages.length < 5 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <Plus className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">이미지 추가</span>
                    </button>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>이미지 선택</span>
                  </Button>
                  <span className="text-sm text-gray-500">
                    {uploadedImages.length}/5 이미지 업로드됨
                  </span>
                </div>
              </div>

              {/* Text Content Section */}
              <div>
                <label className="text-sm font-medium mb-3 block">포스트 텍스트</label>
                <Textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="SNS에 올릴 텍스트를 입력하세요..."
                  className="min-h-[120px] resize-none"
                  maxLength={2200}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {postText.length}/2200 글자
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPostText("")}
                    disabled={!postText.trim()}
                  >
                    텍스트 초기화
                  </Button>
                </div>
              </div>

              {/* Start Writing Button */}
              {currentStep === 1 && (
                <div className="text-center">
                  <Button 
                    onClick={handleStartWriting}
                    disabled={uploadedImages.length === 0 || !postText.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
                  >
                    글쓰기 시작
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Login Section */}
        {isPurchased && currentStep >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Chrome className="h-5 w-5" />
                <span>SNS 플랫폼 로그인</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'naver', name: 'Naver', icon: MessageSquare, color: 'green' },
                  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'pink' },
                  { id: 'threads', name: 'Threads', icon: Share2, color: 'blue' }
                ].map((platform) => (
                  <Card key={platform.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-${platform.color}-100 dark:bg-${platform.color}-900/20 rounded-full flex items-center justify-center`}>
                            <platform.icon className={`h-5 w-5 text-${platform.color}-600`} />
                          </div>
                          <div>
                            <h3 className="font-medium">{platform.name}</h3>
                            <p className={`text-sm ${loginStatus[platform.id as keyof typeof loginStatus] ? 'text-green-600' : 'text-gray-500'}`}>
                              {loginStatus[platform.id as keyof typeof loginStatus] ? '로그인됨' : '로그인 필요'}
                            </p>
                          </div>
                        </div>
                        <Badge className={loginStatus[platform.id as keyof typeof loginStatus] ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {loginStatus[platform.id as keyof typeof loginStatus] ? '완료' : '대기'}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleLoginPlatform(platform.id as 'naver' | 'instagram' | 'threads')}
                        disabled={loginStatus[platform.id as keyof typeof loginStatus]}
                        variant="outline"
                        className="w-full"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {loginStatus[platform.id as keyof typeof loginStatus] ? '로그인 완료' : '로그인하기'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upload Start Button */}
              {currentStep === 2 && (
                <div className="text-center">
                  <Button 
                    onClick={handleStartUpload}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
                  >
                    업로드 시작
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upload Progress */}
        {currentStep === 3 && (
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                {uploadStatus === 'uploading' && (
                  <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                )}
                {uploadStatus === 'success' && (
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                )}
                {uploadStatus === 'error' && (
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                )}
                
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  {uploadStatus === 'uploading' && '업로드 진행중...'}
                  {uploadStatus === 'success' && '업로드 완료!'}
                  {uploadStatus === 'error' && '업로드 실패'}
                </h3>
                
                <p className="text-yellow-600 dark:text-yellow-400 mb-4">
                  {uploadStatus === 'uploading' && 'SNS 플랫폼에 포스트를 업로드하고 있습니다.'}
                  {uploadStatus === 'success' && '모든 플랫폼에 성공적으로 업로드되었습니다.'}
                  {uploadStatus === 'error' && `업로드 중 오류가 발생했습니다. (시도: ${retryCount + 1}회)`}
                </p>
              </div>

              {/* Progress Bar */}
              {uploadStatus === 'uploading' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>진행률</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Retry Button */}
              {uploadStatus === 'error' && (
                <div className="text-center">
                  <Button 
                    onClick={handleRetryUpload}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    재시도
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completion Message */}
        {currentStep === 4 && (
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                🎉 업로드 완료!
              </h3>
              <p className="text-green-600 dark:text-green-400 mb-4">
                모든 SNS 플랫폼에 포스트가 성공적으로 업로드되었습니다.
              </p>
              <Button 
                onClick={() => {
                  setCurrentStep(1);
                  setUploadedImages([]);
                  setPostText("");
                  setSelectedProduct("");
                  setLoginStatus({ naver: false, instagram: false, threads: false });
                  setUploadStatus('idle');
                  setUploadProgress(0);
                  setRetryCount(0);
                }}
                variant="outline"
              >
                새 포스트 작성하기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}