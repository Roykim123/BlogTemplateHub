import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Crown, Zap } from "lucide-react";

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "basic",
      name: "베이직",
      price: "9,900원",
      period: "/월",
      features: [
        "월 100회 AI 생성",
        "기본 템플릿 사용",
        "이메일 지원",
        "모바일 앱 사용"
      ],
      popular: false
    },
    {
      id: "pro",
      name: "프로",
      price: "19,900원",
      period: "/월",
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
      price: "49,900원",
      period: "/월",
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

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">요금제 선택</h1>
          <p className="text-gray-600 dark:text-gray-400">당신에게 맞는 플랜을 선택하세요.</p>
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
                <div className="text-3xl font-bold text-hermes-orange">
                  {plan.price}
                  <span className="text-lg text-gray-600 dark:text-gray-400">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-hermes-orange" />
              <span>결제 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">카드 번호</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">만료일</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>

            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              {plans.map((plan) => (
                <div key={plan.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={plan.id} id={plan.id} />
                  <Label htmlFor={plan.id} className="cursor-pointer">
                    {plan.name} - {plan.price}{plan.period}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button className="w-full bg-hermes-orange hover:bg-hermes-orange/90">
              결제하기
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              언제든지 취소할 수 있으며, 결제는 안전하게 보호됩니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
