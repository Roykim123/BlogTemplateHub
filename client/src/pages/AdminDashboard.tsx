import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  TrendingUp,
  UserCheck,
  AlertCircle,
  BarChart3
} from "lucide-react";

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 15247,
    activeUsers: 8934,
    totalRevenue: 142500000,
    monthlyGrowth: 23.5,
    aiCashIssued: 2450000,
    referrals: 1234
  });

  const [recentUsers] = useState([
    { id: 1, name: "김**", email: "kim***@kakao.com", joinDate: "2025-01-20", plan: "프로", status: "active" },
    { id: 2, name: "이**", email: "lee***@naver.com", joinDate: "2025-01-19", plan: "베이직", status: "active" },
    { id: 3, name: "박**", email: "park***@gmail.com", joinDate: "2025-01-18", plan: "프로", status: "pending" },
    { id: 4, name: "최**", email: "choi***@kakao.com", joinDate: "2025-01-17", plan: "엔터프라이즈", status: "active" }
  ]);

  const [recentPayments] = useState([
    { id: 1, user: "김**", amount: "19,900원", plan: "프로", date: "2025-01-20", status: "완료" },
    { id: 2, user: "이**", amount: "129,700원", plan: "베이직", date: "2025-01-19", status: "완료" },
    { id: 3, user: "박**", amount: "19,900원", plan: "프로", date: "2025-01-18", status: "대기" },
    { id: 4, user: "최**", amount: "문의", plan: "엔터프라이즈", date: "2025-01-17", status: "협의중" }
  ]);

  const [systemAlerts] = useState([
    { id: 1, type: "warning", message: "AI 서버 응답 시간이 평소보다 느립니다", time: "5분 전" },
    { id: 2, type: "info", message: "일일 사용량이 임계치의 80%에 도달했습니다", time: "15분 전" },
    { id: 3, type: "success", message: "새로운 AI 모델 업데이트가 완료되었습니다", time: "1시간 전" }
  ]);

  const [dashboardStats] = useState([
    { label: "오늘 총 방문자", value: "2,847명", growth: "+12.4%" },
    { label: "AI 도구 사용량", value: "15,234회", growth: "+8.7%" },
    { label: "신규 가입자", value: "183명", growth: "+15.2%" },
    { label: "활성 구독자", value: "8,934명", growth: "+5.3%" }
  ]);

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">관리자 대시보드</h1>
          <p className="text-gray-600 dark:text-gray-400">걱정마AI 서비스 운영 현황을 확인하세요</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}명</div>
              <p className="text-xs text-muted-foreground">활성 사용자: {stats.activeUsers.toLocaleString()}명</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">월 매출</CardTitle>
              <CreditCard className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₩{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-green-600">+{stats.monthlyGrowth}% 전월 대비</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI캐쉬 발행량</CardTitle>
              <TrendingUp className="h-4 w-4 text-hermes-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.aiCashIssued / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">이번 달 총 발행량</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">친구 초대</CardTitle>
              <UserCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.referrals}건</div>
              <p className="text-xs text-muted-foreground">이번 달 초대 성공</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">대시보드</TabsTrigger>
            <TabsTrigger value="users">사용자 관리</TabsTrigger>
            <TabsTrigger value="payments">결제 관리</TabsTrigger>
            <TabsTrigger value="system">시스템 현황</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">{stat.growth}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>실시간 활동</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: "김**", action: "AI 블로그 글쓰기 사용", time: "방금 전" },
                      { user: "이**", action: "프로 플랜 구독", time: "2분 전" },
                      { user: "박**", action: "친구 초대 완료", time: "5분 전" },
                      { user: "최**", action: "AI 유튜브 스크립트 사용", time: "7분 전" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-gray-500">{activity.action}</p>
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>서버 성능</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU 사용률</span>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '34%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">메모리 사용률</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '67%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">응답 시간</span>
                      <span className="text-sm font-medium">124ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">최근 가입 사용자</h3>
              <div className="flex space-x-2">
                <Input placeholder="사용자 검색..." className="w-64" />
                <Button variant="outline">검색</Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">이름</th>
                        <th className="text-left p-4">이메일</th>
                        <th className="text-left p-4">가입일</th>
                        <th className="text-left p-4">플랜</th>
                        <th className="text-left p-4">상태</th>
                        <th className="text-left p-4">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4">{user.name}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">{user.joinDate}</td>
                          <td className="p-4">
                            <Badge variant="outline">{user.plan}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status === "active" ? "활성" : "대기"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">관리</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">최근 결제 내역</h3>
              <Button variant="outline">전체 내역 보기</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">사용자</th>
                        <th className="text-left p-4">금액</th>
                        <th className="text-left p-4">플랜</th>
                        <th className="text-left p-4">날짜</th>
                        <th className="text-left p-4">상태</th>
                        <th className="text-left p-4">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="p-4">{payment.user}</td>
                          <td className="p-4 font-semibold">{payment.amount}</td>
                          <td className="p-4">
                            <Badge variant="outline">{payment.plan}</Badge>
                          </td>
                          <td className="p-4">{payment.date}</td>
                          <td className="p-4">
                            <Badge variant={
                              payment.status === "완료" ? "default" : 
                              payment.status === "대기" ? "secondary" : "destructive"
                            }>
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">상세</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>시스템 알림</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        alert.type === "warning" ? "bg-yellow-400" :
                        alert.type === "info" ? "bg-blue-400" : "bg-green-400"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>서버 상태</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI 서비스</span>
                    <Badge className="bg-green-100 text-green-800">정상</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">데이터베이스</span>
                    <Badge className="bg-green-100 text-green-800">정상</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">결제 시스템</span>
                    <Badge className="bg-green-100 text-green-800">정상</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">알림 서비스</span>
                    <Badge className="bg-yellow-100 text-yellow-800">점검중</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>인기 AI 도구</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "AI 블로그 글쓰기", usage: "4,523회", percentage: 85 },
                      { name: "AI 유튜브 스크립트", usage: "3,201회", percentage: 65 },
                      { name: "AI 인스타그램 포스트", usage: "2,847회", percentage: 55 },
                      { name: "AI SEO 블로그", usage: "2,156회", percentage: 45 }
                    ].map((tool, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{tool.name}</span>
                          <span className="text-gray-500">{tool.usage}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-hermes-orange h-2 rounded-full transition-all"
                            style={{ width: `${tool.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>수익 분석</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">베이직 플랜</span>
                      <span className="font-semibold">₩45.2M (32%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">프로 플랜</span>
                      <span className="font-semibold">₩78.5M (55%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">엔터프라이즈</span>
                      <span className="font-semibold">₩18.8M (13%)</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>총 수익</span>
                      <span>₩142.5M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}