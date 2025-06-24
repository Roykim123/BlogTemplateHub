import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, Share2, Clock, Eye, TrendingUp, Plus, Edit, Trash2, Users, HelpCircle, Lightbulb, Star, ArrowRight } from "lucide-react";
import { boardSamples } from "@/data/boardSamples";
import { useToast } from "@/hooks/use-toast";
import { arrayUtils, formatUtils } from "@/utils/optimizations";

export default function CommunityPage() {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [posts, setPosts] = useState(boardSamples);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "일반"
  });
  const { toast } = useToast();

  const boardCategories = [
    {
      id: "general",
      name: "일반 게시판",
      description: "자유로운 소통과 정보 공유",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      posts: posts.filter(post => post.category === "일반").length,
      latestPost: "2시간 전"
    },
    {
      id: "question", 
      name: "질문 게시판",
      description: "AI 활용 관련 질문과 답변",
      icon: HelpCircle,
      color: "from-green-500 to-emerald-500", 
      posts: posts.filter(post => post.category === "질문").length,
      latestPost: "1시간 전"
    },
    {
      id: "tips",
      name: "팁 게시판", 
      description: "유용한 팁과 노하우 공유",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      posts: posts.filter(post => post.category === "팁").length,
      latestPost: "30분 전"
    },
    {
      id: "review",
      name: "후기 게시판",
      description: "서비스 이용 후기와 경험담",
      icon: Star, 
      color: "from-purple-500 to-pink-500",
      posts: posts.filter(post => post.category === "후기").length,
      latestPost: "15분 전"
    }
  ];

  const handleCreatePost = () => {
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "나",
      avatar: "나",
      category: newPost.category,
      createdAt: "방금 전",
      likes: 0,
      comments: 0,
      views: 1,
      isHot: false
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "일반" });
    setIsWriteModalOpen(false);
    toast({
      title: "게시글 작성 완료",
      description: "게시글이 성공적으로 작성되었습니다.",
    });
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      category: post.category
    });
  };

  const handleUpdatePost = () => {
    setPosts(posts.map(post => 
      post.id === editingPost.id 
        ? { ...post, title: newPost.title, content: newPost.content, category: newPost.category }
        : post
    ));
    setEditingPost(null);
    setNewPost({ title: "", content: "", category: "일반" });
    toast({
      title: "게시글 수정 완료",
      description: "게시글이 성공적으로 수정되었습니다.",
    });
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast({
      title: "게시글 삭제 완료",
      description: "게시글이 성공적으로 삭제되었습니다.",
    });
  };

  // Show dashboard if no board is selected
  if (!selectedBoard) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              🔥 커뮤니티
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              다른 사용자들과 AI 활용 노하우를 공유하고 소통해보세요
            </p>
          </div>

          {/* Board Categories Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boardCategories.map((board) => {
              const IconComponent = board.icon;
              return (
                <Card 
                  key={board.id}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                  onClick={() => setSelectedBoard(board.id)}
                >
                  <CardHeader className={`bg-gradient-to-r ${board.color} text-white rounded-t-lg`}>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-6 w-6" />
                        <span>{board.name}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {board.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{board.posts}개 게시글</span>
                        </span>
                      </div>
                      <span className="text-gray-500">
                        최근 게시글: {board.latestPost}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Hot Posts */}
          <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>🔥 실시간 인기 게시글</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {posts.filter(post => post.isHot).slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <Badge className="bg-red-500 text-white text-xs">HOT</Badge>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <p className="text-xs text-gray-500">{post.author} • {post.createdAt}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Heart className="h-3 w-3" />
                      <span>{formatUtils.formatNumber(post.likes)}</span>
                      <MessageCircle className="h-3 w-3" />
                      <span>{formatUtils.formatNumber(post.comments)}</span>
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

  // Memoize filtered posts for performance - moved outside conditional rendering
  const filteredPosts = useMemo(() => {
    if (!selectedBoard) return [];
    const categoryMap: Record<string, string> = {
      general: "일반",
      question: "질문", 
      tips: "팁",
      review: "후기"
    };
    return arrayUtils.filterWithEarlyReturn(
      posts, 
      post => post.category === categoryMap[selectedBoard],
      50 // Limit to 50 posts for performance
    );
  }, [posts, selectedBoard]);

  // Show specific board content
  const currentBoard = boardCategories.find(board => board.id === selectedBoard);

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedBoard(null)}
                className="mb-2 text-purple-600 hover:text-purple-700"
              >
                ← 커뮤니티 홈으로
              </Button>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {currentBoard?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {currentBoard?.description}
              </p>
            </div>
            <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  글쓰기
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 게시글 작성</DialogTitle>
                  <DialogDescription>
                    {currentBoard?.name}에 새로운 게시글을 작성합니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">카테고리</label>
                    <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="일반">일반</SelectItem>
                        <SelectItem value="질문">질문</SelectItem>
                        <SelectItem value="팁">팁</SelectItem>
                        <SelectItem value="후기">후기</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">제목</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">내용</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="내용을 입력하세요"
                      rows={10}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreatePost} className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90">
                      작성하기
                    </Button>
                    <Button variant="outline" onClick={() => setIsWriteModalOpen(false)} className="flex-1">
                      취소
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 인기 게시글 */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>🔥 인기 게시글</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {posts.filter(post => post.isHot).slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Badge className="bg-red-500 text-white text-xs">HOT</Badge>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <p className="text-xs text-gray-500">{post.author} • {post.createdAt}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                    <MessageCircle className="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-hermes-orange text-white">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {post.author}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    {post.isHot && (
                      <Badge className="bg-red-500 text-white text-xs">
                        🔥 HOT
                      </Badge>
                    )}
                    {post.author === "나" && (
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>게시글 수정</DialogTitle>
                              <DialogDescription>
                                게시글 내용을 수정합니다.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">카테고리</label>
                                <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="일반">일반</SelectItem>
                                    <SelectItem value="질문">질문</SelectItem>
                                    <SelectItem value="팁">팁</SelectItem>
                                    <SelectItem value="후기">후기</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">제목</label>
                                <Input
                                  value={newPost.title}
                                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                  placeholder="제목을 입력하세요"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">내용</label>
                                <Textarea
                                  value={newPost.content}
                                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                  placeholder="내용을 입력하세요"
                                  rows={10}
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button onClick={handleUpdatePost} className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90">
                                  수정하기
                                </Button>
                                <Button variant="outline" onClick={() => setEditingPost(null)} className="flex-1">
                                  취소
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{formatUtils.formatNumber(post.likes)}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{formatUtils.formatNumber(post.comments)}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{formatUtils.formatNumber(post.views)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-500 hover:text-hermes-orange"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    공유
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}