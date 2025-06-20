import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Gift, Copy, Share2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReferralPage() {
  const [referralCode] = useState("WORRY2024AI");
  const [referralStats] = useState({
    totalReferrals: 12,
    pendingRewards: 15000,
    totalEarned: 45000
  });
  const { toast } = useToast();

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://worryai.com/signup?ref=${referralCode}`);
    toast({
      title: "링크 복사 완료!",
      description: "초대 링크가 클립보드에 복사되었습니다.",
    });
  };

  const shareToKakao = () => {
    // Implement Kakao share functionality
    toast({
      title: "카카오톡 공유",
      description: "카카오톡으로 친구를 초대해보세요!",
    });
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">친구 초대하고 AI캐쉬 받기</h1>
          <p className="text-gray-600 dark:text-gray-400">친구가 가입하면 둘 다 5,000 AI캐쉬를 받아요!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 초대 친구</CardTitle>
              <Users className="h-4 w-4 text-hermes-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.totalReferrals}명</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">대기 중 보상</CardTitle>
              <Gift className="h-4 w-4 text-hermes-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.pendingRewards.toLocaleString()} AI캐쉬</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 획득 보상</CardTitle>
              <Gift className="h-4 w-4 text-hermes-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.totalEarned.toLocaleString()} AI캐쉬</div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="h-5 w-5 text-hermes-orange" />
              <span>내 초대 링크</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                value={`https://worryai.com/signup?ref=${referralCode}`}
                readOnly
                className="flex-1"
              />
              <Button onClick={copyReferralCode} className="bg-hermes-orange hover:bg-hermes-orange/90">
                <Copy className="h-4 w-4 mr-2" />
                복사
              </Button>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={shareToKakao}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                카카오톡으로 초대
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: '걱정마AI - AI 글쓰기 서비스',
                      text: '친구와 함께 AI캐쉬를 받고 무료로 AI 글쓰기를 체험해보세요!',
                      url: `https://worryai.com/signup?ref=${referralCode}`
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                다른 방법으로 공유
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>초대 방법</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-hermes-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">링크 공유</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">위의 초대 링크를 친구에게 공유하세요</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-hermes-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">친구 가입</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">친구가 링크를 통해 가입을 완료합니다</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-hermes-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">보상 지급</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">가입 완료 후 둘 다 5,000 AI캐쉬 지급</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        <Card>
          <CardHeader>
            <CardTitle>최근 초대 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "김**", date: "2025-01-20", status: "완료", reward: "5,000 AI캐쉬" },
                { name: "이**", date: "2025-01-19", status: "대기중", reward: "5,000 AI캐쉬" },
                { name: "박**", date: "2025-01-18", status: "완료", reward: "5,000 AI캐쉬" },
              ].map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{referral.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      referral.status === "완료" ? "text-green-600" : "text-yellow-600"
                    }`}>
                      {referral.status}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{referral.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}