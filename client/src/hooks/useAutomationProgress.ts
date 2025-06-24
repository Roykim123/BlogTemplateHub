import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { automationApi, queryKeys, handleApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Hook for managing automation progress
export const useAutomationProgress = (toolId: number, userId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get automation progress
  const {
    data: progress,
    isLoading: isLoadingProgress,
    error: progressError,
  } = useQuery({
    queryKey: queryKeys.automationProgress(toolId, userId),
    queryFn: () => automationApi.getProgress(toolId, userId).then((res) => res.json()),
    enabled: !!toolId && !!userId,
  });

  // Update progress
  const updateProgressMutation = useMutation({
    mutationFn: ({ stage, completed }: { stage: number; completed: boolean }) =>
      automationApi.updateProgress(toolId, userId, stage, completed).then((res) => res.json()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.automationProgress(toolId, userId) });
      if (data.completed) {
        toast({
          title: "단계 완료!",
          description: `${data.stage}단계가 완료되었습니다.`,
        });
      }
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "진행 상황 업데이트 실패",
        description: errorMsg.error || "진행 상황 업데이트에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Helper functions
  const getProgressPercentage = (): number => {
    if (!progress?.stages) return 0;
    const completedStages = progress.stages.filter((stage: any) => stage.completed).length;
    return Math.round((completedStages / progress.totalStages) * 100);
  };

  const getCurrentStage = () => {
    if (!progress?.stages) return null;
    return progress.stages.find((stage: any) => !stage.completed) || progress.stages[progress.stages.length - 1];
  };

  const isCompleted = (): boolean => {
    return progress?.isCompleted || false;
  };

  const getNextStage = () => {
    if (!progress?.stages) return null;
    const currentStageIndex = progress.stages.findIndex((stage: any) => !stage.completed);
    return currentStageIndex !== -1 ? progress.stages[currentStageIndex] : null;
  };

  return {
    progress,
    isLoadingProgress,
    progressError,
    updateProgress: updateProgressMutation.mutate,
    isUpdating: updateProgressMutation.isPending,
    getProgressPercentage,
    getCurrentStage,
    isCompleted,
    getNextStage,
  };
};