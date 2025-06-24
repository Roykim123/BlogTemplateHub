import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, MessageCircle, Shield, Star } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleKakaoLogin = () => {
    // Simulate Kakao login success
    const mockUser = {
      id: "kakao_123456",
      name: "카카오사용자",
      email: "user@kakao.com",
      profileImage: "https://via.placeholder.com/40"
    };
    
    login(mockUser);
    toast({
      title: "로그인 성공",
      description: "카카오톡으로 로그인되었습니다.",
    });
    setLocation("/");
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      toast({
        title: "입력 오류",
        description: "이메일과 비밀번호를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // Simulate email login success
    const mockUser = {
      id: "email_123456",
      name: email.split("@")[0],
      email: email,
    };
    
    login(mockUser);
    toast({
      title: "로그인 성공",
      description: "이메일로 로그인되었습니다.",
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
            AI와 함께하는 스마트한 일상
          </p>
        </div>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              로그인
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Kakao Login */}
            <Button 
              onClick={handleKakaoLogin}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 text-base"
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              카카오톡으로 3초 만에 시작하기
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                  또는
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3"
                />
              </div>
              
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <label 
                    htmlFor="remember" 
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    로그인 상태 유지
                  </label>
                </div>
                <button className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300">
                  비밀번호 찾기
                </button>
              </div>

              <Button 
                onClick={handleEmailLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 text-base"
              >
                이메일로 로그인
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요?{" "}
              <button className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium">
                회원가입
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">안전한 로그인</p>
          </div>
          <div className="p-4">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">프리미엄 서비스</p>
          </div>
          <div className="p-4">
            <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-gray-600 dark:text-gray-400">24/7 지원</p>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
          로그인하시면 <span className="text-orange-600">이용약관</span> 및 <span className="text-orange-600">개인정보처리방침</span>에 동의하게 됩니다.
        </div>
      </div>
    </div>
  );
}