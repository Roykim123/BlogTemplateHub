import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  CheckCircle,
  Target,
  Flame,
  Users,
  Star,
  Gift
} from "lucide-react";

export default function ChallengerPage() {
  const [currentStreak, setCurrentStreak] = useState(3);
  const [todayCompleted, setTodayCompleted] = useState(false);

  const weeklyMissions = [
    { day: "월", date: "20", completed: true, mission: "AI 글쓰기 1회" },
    { day: "화", date: "21", completed: true, mission: "커뮤니티 댓글 3개" },
    { day: "수", date: "22", completed: true, mission: "블로그 공유 1회" },
    { day: "목", date: "23", completed: false, mission: "튜토리얼 시청", today: true },
    { day: "금", date: "24", completed: false, mission: "친구 초대 1명" },
    { day: "토", date: "25", completed: false, mission: "리뷰 작성" },
    { day: "일", date: "26", completed: false, mission: "주간 정리" }
  ];

  const challenges = [
    {
      id: 1,
      title: "7일 연속 접속 챌린지",
      description: "7일 동안 매일 접속하여 AI 도구를 사용해보세요",
      progress: 3,
      total: 7,
      reward: "1,000 AI캐쉬",
      active: true
    },
    {
      id: 2,
      title: "블로그 마스터",
      description: "이번 주에 블로그 글 5개 작성하기",
      progress: 2,
      total: 5,
      reward: "프리미엄 템플릿 1개",
      active: true
    },
    {
      id: 3,
      title: "커뮤니티 활동가",
      description: "커뮤니티에서 10개의 게시글에 댓글 달기",
      progress: 7,
      total: 10,
      reward: "특별 뱃지",
      active: true
    }
  ];

  const leaderboard = [
    { rank: 1, name: "블로거킹", streak: 28, badge: "🏆" },
    { rank: 2, name: "AI마스터", streak: 24, badge: "🥈" },
    { rank: 3, name: "콘텐츠메이커", streak: 21, badge: "🥉" },
    { rank: 4, name: "글쓰기전문가", streak: 18, badge: "" },
    { rank: 5, name: "당신", streak: currentStreak, badge: "", highlight: true }
  ];

  const completeDailyMission = () => {
    setTodayCompleted(true);
    setCurrentStreak(prev => prev + 1);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <span>챌린저 프로젝트</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            7일간 연속 미션을 완료하고 특별한 보상을 받아보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Status & Weekly Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Streak */}
            <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-700 dark:text-yellow-300">
                  <Flame className="h-6 w-6" />
                  <span>현재 연속 기록</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                      {currentStreak}일
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      연속 접속 중! 🔥
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">🏆</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      목표: 7일
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Mission Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-hermes-orange" />
                  <span>이번 주 미션 현황</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyMissions.map((mission, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center border ${
                        mission.completed
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : mission.today
                          ? "bg-hermes-orange/10 border-hermes-orange dark:bg-hermes-orange/20"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                      }`}
                    >
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {mission.day}
                      </div>
                      <div className="text-lg font-bold mt-1">
                        {mission.date}
                      </div>
                      <div className="mt-2">
                        {mission.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                        ) : mission.today ? (
                          <Clock className="h-6 w-6 text-hermes-orange mx-auto" />
                        ) : (
                          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                        )}
                      </div>
                      <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                        {mission.mission}
                      </div>
                    </div>
                  ))}
                </div>
                
                {!todayCompleted && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={completeDailyMission}
                      className="bg-hermes-orange hover:bg-hermes-orange/90"
                    >
                      오늘의 미션 완료하기
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span>진행 중인 챌린지</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {challenge.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-hermes-orange border-hermes-orange">
                        {challenge.reward}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{challenge.progress}/{challenge.total}</span>
                        <span>{Math.round((challenge.progress / challenge.total) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Leaderboard & Rewards */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span>리더보드</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.highlight
                        ? "bg-hermes-orange/10 border border-hermes-orange"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {user.rank}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {user.streak}일 연속
                        </div>
                      </div>
                    </div>
                    <div className="text-lg">
                      {user.badge}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  <span>보상 현황</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">3일 연속 달성</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    보상: 500 AI캐쉬 (수령완료)
                  </p>
                </div>

                <div className="p-3 bg-hermes-orange/10 border border-hermes-orange rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-hermes-orange" />
                    <span className="text-sm font-medium">7일 연속 목표</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    보상: 2,000 AI캐쉬 + 특별 뱃지
                  </p>
                  <Progress value={(currentStreak / 7) * 100} className="h-1 mt-2" />
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">30일 연속 목표</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    보상: 프리미엄 계정 1개월
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Daily Tip */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300 text-sm">
                  💡 오늘의 팁
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  매일 같은 시간에 접속하여 루틴을 만들어보세요. 
                  알림 설정을 통해 미션을 놓치지 않을 수 있습니다!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}