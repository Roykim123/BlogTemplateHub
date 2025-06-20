import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  MessageCircle,
  Flag,
  Plus,
  Briefcase,
  Vote,
  TrendingUp,
  Clock,
  User
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("free");
  const [sortBy, setSortBy] = useState("latest");
  const [showWriteModal, setShowWriteModal] = useState(false);

  const posts = [
    {
      id: 1,
      title: "AI 블로그 작성 팁 공유드려요",
      content: "최근에 AI로 블로그 글을 작성하면서 느낀 점들을 공유합니다...",
      author: "블로거123",
      level: 3,
      views: 245,
      likes: 15,
      comments: 8,
      createdAt: "2025-01-20 14:30",
      category: "팁공유"
    },
    {
      id: 2,
      title: "유튜브 스크립트 자동화 관련 질문",
      content: "유튜브 스크립트를 자동으로 생성할 때 어떤 점을 주의해야 할까요?",
      author: "크리에이터99",
      level: 2,
      views: 189,
      likes: 12,
      comments: 23,
      createdAt: "2025-01-20 13:15",
      category: "질문"
    },
    {
      id: 3,
      title: "[외주] 네이버 스마트스토어 상품 설명 자동화 개발",
      content: "스마트스토어 상품 설명을 자동으로 생성하는 툴 개발을 의뢰합니다.",
      author: "사업자A",
      level: 5,
      views: 156,
      likes: 8,
      comments: 15,
      createdAt: "2025-01-20 12:00",
      category: "개발외주",
      budget: "500,000원"
    }
  ];

  const getLevelColor = (level: number) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    return colors[level - 1] || "gray";
  };

  const getLevelBadge = (level: number) => {
    const badges = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];
    return badges[level - 1] || "Newbie";
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">커뮤니티</h1>
            <p className="text-gray-600 dark:text-gray-400">자유게시판, 건의사항, 외주 요청을 공유하세요</p>
          </div>
          <Button 
            onClick={() => setShowWriteModal(true)}
            className="bg-hermes-orange hover:bg-hermes-orange/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            글쓰기
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="free">자유게시판</TabsTrigger>
              <TabsTrigger value="suggest">건의사항</TabsTrigger>
              <TabsTrigger value="outsource">외주게시판</TabsTrigger>
            </TabsList>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="views">조회수순</SelectItem>
                <SelectItem value="comments">댓글순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="free" className="space-y-4">
            {posts.filter(post => post.category !== "개발외주").map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span className="text-sm text-gray-600">{post.author}</span>
                          <Badge 
                            className={`text-xs bg-${getLevelColor(post.level)}-100 text-${getLevelColor(post.level)}-800`}
                          >
                            {getLevelBadge(post.level)}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="suggest" className="space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">건의사항을 남겨주세요</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  서비스 개선을 위한 소중한 의견을 기다리고 있습니다
                </p>
                <Button 
                  onClick={() => setShowWriteModal(true)}
                  className="bg-hermes-orange hover:bg-hermes-orange/90"
                >
                  건의하기 (무료)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outsource" className="space-y-4">
            {posts.filter(post => post.category === "개발외주").map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-hermes-orange">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-hermes-orange text-white">
                          <Briefcase className="h-3 w-3 mr-1" />
                          외주
                        </Badge>
                        {post.budget && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {post.budget}
                          </Badge>
                        )}
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span className="text-sm text-gray-600">{post.author}</span>
                          <Badge 
                            className={`text-xs bg-${getLevelColor(post.level)}-100 text-${getLevelColor(post.level)}-800`}
                          >
                            {getLevelBadge(post.level)}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-2 border-dashed border-hermes-orange">
              <CardContent className="p-6 text-center">
                <Briefcase className="h-12 w-12 text-hermes-orange mx-auto mb-4" />
                <h3 className="font-semibold mb-2">외주 요청하기</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  자동 개발, 마케팅 외주 요청 (1 AI캐쉬 차감)
                </p>
                <Button 
                  onClick={() => setShowWriteModal(true)}
                  className="bg-hermes-orange hover:bg-hermes-orange/90"
                >
                  외주 요청하기
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Write Modal */}
        {showWriteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>글쓰기</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">카테고리</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tip">팁공유</SelectItem>
                      <SelectItem value="question">질문</SelectItem>
                      <SelectItem value="suggest">건의사항 (무료)</SelectItem>
                      <SelectItem value="outsource">외주 (1 AI캐쉬)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">제목</label>
                  <Input placeholder="제목을 입력하세요" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">내용</label>
                  <Textarea placeholder="내용을 입력하세요" rows={10} />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowWriteModal(false)}
                  >
                    취소
                  </Button>
                  <Button 
                    className="bg-hermes-orange hover:bg-hermes-orange/90"
                    onClick={() => setShowWriteModal(false)}
                  >
                    작성하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}