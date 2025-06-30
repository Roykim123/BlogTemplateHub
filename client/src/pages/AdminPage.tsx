import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Activity, 
  Zap, 
  DollarSign, 
  FileText, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTools: number;
  totalCashTransactions: number;
}

interface AdminUser {
  id: number;
  username: string;
  email: string;
  aiCash: number;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface AdminTool {
  id: number;
  name: string;
  category: string;
  usageCount: number;
  isActive: boolean;
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 관리자 통계 조회
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    retry: false,
  });

  // 사용자 목록 조회
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],  
    retry: false,
  });

  // 도구 목록 조회
  const { data: tools, isLoading: toolsLoading } = useQuery({
    queryKey: ["/api/admin/tools"],
    retry: false,
  });

  // 사용자 AI캐쉬 업데이트
  const updateCashMutation = useMutation({
    mutationFn: async ({ userId, amount }: { userId: number; amount: number }) => {
      return await apiRequest("PATCH", `/api/admin/users/${userId}/cash`, { amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "성공",
        description: "AI캐쉬가 업데이트되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "오류",
        description: "AI캐쉬 업데이트에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  // 도구 활성화/비활성화
  const toggleToolMutation = useMutation({
    mutationFn: async ({ toolId, isActive }: { toolId: number; isActive: boolean }) => {
      return await apiRequest("PATCH", `/api/admin/tools/${toolId}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tools"] });
      toast({
        title: "성공",
        description: "도구 상태가 업데이트되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "오류", 
        description: "도구 상태 업데이트에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateCash = (userId: number, currentAmount: number) => {
    const newAmount = prompt("새로운 AI캐쉬 금액을 입력하세요:", currentAmount.toString());
    if (newAmount && !isNaN(Number(newAmount))) {
      updateCashMutation.mutate({ userId, amount: Number(newAmount) });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 사용자</p>
                <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">활성 사용자</p>
                <p className="text-3xl font-bold">{stats?.activeUsers || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 도구</p>
                <p className="text-3xl font-bold">{stats?.totalTools || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 거래</p>
                <p className="text-3xl font-bold">{stats?.totalCashTransactions || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 시스템 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">새 사용자 가입</p>
                <p className="text-xs text-muted-foreground">5분 전</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">AI캐쉬 충전</p>
                <p className="text-xs text-muted-foreground">12분 전</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">새 템플릿 생성</p>
                <p className="text-xs text-muted-foreground">1시간 전</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">사용자 관리</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="사용자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">사용자</th>
                  <th className="text-left p-4">이메일</th>
                  <th className="text-left p-4">AI캐쉬</th>
                  <th className="text-left p-4">역할</th>
                  <th className="text-left p-4">상태</th>
                  <th className="text-left p-4">가입일</th>
                  <th className="text-left p-4">관리</th>
                </tr>
              </thead>
              <tbody>
                {users?.filter((user: AdminUser) => 
                  user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((user: AdminUser) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateCash(user.id, user.aiCash)}
                        className="font-mono"
                      >
                        {user.aiCash?.toLocaleString() || 0}
                      </Button>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.isActive ? 'default' : 'destructive'}>
                        {user.isActive ? '활성' : '비활성'}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">도구 관리</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          새 도구 추가
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools?.map((tool: AdminTool) => (
          <Card key={tool.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <Badge variant={tool.isActive ? 'default' : 'secondary'}>
                  {tool.isActive ? '활성' : '비활성'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">카테고리:</span>
                  <span>{tool.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">사용 횟수:</span>
                  <span>{tool.usageCount?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleToolMutation.mutate({ 
                      toolId: tool.id, 
                      isActive: !tool.isActive 
                    })}
                  >
                    {tool.isActive ? '비활성화' : '활성화'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-background p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">관리자 대시보드</h1>
          <p className="text-muted-foreground">시스템 관리 및 사용자 관리 도구</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: "dashboard", label: "대시보드", icon: Activity },
            { id: "users", label: "사용자", icon: Users },
            { id: "tools", label: "도구", icon: Zap },
            { id: "content", label: "콘텐츠", icon: FileText },
            { id: "settings", label: "설정", icon: Settings },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        {selectedTab === "dashboard" && renderDashboard()}
        {selectedTab === "users" && renderUsers()}
        {selectedTab === "tools" && renderTools()}
        {selectedTab === "content" && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">콘텐츠 관리 기능을 준비 중입니다.</p>
          </div>
        )}
        {selectedTab === "settings" && (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">시스템 설정 기능을 준비 중입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
                <span className="text-sm">블로그 글 작성: "AI의 미래"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">템플릿 사용: Travel Blog</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-hermes-orange rounded-full"></div>
                <span className="text-sm">시스템 업데이트 완료</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>인기 도구</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "AI 블로그작성", usage: "3,456회" },
                { name: "번역 도구", usage: "2,234회" },
                { name: "PPT 초안", usage: "1,876회" },
                { name: "이메일 초안", usage: "1,432회" }
              ].map((tool) => (
                <div key={tool.name} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tool.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tool.usage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
