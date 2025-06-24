import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Shield, Star, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleKakaoLogin = () => {
    // Simulate Kakao login success with realistic Korean user data
    const mockUser = {
      id: "kakao_987654321",
      name: "김민수",
      email: "minsu.kim@kakao.com",
      profileImage: "https://picsum.photos/80/80?random=1"
    };
    
    login(mockUser);
    toast({
      title: "로그인 성공",
      description: `${mockUser.name}님, 환영합니다!`,
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">걱</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 dark:from-gray-200 dark:to-orange-400 bg-clip-text text-transparent mb-2">
            걱정마<span className="text-orange-500">AI</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            🎉 2025년 서울AI허브 기업 선정 경축!
          </p>
        </div>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold mb-4">
              간편하게 시작하세요
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              카카오톡 계정으로 바로 이용할 수 있습니다
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Kakao Login */}
            <Button 
              onClick={handleKakaoLogin}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="h-6 w-6 mr-3" />
              카카오톡으로 3초 만에 시작하기
            </Button>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mt-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                로그인하고 누리는 혜택
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">AI 자동화 도구 무제한 이용</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">프리미엄 템플릿 및 강의 액세스</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">개인화된 AI 서비스 및 진행상황 저장</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">보안 인증</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">카카오 공식</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span className="text-sm">간편 로그인</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400">
          카카오톡 로그인 시 <span className="text-orange-600 font-medium">이용약관</span> 및 <span className="text-orange-600 font-medium">개인정보처리방침</span>에 동의하게 됩니다.
        </div>
      </div>
    </div>
  );
}