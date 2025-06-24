import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Plus,
  Instagram, 
  MessageSquare,
  Share2,
  CheckCircle,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SnsAutoPage() {
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: 구매, 1: 로그인, 2: 글쓰기, 3: 등록완료
  const [monthsRemaining, setMonthsRemaining] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [postText, setPostText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handlePurchase = () => {
    setIsPurchased(true);
    setMonthsRemaining(1);
    setCurrentStep(1);
    toast({
      title: "구매 완료",
      description: "SNS 자동화 서비스가 활성화되었습니다. (50 AI캐시 차감)",
    });
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

    // 이미지 파일만 허용
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

  const handleNextStep = () => {
    if (currentStep === 1 && (uploadedImages.length === 0 || !postText.trim())) {
      toast({
        title: "콘텐츠 누락",
        description: "이미지와 텍스트를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      const steps = ["구매 완료", "로그인 완료", "글쓰기 완료", "등록 완료"];
      toast({
        title: steps[currentStep + 1],
        description: `${steps[currentStep + 1]}되었습니다.`,
      });

      // 등록 완료 시 휘발성 데이터 정리
      if (currentStep + 1 === 3) {
        setTimeout(() => {
          setUploadedImages([]);
          setPostText("");
          toast({
            title: "데이터 정리 완료",
            description: "업로드된 이미지와 텍스트가 안전하게 정리되었습니다.",
          });
        }, 2000);
      }
    }
  };

  const handlePublish = async () => {
    setIsProcessing(true);
    // Simulate publishing process
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "발행 완료",
        description: "SNS 포스트가 성공적으로 발행되었습니다.",
      });
    }, 3000);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            📱 딸깍 SNS 자동화
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            이미지와 텍스트로 SNS 콘텐츠를 자동으로 생성하고 발행합니다
          </p>
        </div>

        {/* Purchase Status and Progress */}
        {isPurchased && (
          <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">SNS 자동화 활성화</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">남은 기간: {monthsRemaining}개월</p>
                </div>
                <Badge className="bg-green-500 text-white">활성화</Badge>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-4">
                {["구매", "로그인", "글쓰기", "등록"].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2
                      ${index <= currentStep 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`}>
                      {index <= currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-xs ${index <= currentStep ? "text-green-600 dark:text-green-400" : "text-gray-500"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Creation Section - Show when logged in */}
        {isPurchased && currentStep >= 1 && currentStep < 3 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5" />
                <span>콘텐츠 작성</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  
                  {/* Add Image Button */}
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
                  placeholder="SNS에 올릴 텍스트를 입력하세요...&#10;&#10;예시:&#10;☕ 신메뉴 출시! 달콤한 캐러멜 라떼를 만나보세요&#10;📍 강남구 테헤란로 123&#10;⏰ 매일 오전 7시 - 오후 10시&#10;#강남카페 #신메뉴 #캐러멜라떼 #카페추천"
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

              {/* Preview Section */}
              {(uploadedImages.length > 0 || postText.trim()) && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                    SNS 포스트 미리보기
                  </h4>
                  <div className="space-y-3 bg-white dark:bg-gray-900 rounded-lg p-3 border">
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedImages.slice(0, 3).map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`미리보기 ${index + 1}`}
                            className="w-full h-16 object-cover rounded"
                          />
                        ))}
                        {uploadedImages.length > 3 && (
                          <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{uploadedImages.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {postText.trim() && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {postText}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Platform Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                    <Share2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">기타 SNS</h3>
                    <p className="text-sm text-gray-600">준비중</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">
                  대기
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          {!isPurchased ? (
            <Button 
              onClick={handlePurchase}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="h-5 w-5 mr-2" />
              자동화 구매하기 (50 AI캐시/월)
            </Button>
          ) : currentStep < 3 ? (
            <Button 
              onClick={handleNextStep}
              disabled={currentStep === 1 && (uploadedImages.length === 0 || !postText.trim())}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 0 && "로그인하기"}
              {currentStep === 1 && "글쓰기 완료"}
              {currentStep === 2 && "등록하기"}
            </Button>
          ) : (
            <Button 
              onClick={handlePublish}
              disabled={isProcessing}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                  발행 중...
                </>
              ) : (
                <>
                  <Share2 className="h-5 w-5 mr-2" />
                  발행하기
                </>
              )}
            </Button>
          )}
        </div>

        {/* Success Message */}
        {currentStep === 3 && (
          <Card className="mt-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                등록이 완료되었습니다!
              </h3>
              <p className="text-green-600 dark:text-green-400">
                이제 발행하기 버튼을 눌러 SNS에 포스트를 업로드하세요.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}