import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Calendar, 
  Mail,
  CreditCard,
  Gift,
  Clock,
  TrendingUp,
  Award,
  Key,
  Settings,
  Zap,
  Shield
} from "lucide-react";

export default function MyPage() {
  const [userInfo] = useState({
    name: "홍길동",
    email: "hong@kakao.com",
    joinDate: "2024년 11월 15일",
    plan: "베이직",
    aiCash: 2450,
    totalUsage: 1247,
    nextBilling: "2025-02-15",
    favoriteTools: ["AI 블로그 글쓰기", "AI 유튜브 스크립트", "AI 인스타그램 포스트"]
  });

  const [apiKeys, setApiKeys] = useState({
    openai: "",
    claude: "",
    gemini: "",
    googleai: ""
  });

  const [paymentHistory] = useState([
    { id: 1, date: "2025-01-15", plan: "베이직", amount: "29,700원", status: "결제완료" },
    { id: 2, date: "2024-12-15", plan: "베이직", amount: "29,700원", status: "결제완료" },
    { id: 3, date: "2024-11-15", plan: "베이직", amount: "29,700원", status: "결제완료" },
  ]);

  const [activityData] = useState([
    { date: "2025-01-20", activity: "AI 블로그 글쓰기 사용", aiCash: -50 },
    { date: "2025-01-19", activity: "친구 초대 완료", aiCash: +5000 },
    { date: "2025-01-18", activity: "출석 체크", aiCash: +100 },
    { date: "2025-01-17", activity: "AI 유튜브 스크립트 사용", aiCash: -75 },
    { date: "2025-01-16", activity: "AI 인스타그램 포스트 사용", aiCash: -30 }
  ]);

  const [achievements] = useState([
    { title: "첫 글 작성", description: "첫 번째 AI 글쓰기 완료", unlocked: true },
    { title: "활발한 사용자", description: "월 100회 이상 사용", unlocked: true },
    { title: "친구 초대왕", description: "10명 이상 친구 초대", unlocked: true },
    { title: "충성 고객", description: "6개월 연속 구독", unlocked: false },
    { title: "AI 마스터", description: "모든 도구 사용 경험", unlocked: false }
  ]);

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">마이페이지</h1>
          <p className="text-gray-600 dark:text-gray-400">나의 활동 현황과 계정 정보를 확인하세요</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="subscription">구독 정보</TabsTrigger>
            <TabsTrigger value="api">API 설정</TabsTrigger>
            <TabsTrigger value="activity">활동 내역</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-xl bg-hermes-orange text-white">
                  {userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{userInfo.name}</CardTitle>
              <Badge className="bg-hermes-orange text-white">{userInfo.plan} 플랜</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{userInfo.email}</span>
              </div>
              <div className="space-y-2">
                <Label>로그인 방식</Label>
                <div className="flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">카</span>
                  </div>
                  <span className="text-sm">카카오톡 로그인</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">가입일: {userInfo.joinDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>사용 통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{userInfo.aiCash.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">보유 AI캐쉬</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{userInfo.totalUsage}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">총 사용횟수</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">초대한 친구</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Clock className="h-8 w-8 text-hermes-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-hermes-orange">87</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">연속 출석일</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>최근 활동</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <div className={`text-sm font-semibold ${
                      activity.aiCash > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.aiCash > 0 ? '+' : ''}{activity.aiCash} AI캐쉬
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>업적</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                      : 'bg-gray-50 dark:bg-gray-800 opacity-60'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-400 text-gray-200'
                    }`}>
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        achievement.unlocked ? 'text-green-800 dark:text-green-200' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className={`text-xs ${
                        achievement.unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

            {/* Favorite Tools */}
            <Card>
              <CardHeader>
                <CardTitle>자주 사용하는 도구</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userInfo.favoriteTools.map((tool, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-hermes-orange to-soft-pink text-white rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-hermes-orange font-bold text-sm">AI</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tool}</p>
                        <p className="text-xs opacity-90">자주 사용함</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>현재 구독 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">현재 플랜</p>
                    <p className="font-semibold">{userInfo.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">보유 AI캐쉬</p>
                    <p className="font-semibold text-hermes-orange">{userInfo.aiCash.toLocaleString()} AI캐쉬</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">다음 결제일</p>
                    <p className="font-semibold">{userInfo.nextBilling}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>결제 내역</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">{payment.plan} 플랜</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{payment.amount}</p>
                        <p className="text-sm text-green-600">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>AI API 키 관리</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">OpenAI GPT</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ChatGPT, GPT-4 모델</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="openai-key">API 키</Label>
                      <Input
                        id="openai-key"
                        type="password"
                        placeholder="sk-..."
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys({...apiKeys, openai: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Claude</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Anthropic Claude 모델</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="claude-key">API 키</Label>
                      <Input
                        id="claude-key"
                        type="password"
                        placeholder="sk-ant-..."
                        value={apiKeys.claude}
                        onChange={(e) => setApiKeys({...apiKeys, claude: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Settings className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Google Gemini</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Gemini Pro 모델</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gemini-key">API 키</Label>
                      <Input
                        id="gemini-key"
                        type="password"
                        placeholder="AIza..."
                        value={apiKeys.gemini}
                        onChange={(e) => setApiKeys({...apiKeys, gemini: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <User className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Google AI</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Google AI Platform</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="googleai-key">API 키</Label>
                      <Input
                        id="googleai-key"
                        type="password"
                        placeholder="AIza..."
                        value={apiKeys.googleai}
                        onChange={(e) => setApiKeys({...apiKeys, googleai: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-hermes-orange hover:bg-hermes-orange/90">
                    API 키 저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            {/* Recent Activity & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>최근 활동</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {activityData.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{activity.activity}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        <div className={`text-sm font-semibold ${
                          activity.aiCash > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.aiCash > 0 ? '+' : ''}{activity.aiCash} AI캐쉬
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>업적</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.unlocked 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                          : 'bg-gray-50 dark:bg-gray-800 opacity-60'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.unlocked 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-400 text-gray-200'
                        }`}>
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            achievement.unlocked ? 'text-green-800 dark:text-green-200' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </p>
                          <p className={`text-xs ${
                            achievement.unlocked ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
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