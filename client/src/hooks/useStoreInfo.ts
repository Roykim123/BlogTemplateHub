import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storeInfoApi, queryKeys, transformers, handleApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Hook for managing store information
export const useStoreInfo = (userId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get user's store information
  const {
    data: storeInfos = [],
    isLoading: isLoadingStoreInfos,
    error: storeInfosError,
  } = useQuery({
    queryKey: queryKeys.storeInfos(userId),
    queryFn: () => storeInfoApi.getUserStoreInfos(userId).then((res) => res.json()),
    enabled: !!userId,
  });

  // Create new store information
  const createStoreInfoMutation = useMutation({
    mutationFn: (storeData: any) => {
      const backendData = transformers.storeInfoToBackend(storeData, userId);
      return storeInfoApi.createStoreInfo(backendData).then((res) => res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.storeInfos(userId) });
      toast({
        title: "상품정보 저장 완료!",
        description: "새 상품정보가 성공적으로 저장되었습니다.",
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "저장 실패",
        description: errorMsg.error || "상품정보 저장에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Update store information
  const updateStoreInfoMutation = useMutation({
    mutationFn: ({ id, storeData }: { id: number; storeData: any }) => {
      const backendData = transformers.storeInfoToBackend(storeData, userId);
      return storeInfoApi.updateStoreInfo(id, backendData).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.storeInfos(userId) });
      toast({
        title: "수정 완료!",
        description: "상품정보가 성공적으로 수정되었습니다.",
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "수정 실패",
        description: errorMsg.error || "상품정보 수정에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Delete store information
  const deleteStoreInfoMutation = useMutation({
    mutationFn: (id: number) => storeInfoApi.deleteStoreInfo(id).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.storeInfos(userId) });
      toast({
        title: "삭제 완료",
        description: "상품정보가 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "삭제 실패",
        description: errorMsg.error || "상품정보 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  return {
    storeInfos,
    isLoadingStoreInfos,
    storeInfosError,
    createStoreInfo: createStoreInfoMutation.mutate,
    updateStoreInfo: updateStoreInfoMutation.mutate,
    deleteStoreInfo: deleteStoreInfoMutation.mutate,
    isCreating: createStoreInfoMutation.isPending,
    isUpdating: updateStoreInfoMutation.isPending,
    isDeleting: deleteStoreInfoMutation.isPending,
  };
};