import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, queryKeys, handleApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Hook for managing AI Cash
export const useAiCash = (userId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get user's AI Cash balance and history
  const {
    data: cashData,
    isLoading: isLoadingCash,
    error: cashError,
  } = useQuery({
    queryKey: queryKeys.userAiCash(userId),
    queryFn: () => userApi.getAiCash(userId).then((res) => res.json()),
    enabled: !!userId,
  });

  // Charge AI Cash
  const chargeAiCashMutation = useMutation({
    mutationFn: ({ amount, paymentMethod }: { amount: number; paymentMethod: string }) =>
      userApi.chargeAiCash(userId, amount, paymentMethod).then((res) => res.json()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userAiCash(userId) });
      toast({
        title: "충전 완료!",
        description: data.message || `${data.amount}캐쉬가 충전되었습니다.`,
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "충전 실패",
        description: errorMsg.error || "AI캐쉬 충전에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Spend AI Cash
  const spendAiCashMutation = useMutation({
    mutationFn: ({ amount, description }: { amount: number; description: string }) =>
      userApi.spendAiCash(userId, amount, description).then((res) => res.json()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userAiCash(userId) });
      toast({
        title: "결제 완료!",
        description: data.message || `${data.amount}캐쉬가 차감되었습니다.`,
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "결제 실패",
        description: errorMsg.error || "AI캐쉬 결제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Helper function to check if user has enough cash
  const hasEnoughCash = (amount: number): boolean => {
    return (cashData?.aiCash || 0) >= amount;
  };

  // Helper function to get formatted cash balance
  const getFormattedBalance = (): string => {
    return (cashData?.aiCash || 0).toLocaleString();
  };

  return {
    aiCash: cashData?.aiCash || 0,
    cashHistory: cashData?.cashHistory || [],
    isLoadingCash,
    cashError,
    chargeAiCash: chargeAiCashMutation.mutate,
    spendAiCash: spendAiCashMutation.mutate,
    isCharging: chargeAiCashMutation.isPending,
    isSpending: spendAiCashMutation.isPending,
    hasEnoughCash,
    getFormattedBalance,
  };
};