import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, Share2, Clock, Eye, TrendingUp, Plus, Edit, Trash2 } from "lucide-react";
import { boardSamples } from "@/data/boardSamples";
import { useToast } from "@/hooks/use-toast";

export default function CommunityPage() {
  const [posts, setPosts] = useState(boardSamples);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "일반"
  });
  const { toast } = useToast();

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

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              🔥 커뮤니티
            </h1>
            <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-hermes-orange hover:bg-hermes-orange/90">
                  <Plus className="h-4 w-4 mr-2" />
                  글쓰기
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 게시글 작성</DialogTitle>
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
          <p className="text-gray-600 dark:text-gray-400">
            다른 사용자들과 AI 활용 노하우를 공유하고 소통해보세요
          </p>
        </div>

        {/* 인기 게시글 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>인기 게시글</span>
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

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow">
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
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
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