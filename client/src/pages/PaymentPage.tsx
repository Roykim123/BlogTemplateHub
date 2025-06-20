import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Crown, Zap } from "lucide-react";

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [activeTab, setActiveTab] = useState("plans");

  const plans = [
    {
      id: "basic",
      name: "베이직",
      price: "129,700원",
      originalPrice: "199,000원",
      aiCash: "300 Coin",
      period: "/월",
      features: [
        "월 300회 AI 생성",
        "기본 템플릿 사용",
        "이메일 지원",
        "모바일 앱 사용"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "프로",
      price: "월 구독제",
      originalPrice: "",
      aiCash: "500 Coin",
      period: "",
      features: [
        "월 500회 AI 생성",
        "모든 템플릿 사용",
        "우선 지원",
        "고급 분석 도구",
        "API 액세스"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "엔터프라이즈",
      price: "영업팀 문의",
      originalPrice: "",
      aiCash: "Unlimited",
      period: "",
      features: [
        "무제한 AI 생성",
        "커스텀 템플릿",
        "전용 지원팀",
        "고급 보안",
        "팀 관리 기능",
        "온사이트 교육"
      ],
      popular: false
    }
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
            { id: "payment", label: "결제정보" },
            { id: "profile", label: "회원정보" }
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
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">AI 기능별로 차별화된 서비스 제공</h1>
              <p className="text-gray-600 dark:text-gray-400">가장 좋은 플랜 대비 44% 절약, 원하신 적립금 충전도 간편하게</p>
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
                        <span>Best</span>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {plan.name}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-hermes-orange">
                        {plan.price}
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {plan.originalPrice}
                        </div>
                      )}
                      <div className="text-lg font-semibold text-blue-600">
                        {plan.aiCash}
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
          </>
        )}

        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">결제 정보</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>현재 구독 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">현재 플랜</p>
                    <p className="font-semibold">{userInfo.currentPlan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">보유 AI캐쉬</p>
                    <p className="font-semibold text-hermes-orange">{userInfo.aiCash}</p>
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
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">회원 정보</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" value={userInfo.name} readOnly className="bg-gray-50 dark:bg-gray-800" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" value={userInfo.email} readOnly className="bg-gray-50 dark:bg-gray-800" />
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

                <div className="space-y-2">
                  <Label>가입일</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2024년 11월 15일</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI캐쉬 사용 내역</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "2025-01-20", action: "AI 블로그 작성", amount: "-50 AI캐쉬" },
                    { date: "2025-01-19", action: "친구 초대 보상", amount: "+5,000 AI캐쉬" },
                    { date: "2025-01-18", action: "출석 체크", amount: "+100 AI캐쉬" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.action}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                      </div>
                      <p className={`font-semibold ${
                        transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}


      </div>
    </div>
  );
}
