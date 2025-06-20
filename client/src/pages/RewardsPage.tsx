import { Button } from "@/components/ui/button";
import { REWARD_MISSIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Bot, UserRoundCheck } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <div className="bg-gradient-to-r from-hermes-orange to-soft-pink text-white p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">오늘의 크레딧 미션</h2>
              <p className="text-sm opacity-90">5,000</p>
            </div>
            <Button className="bg-white text-hermes-orange hover:bg-gray-50">
              적립하기
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-700 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🎰</div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">출석 체크</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">📦</div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">무료 활용</p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-800 dark:to-pink-700 p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🎁</div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">적립 혜택</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">서비스가 준비한 혜택 모으기</h3>
        
        <div className="space-y-3">
          {REWARD_MISSIONS.map((mission) => {
            const IconComponent = mission.icon;
            return (
              <div
                key={mission.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    mission.color === "red" && "bg-red-100 dark:bg-red-900",
                    mission.color === "blue" && "bg-blue-100 dark:bg-blue-900",
                    mission.color === "green" && "bg-green-100 dark:bg-green-900",
                    mission.color === "purple" && "bg-purple-100 dark:bg-purple-900"
                  )}>
                    <IconComponent className={cn(
                      "h-4 w-4",
                      mission.color === "red" && "text-red-500",
                      mission.color === "blue" && "text-blue-500",
                      mission.color === "green" && "text-green-500",
                      mission.color === "purple" && "text-purple-500"
                    )} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{mission.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{mission.description}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs",
                  mission.status === "active" 
                    ? "bg-hermes-orange text-white"
                    : "text-hermes-orange font-medium"
                )}>
                  {mission.reward}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Bot className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">AI 제품비교</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">제품 리뷰와 비교 분석</p>
          <Button 
            variant="outline"
            size="sm"
            className="w-full"
          >
            서비스예약하기
          </Button>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <UserRoundCheck className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">AI 상담원</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">전문 상담원과 대화하기</p>
          <Button 
            variant="outline"
            size="sm"
            className="w-full"
          >
            서비스예약하기
          </Button>
        </div>
      </div>
    </div>
  );
}
