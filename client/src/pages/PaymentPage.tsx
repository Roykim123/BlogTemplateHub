import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Clock, 
  CheckCircle, 
  Star,
  Coins,
  Wallet,
  TrendingUp,
  Gift,
  Zap,
  Shield,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentPage() {
  const [userCash] = useState(2450);
  const [chargeAmount, setChargeAmount] = useState("");
  const { toast } = useToast();

  const aiCashPackages = [
    { id: 1, amount: 10000, bonus: 0, price: 10000, popular: false },
    { id: 2, amount: 30000, bonus: 3000, price: 30000, popular: true },
    { id: 3, amount: 50000, bonus: 7000, price: 50000, popular: false },
    { id: 4, amount: 100000, bonus: 20000, price: 100000, popular: false }
  ];

  const subscriptionPlans = [
    {
      name: "Free",
      price: "0",
      description: "개인 사용자를 위한 기본 플랜",
      features: ["월 10회 AI 글쓰기", "기본 템플릿 5개", "커뮤니티 참여"],
      popular: false,
      aiCashIncluded: 1000
    },
    {
      name: "Basic",
      price: "29,000",
      description: "소규모 비즈니스에 적합",
      features: ["월 100회 AI 글쓰기", "모든 템플릿 사용", "우선 고객지원", "고급 분석"],
      popular: true,
      aiCashIncluded: 30000
    },
    {
      name: "Pro",
      price: "59,000",
      description: "전문가와 중견기업을 위한",
      features: ["무제한 AI 글쓰기", "맞춤 템플릿 생성", "API 접근", "전담 매니저"],
      popular: false,
      aiCashIncluded: 70000
    }
  ];

  const recentTransactions = [
    { id: 1, type: "AI캐쉬 충전", plan: "30,000 캐쉬 + 보너스 3,000", amount: "30,000원", date: "2025-01-20", status: "완료" },
    { id: 2, type: "구독", plan: "Basic 플랜", amount: "29,000원", date: "2025-01-15", status: "완료" },
    { id: 3, type: "AI캐쉬 사용", plan: "프리미엄 강의", amount: "-50,000 캐쉬", date: "2025-01-10", status: "완료" },
    { id: 4, type: "AI캐쉬 충전", plan: "10,000 캐쉬", amount: "10,000원", date: "2025-01-05", status: "완료" }
  ];

  const handleCharge = (packageInfo: any) => {
    toast({
      title: "AI캐쉬 충전 완료!",
      description: `${packageInfo.amount.toLocaleString()}캐쉬${packageInfo.bonus > 0 ? ` + 보너스 ${packageInfo.bonus.toLocaleString()}캐쉬` : ''}가 충전되었습니다.`,
    });
  };

  const handleCustomCharge = () => {
    const amount = parseInt(chargeAmount);
    if (amount && amount >= 1000) {
      toast({
        title: "AI캐쉬 충전 완료!",
        description: `${amount.toLocaleString()}캐쉬가 충전되었습니다.`,
      });
      setChargeAmount("");
    } else {
      toast({
        title: "잘못된 금액",
        description: "최소 1,000원부터 충전 가능합니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            결제 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI캐쉬 충전 및 구독 요금제를 관리하세요
          </p>
          
          {/* Current Balance */}
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Coins className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">현재 보유 AI캐쉬</h3>
                  <p className="text-2xl font-bold text-yellow-600">{userCash.toLocaleString()}원</p>
                </div>
              </div>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Wallet className="h-4 w-4 mr-2" />
                사용 내역
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="aicash" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="aicash">AI캐쉬 충전</TabsTrigger>
            <TabsTrigger value="subscription">구독 요금제</TabsTrigger>
            <TabsTrigger value="payment">결제 수단</TabsTrigger>
            <TabsTrigger value="history">결제 내역</TabsTrigger>
          </TabsList>

          <TabsContent value="aicash" className="space-y-6">
            {/* Quick Charge Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-hermes-orange" />
                  <span>AI캐쉬 충전 패키지</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {aiCashPackages.map((pkg) => (
                    <Card key={pkg.id} className={`cursor-pointer hover:shadow-md transition-all ${pkg.popular ? 'ring-2 ring-hermes-orange' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-hermes-orange text-white">
                            <Star className="h-3 w-3 mr-1" />
                            인기
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-4 text-center">
                        <div className="mb-3">
                          <div className="text-2xl font-bold text-hermes-orange">
                            {pkg.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">AI캐쉬</div>
                        </div>
                        
                        {pkg.bonus > 0 && (
                          <div className="mb-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <div className="text-sm font-medium text-green-600">
                              + {pkg.bonus.toLocaleString()} 보너스
                            </div>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <div className="text-lg font-semibold">
                            {pkg.price.toLocaleString()}원
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleCharge(pkg)}
                          className={`w-full ${pkg.popular ? 'bg-hermes-orange hover:bg-hermes-orange/90' : ''}`}
                          variant={pkg.popular ? 'default' : 'outline'}
                        >
                          충전하기
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Amount Charge */}
            <Card>
              <CardHeader>
                <CardTitle>직접 입력 충전</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <Input
                    type="number"
                    placeholder="충전할 금액 (최소 1,000원)"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    min="1000"
                    step="1000"
                  />
                  <Button onClick={handleCustomCharge} className="bg-hermes-orange hover:bg-hermes-orange/90">
                    충전하기
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 최소 1,000원부터 충전 가능하며, 1,000원 단위로 충전됩니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-hermes-orange' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-hermes-orange text-white">
                        <Star className="h-3 w-3 mr-1" />
                        인기
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-hermes-orange">
                      {plan.price}원
                      <span className="text-sm text-gray-500 font-normal">/월</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* AI Cash Included */}
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Coins className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">AI캐쉬 포함</span>
                      </div>
                      <div className="text-lg font-bold text-yellow-600">
                        {plan.aiCashIncluded.toLocaleString()}원
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-hermes-orange hover:bg-hermes-orange/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.name === 'Free' ? '현재 플랜' : '선택하기'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      구독 요금제 vs AI캐쉬 시스템
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      구독 요금제는 월정액으로 AI캐쉬가 자동 충전됩니다. 
                      별도 충전 없이 서비스 내의 모든 기능을 AI캐쉬로 이용하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>결제 수단</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <CreditCard className="h-12 w-12 mx-auto mb-4 text-hermes-orange" />
                      <h3 className="font-semibold mb-2">신용카드</h3>
                      <p className="text-sm text-gray-600">간편하고 안전한 카드 결제</p>
                      <p className="text-xs text-gray-500 mt-2">VISA, MasterCard, JCB</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Smartphone className="h-12 w-12 mx-auto mb-4 text-hermes-orange" />
                      <h3 className="font-semibold mb-2">간편결제</h3>
                      <p className="text-sm text-gray-600">모바일 간편결제</p>
                      <p className="text-xs text-gray-500 mt-2">카카오페이, 네이버페이, 토스</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <Building2 className="h-12 w-12 mx-auto mb-4 text-hermes-orange" />
                      <h3 className="font-semibold mb-2">계좌이체</h3>
                      <p className="text-sm text-gray-600">실시간 계좌이체</p>
                      <p className="text-xs text-gray-500 mt-2">국내 모든 은행</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">결제 정보</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 결제는 SSL 보안 프로토콜로 안전하게 처리됩니다</li>
                    <li>• AI캐쉬 충전 후 환불은 사용하지 않은 캐쉬에 한해 가능합니다</li>
                    <li>• 구독 요금제는 언제든지 변경 또는 해지 가능합니다</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>결제 내역</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="charge">충전</SelectItem>
                      <SelectItem value="usage">사용</SelectItem>
                      <SelectItem value="subscription">구독</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant={transaction.type.includes('충전') ? 'default' : transaction.type.includes('사용') ? 'destructive' : 'outline'}
                          >
                            {transaction.type}
                          </Badge>
                          <span className="font-medium">{transaction.plan}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {transaction.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.amount}
                        </div>
                        <Badge 
                          variant={transaction.status === '완료' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}