import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap } from "lucide-react";

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [activeTab, setActiveTab] = useState("plans");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "무료",
      originalPrice: "",
      discount: "",
      aiCash: "20 coin",
      period: "14일간",
      features: [
        "G-코인 20 coin 제공 (유효기간 14일)",
        "정보성 블로그 기준 10회 생성 가능",
        "블로그 상위노출 AI 추천 키워드 제공",
        "다양한 생성 AI 툴 무제한",
        "한번에 1개 생성 결과물 제공",
        "AI 이미지 생성 제공",
        "생성 이력 3개월 저장",
        "속도제한"
      ],
      popular: false
    },
    {
      id: "basic",
      name: "베이직",
      price: "₩29,700원",
      originalPrice: "₩54,000",
      discount: "45%",
      aiCash: "300 coin",
      period: "/월",
      features: [
        "G-코인 300 coin 매월 충전",
        "정보성 블로그 기준 월 150회 생성 가능",
        "매장후기 블로그 기준 월 75회 생성 이용",
        "블로그 상위노출 AI 추천 키워드 제공",
        "다양한 생성 AI 툴 무제한",
        "한번에 다건 생성 결과물 제공",
        "황금키워드/스마트블록 키워드 제공",
        "AI 이미지 생성 제공",
        "가제트 생성 API 제공",
        "생성 이력 3개월 저장",
        "더 빠른 생성 속도"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "엔터프라이즈",
      price: "영업팀 문의",
      originalPrice: "",
      discount: "",
      aiCash: "3,000+ coin",
      period: "",
      features: [
        "G-코인 3,000 coin 이상 필요시 가능 (협의)",
        "정보성 블로그 기준 월 1,500회 생성 가능",
        "매장후기 블로그 기준 월 750회 생성 가능",
        "블로그 상위노출 AI 추천 키워드 제공",
        "다양한 생성 AI 툴 무제한",
        "한번에 다건 생성 결과물 제공",
        "AI 이미지 생성 제공",
        "생성 이력 3개월 저장",
        "더 빠른 생성 속도",
        "별도 대량 글생성 후 txt 파일 제공",
        "기업 전용 커스터마이징 및 API 제공",
        "황금키워드/스마트블록 키워드 제공",
        "엔터프라이즈 전담데스크"
      ],
      popular: false
    }
  ];

  const coinPackages = [
    { coins: 80, price: "$6.99", originalPrice: "$7.77" },
    { coins: 200, price: "$14.99", originalPrice: "$16.66" },
    { coins: 450, price: "$29.99", originalPrice: "$33.33" },
    { coins: 1000, price: "$59.99", originalPrice: "$66.66" },
    { coins: 2000, price: "$99.99", originalPrice: "$111.11" },
    { coins: 3500, price: "$219.00", originalPrice: "$243.33", annual: true }
  ];

  const paymentHistory = [
    { id: 1, date: "2025-01-15", plan: "프로", amount: "19,900원", status: "결제완료" },
    { id: 2, date: "2024-12-15", plan: "프로", amount: "19,900원", status: "결제완료" },
    { id: 3, date: "2024-11-15", plan: "프로", amount: "19,900원", status: "결제완료" },
  ];

  const userInfo = {
    email: "user@example.com",
    name: "홍길동",
    currentPlan: "프로",
    aiCash: "2,450 AI캐쉬",
    nextBilling: "2025-02-15"
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { id: "plans", label: "요금제" },
            { id: "referral", label: "친구초대" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "plans" && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">요금제</h1>
              <p className="text-gray-600 dark:text-gray-400">좌우로 스크롤을 움직여서 원하는 요금제를 선택하세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlan === plan.id 
                      ? "ring-2 ring-hermes-orange border-hermes-orange" 
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-hermes-orange text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Crown className="h-3 w-3" />
                        <span>인기</span>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {plan.name}
                    </CardTitle>
                    <div className="space-y-2">
                      {plan.discount && (
                        <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                          {plan.discount} 할인
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-hermes-orange">
                          {plan.price}
                          <span className="text-sm text-gray-500 font-normal">{plan.period}</span>
                        </div>
                        {plan.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {plan.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-blue-600">
                        G-코인: {plan.aiCash}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? "bg-hermes-orange hover:bg-hermes-orange/90" 
                          : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {plan.id === "enterprise" ? "영업팀 문의" : "선택하기"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coin Packages */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">AI캐쉬 충전</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {coinPackages.map((pkg, index) => (
                  <Card key={index} className="text-center cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      {pkg.annual && (
                        <Badge className="bg-green-100 text-green-800 mb-2">연간 10% 할인</Badge>
                      )}
                      <div className="text-lg font-bold text-hermes-orange">{pkg.coins}캐쉬</div>
                      <div className="text-sm font-semibold">{pkg.price}</div>
                      {pkg.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">{pkg.originalPrice}</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "referral" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">친구 초대</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>친구를 초대하고 함께 AI캐쉬를 받으세요!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h3 className="font-semibold mb-2">1. 친구 초대</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      초대 링크를 친구에게 공유하세요
                    </p>
                  </div>
                  
                  <div>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="font-semibold mb-2">2. 친구 가입</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      친구가 링크를 통해 가입 완료
                    </p>
                  </div>
                  
                  <div>
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <h3 className="font-semibold mb-2">3. 보상 지급</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      둘 다 5,000 AI캐쉬 지급
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    className="bg-hermes-orange hover:bg-hermes-orange/90"
                    onClick={() => window.location.href = "/referral"}
                  >
                    지금 친구 초대하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}




      </div>
    </div>
  );
}
