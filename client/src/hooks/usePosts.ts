import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi, queryKeys, transformers, handleApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Hook for managing community posts
export const usePosts = (params?: { category?: string; limit?: number; offset?: number }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get posts
  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    error: postsError,
  } = useQuery({
    queryKey: queryKeys.posts(params),
    queryFn: () => postsApi.getPosts(params).then((res) => res.json()),
  });

  // Create new post
  const createPostMutation = useMutation({
    mutationFn: ({ postData, userId }: { postData: any; userId: number }) => {
      const backendData = transformers.postToBackend(postData, userId);
      return postsApi.createPost(backendData).then((res) => res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
      toast({
        title: "게시글 작성 완료",
        description: "게시글이 성공적으로 작성되었습니다.",
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "작성 실패",
        description: errorMsg.error || "게시글 작성에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Update post
  const updatePostMutation = useMutation({
    mutationFn: ({ id, postData, userId }: { id: number; postData: any; userId: number }) => {
      const backendData = transformers.postToBackend(postData, userId);
      return postsApi.updatePost(id, backendData).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
      toast({
        title: "게시글 수정 완료",
        description: "게시글이 성공적으로 수정되었습니다.",
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "수정 실패",
        description: errorMsg.error || "게시글 수정에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // Delete post
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
      toast({
        title: "게시글 삭제 완료",
        description: "게시글이 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error) => {
      const errorMsg = handleApiError(error);
      toast({
        title: "삭제 실패",
        description: errorMsg.error || "게시글 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  return {
    posts,
    isLoadingPosts,
    postsError,
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isCreating: createPostMutation.isPending,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
  };
};