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
  User,
  Lightbulb,
  BookOpen
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sortBy, setSortBy] = useState("latest");
  const [showWriteModal, setShowWriteModal] = useState(false);

  const boardSections = [
    {
      id: "outsource",
      title: "외주게시판",
      description: "개발/마케팅 외주 요청",
      icon: Briefcase,
      color: "bg-hermes-orange",
      posts: [
        { title: "[외주] 스마트스토어 자동화", author: "사업자A", time: "16:00", comments: 12, budget: "$5,000" },
        { title: "[의뢰] 블로그 SEO 최적화", author: "마케터B", time: "15:30", comments: 8, budget: "$2,000" },
        { title: "[외주] 유튜브 썸네일 생성", author: "크리에이터C", time: "14:20", comments: 5, budget: "$1,000" },
        { title: "[개발] API 연동 작업", author: "개발자D", time: "13:10", comments: 3, budget: "$3,000" },
        { title: "[마케팅] SNS 자동화 툴", author: "마케터E", time: "12:30", comments: 7, budget: "$1,500" }
      ]
    },
    {
      id: "free",
      title: "자유게시판",
      description: "자유롭게 소통하는 공간",
      icon: MessageCircle,
      color: "bg-blue-500",
      posts: [
        { title: "AI 블로그 작성 팁 공유드려요", author: "블로거123", time: "14:30", comments: 8 },
        { title: "유튜브 스크립트 자동화 질문", author: "크리에이터99", time: "13:15", comments: 23 },
        { title: "SEO 최적화 방법 문의", author: "마케터A", time: "12:45", comments: 5 },
        { title: "AI 콘텐츠 생성 후기", author: "사용자123", time: "11:20", comments: 12 },
        { title: "블로그 수익화 팁", author: "블로거456", time: "10:15", comments: 7 }
      ]
    },
    {
      id: "info",
      title: "정보게시판",
      description: "유용한 정보 공유",
      icon: BookOpen,
      color: "bg-green-500",
      posts: [
        { title: "2025년 SEO 트렌드 분석", author: "전문가A", time: "17:00", comments: 25 },
        { title: "AI 도구 비교 분석", author: "리뷰어B", time: "16:30", comments: 18 },
        { title: "블로그 수익화 가이드", author: "블로거전문", time: "15:45", comments: 32 },
        { title: "콘텐츠 마케팅 전략", author: "마케터프로", time: "14:50", comments: 14 },
        { title: "AI 글쓰기 최적화 팁", author: "라이터킹", time: "13:20", comments: 22 }
      ]
    },
    {
      id: "notice",
      title: "공지사항",
      description: "서비스 공지 및 업데이트",
      icon: Flag,
      color: "bg-red-500",
      posts: [
        { title: "[공지] 2025년 새해 인사", author: "관리자", time: "09:00", comments: 45 },
        { title: "[업데이트] 새로운 AI 기능 출시", author: "개발팀", time: "08:30", comments: 28 },
        { title: "[안내] 서비스 점검 공지", author: "운영팀", time: "08:00", comments: 12 },
        { title: "[이벤트] 신규 가입 혜택 안내", author: "마케팅팀", time: "07:45", comments: 67 },
        { title: "[공지] 이용약관 변경 안내", author: "법무팀", time: "07:30", comments: 15 }
      ]
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
            <TabsList className="grid w-fit grid-cols-5">
              <TabsTrigger value="dashboard">대시보드</TabsTrigger>
              <TabsTrigger value="outsource">외주게시판</TabsTrigger>
              <TabsTrigger value="free">자유게시판</TabsTrigger>
              <TabsTrigger value="info">정보게시판</TabsTrigger>
              <TabsTrigger value="notice">공지사항</TabsTrigger>
            </TabsList>
            
            {activeTab !== "dashboard" && (
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
            )}
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boardSections.map((section) => (
                <Card 
                  key={section.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                        <section.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.posts.slice(0, 5).map((post, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                              {post.title}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{post.time}</span>
                              {post.budget && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-600 font-medium">{post.budget}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-3 text-hermes-orange hover:text-hermes-orange hover:bg-orange-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(section.id);
                      }}
                    >
                      더보기 →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {boardSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center`}>
                    <section.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowWriteModal(true)}
                  className="bg-hermes-orange hover:bg-hermes-orange/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  글쓰기
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border">
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <div className="col-span-1">번호</div>
                  <div className="col-span-6">제목</div>
                  <div className="col-span-2">글쓴이</div>
                  <div className="col-span-1">시간</div>
                  <div className="col-span-1">댓글</div>
                  <div className="col-span-1">조회</div>
                </div>
                
                {section.posts.map((post, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div className="col-span-1 text-sm text-gray-500">{index + 1}</div>
                    <div className="col-span-6">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{post.title}</span>
                        {post.budget && (
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                            {post.budget}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">{post.author}</div>
                    <div className="col-span-1 text-sm text-gray-500">{post.time}</div>
                    <div className="col-span-1 text-sm text-gray-500">{post.comments}</div>
                    <div className="col-span-1 text-sm text-gray-500">{Math.floor(Math.random() * 500) + 50}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
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