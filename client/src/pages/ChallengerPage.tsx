import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Trophy, Target, Zap, CheckCircle, PenTool, Play, Share2, Eye, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChallengerPage() {
  const currentDay = 3; // 현재 3일차
  const totalDays = 7;
  const progress = (currentDay / totalDays) * 100;
  const { toast } = useToast();

  const [weeklyMissions, setWeeklyMissions] = useState([
    {
      day: 1,
      date: "2025.01.20 (월)",
      missions: [
        { id: 1, title: "AI 글쓰기", icon: PenTool, completed: true },
        { id: 2, title: "영상보기", icon: Play, completed: true },
        { id: 3, title: "공유하기", icon: Share2, completed: true },
        { id: 4, title: "게시판 보기", icon: Eye, completed: true }
      ]
    },
    {
      day: 2,
      date: "2025.01.21 (화)",
      missions: [
        { id: 5, title: "AI 글쓰기", icon: PenTool, completed: true },
        { id: 6, title: "영상보기", icon: Play, completed: true },
        { id: 7, title: "공유하기", icon: Share2, completed: true },
        { id: 8, title: "게시판 보기", icon: Eye, completed: false }
      ]
    },
    {
      day: 3,
      date: "2025.01.22 (수)",
      missions: [
        { id: 9, title: "AI 글쓰기", icon: PenTool, completed: false },
        { id: 10, title: "영상보기", icon: Play, completed: false },
        { id: 11, title: "공유하기", icon: Share2, completed: false },
        { id: 12, title: "게시판 보기", icon: Eye, completed: false }
      ]
    },
    {
      day: 4,
      date: "2025.01.23 (목)",
      missions: [
        { id: 13, title: "AI 글쓰기", icon: PenTool, completed: false },
        { id: 14, title: "영상보기", icon: Play, completed: false },
        { id: 15, title: "공유하기", icon: Share2, completed: false },
        { id: 16, title: "게시판 보기", icon: Eye, completed: false }
      ]
    },
    {
      day: 5,
      date: "2025.01.24 (금)",
      missions: [
        { id: 17, title: "AI 글쓰기", icon: PenTool, completed: false },
        { id: 18, title: "영상보기", icon: Play, completed: false },
        { id: 19, title: "공유하기", icon: Share2, completed: false },
        { id: 20, title: "게시판 보기", icon: Eye, completed: false }
      ]
    },
    {
      day: 6,
      date: "2025.01.25 (토)",
      missions: [
        { id: 21, title: "AI 글쓰기", icon: PenTool, completed: false },
        { id: 22, title: "영상보기", icon: Play, completed: false },
        { id: 23, title: "공유하기", icon: Share2, completed: false },
        { id: 24, title: "게시판 보기", icon: Eye, completed: false }
      ]
    },
    {
      day: 7,
      date: "2025.01.26 (일)",
      missions: [
        { id: 25, title: "AI 글쓰기", icon: PenTool, completed: false },
        { id: 26, title: "영상보기", icon: Play, completed: false },
        { id: 27, title: "공유하기", icon: Share2, completed: false },
        { id: 28, title: "게시판 보기", icon: Eye, completed: false }
      ]
    }
  ]);

  const handleMissionClick = (dayIndex: number, missionIndex: number) => {
    const newWeeklyMissions = [...weeklyMissions];
    const mission = newWeeklyMissions[dayIndex].missions[missionIndex];
    mission.completed = !mission.completed;
    
    setWeeklyMissions(newWeeklyMissions);
    
    if (mission.completed) {
      toast({
        title: "미션 완료!",
        description: `${mission.title} 미션을 완료했습니다.`,
      });
    } else {
      toast({
        title: "미션 취소",
        description: `${mission.title} 미션을 취소했습니다.`,
      });
    }
  };

  const getDayStatus = (dayMissions: any[]) => {
    const completedCount = dayMissions.filter(m => m.completed).length;
    const totalCount = dayMissions.length;
    
    if (completedCount === totalCount) return "completed";
    if (completedCount > 0) return "partial";
    return "incomplete";
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Rewards Section - Moved to Top */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-hermes-orange to-soft-pink text-white p-6 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">🎁 오늘의 챌린지 리워드</h2>
                <p className="text-lg opacity-90 mb-3">일일 미션 완료시 5,000 AI캐쉬 적립!</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span>• SNS 자동포스팅 1회</span>
                  <span>• 친구추천 1명</span>
                  <span>• 블로그 템플릿 사용 1회</span>
                  <span>• 튜토리얼 시청</span>
                </div>
              </div>
              <Button className="bg-white text-hermes-orange hover:bg-gray-50 font-bold text-lg px-8 py-3">
                리워드 받기
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🏆 7일 챌린저
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            7일간 미션을 완료하고 특별한 리워드를 받아보세요
          </p>
        </div>

        {/* 진행 상황 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">현재 진행</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentDay}일차</p>
                </div>
                <div className="w-12 h-12 bg-hermes-orange rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">전체 진행도</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.round(progress)}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">예상 리워드</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">5,000 캐쉬</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 전체 진행도 바 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">7일 챌린지 진행도</h3>
              <Badge className="bg-hermes-orange text-white">
                {currentDay}/{totalDays} 완료
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {totalDays - currentDay}일 남았습니다. 꾸준히 미션을 완료해보세요!
            </p>
          </CardContent>
        </Card>

        {/* 7일 미션 현황 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
              <Calendar className="h-5 w-5" />
              <span>7일 미션 현황</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyMissions.map((dayData, dayIndex) => {
                const status = getDayStatus(dayData.missions);
                const completedCount = dayData.missions.filter(m => m.completed).length;
                
                return (
                  <div key={dayData.day} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : status === 'partial'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                          }
                        `}>
                          {dayData.day}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">Day {dayData.day}</div>
                          <div className="text-xs text-gray-500">{dayData.date}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {completedCount}/4 완료
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {dayData.missions.map((mission, missionIndex) => {
                        const IconComponent = mission.icon;
                        return (
                          <button
                            key={mission.id}
                            onClick={() => handleMissionClick(dayIndex, missionIndex)}
                            className={`
                              p-3 rounded-lg border-2 transition-all
                              ${mission.completed 
                                ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-400 dark:text-green-300' 
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-hermes-orange dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                              }
                            `}
                          >
                            <IconComponent className="h-5 w-5 mx-auto mb-1" />
                            <div className="text-xs font-medium">{mission.title}</div>
                            {mission.completed && (
                              <CheckCircle className="h-3 w-3 mx-auto mt-1 text-green-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 리워드 정보 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
              <Trophy className="h-5 w-5" />
              <span>챌린지 리워드</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">3일 달성</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">1,000 AI캐쉬</div>
                <Badge className="bg-green-100 text-green-800 mt-2">달성 완료</Badge>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">5일 달성</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">3,000 AI캐쉬</div>
                <Badge variant="outline" className="mt-2">진행 중</Badge>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">7일 완주</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">5,000 AI캐쉬 + 특별 뱃지</div>
                <Badge variant="outline" className="mt-2">도전 중</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}