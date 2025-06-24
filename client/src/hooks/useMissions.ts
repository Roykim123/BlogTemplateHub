import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { missionsApi, queryKeys, handleApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Hook for managing challenger missions
export const useMissions = (userId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get user's missions
  const {
    data: missions,
    isLoading: isLoadingMissions,
    error: missionsError,
  } = useQuery({
    queryKey: queryKeys.missions(userId),
    queryFn: () => missionsApi.getUserMissions(userId).then((res) => res.json()),
    enabled: !!userId,
  });

  // Complete mission
  const completeMissionMutation = useMutation({
    mutationFn: ({ missionId, day }: { missionId: number; day: number }) =>
      missionsApi.completeMission(userId, missionId, day).then((res) => res.json()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.missions(userId) });
      toast({
        title: "미션 완료! 🎉",
        description: `${data.rewardEarned}캐쉬를 획득했습니다!`,
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "미션 완료 실패",
        description: errorMsg.error || "미션 완료에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Helper functions
  const getTodayMissions = () => {
    if (!missions?.missions) return [];
    return missions.missions;
  };

  const getCompletedMissionsCount = (): number => {
    if (!missions?.missions) return 0;
    return missions.missions.filter((mission: any) => mission.completed).length;
  };

  const getTotalReward = (): number => {
    if (!missions?.missions) return 0;
    return missions.missions
      .filter((mission: any) => mission.completed)
      .reduce((total: number, mission: any) => total + mission.reward, 0);
  };

  const getProgressPercentage = (): number => {
    const total = missions?.missions?.length || 4;
    const completed = getCompletedMissionsCount();
    return Math.round((completed / total) * 100);
  };

  const isAllCompleted = (): boolean => {
    if (!missions?.missions) return false;
    return missions.missions.every((mission: any) => mission.completed);
  };

  const getCurrentDay = (): number => {
    return missions?.currentDay || 1;
  };

  return {
    missions: missions?.missions || [],
    currentDay: getCurrentDay(),
    isLoadingMissions,
    missionsError,
    completeMission: completeMissionMutation.mutate,
    isCompleting: completeMissionMutation.isPending,
    getTodayMissions,
    getCompletedMissionsCount,
    getTotalReward,
    getProgressPercentage,
    isAllCompleted,
  };
};