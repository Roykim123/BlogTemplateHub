import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Upload,
  Shield,
  ToggleLeft,
  ToggleRight,
  Save,
  UserCheck,
  UserX,
  CreditCard,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 관리자 통계 데이터 타입
interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTools: number;
  totalRevenue: number;
}

// 사용자 정보 타입
interface AdminUser {
  id: number;
  username: string;
  email: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  aiCash: number;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// 기능 설정 타입
interface FeatureSetting {
  id: string;
  name: string;
  description: string;
  freeAccess: boolean;
  isActive: boolean;
}

// 요금제 설정 타입
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isActive: boolean;
}

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("all");
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  // 통계 데이터 조회
  const { data: stats = {} as AdminStats } = useQuery({
    queryKey: ['/api/admin/stats'],
    retry: false,
  });

  // 사용자 목록 조회
  const { data: users = [] } = useQuery({
    queryKey: ['/api/admin/users'],
    retry: false,
  });

  // 기능 설정 조회
  const { data: features = [] } = useQuery({
    queryKey: ['/api/admin/features'],
    retry: false,
  });

  // 요금제 조회
  const { data: pricingPlans = [] } = useQuery({
    queryKey: ['/api/admin/pricing'],
    retry: false,
  });

  // 사용자 플랜 변경
  const updateUserPlan = useMutation({
    mutationFn: async ({ userId, plan }: { userId: number; plan: string }) => {
      return await apiRequest("PATCH", `/api/admin/users/${userId}/plan`, { subscriptionTier: plan });
    },
    onSuccess: () => {
      toast({ title: "성공", description: "사용자 플랜이 변경되었습니다." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
    onError: () => {
      toast({ title: "오류", description: "플랜 변경에 실패했습니다.", variant: "destructive" });
    }
  });

  // 사용자 활성/비활성 변경
  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: number; isActive: boolean }) => {
      return await apiRequest("PATCH", `/api/admin/users/${userId}/status`, { isActive });
    },
    onSuccess: () => {
      toast({ title: "성공", description: "사용자 상태가 변경되었습니다." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
    onError: () => {
      toast({ title: "오류", description: "상태 변경에 실패했습니다.", variant: "destructive" });
    }
  });

  // 기능 설정 업데이트
  const updateFeature = useMutation({
    mutationFn: async (feature: FeatureSetting) => {
      return await apiRequest("PATCH", `/api/admin/features/${feature.id}`, feature);
    },
    onSuccess: () => {
      toast({ title: "성공", description: "기능 설정이 업데이트되었습니다." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/features'] });
    },
    onError: () => {
      toast({ title: "오류", description: "설정 업데이트에 실패했습니다.", variant: "destructive" });
    }
  });

  // 요금제 업데이트
  const updatePricing = useMutation({
    mutationFn: async (plan: PricingPlan) => {
      return await apiRequest("PATCH", `/api/admin/pricing/${plan.id}`, plan);
    },
    onSuccess: () => {
      toast({ title: "성공", description: "요금제가 업데이트되었습니다." });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pricing'] });
      setEditingPlan(null);
    },
    onError: () => {
      toast({ title: "오류", description: "요금제 업데이트에 실패했습니다.", variant: "destructive" });
    }
  });

  // 필터링된 사용자 목록
  const filteredUsers = users.filter((user: AdminUser) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "all" || user.subscriptionTier === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  // 기본 기능 설정 데이터 (실제 API에서 가져올 때까지 임시)
  const defaultFeatures: FeatureSetting[] = [
    { id: "blog-templates", name: "블로그 템플릿", description: "블로그 자동 생성 기능", freeAccess: true, isActive: true },
    { id: "sns-automation", name: "SNS 자동화", description: "딸깍AI 자동포스팅", freeAccess: false, isActive: true },
    { id: "ai-chat", name: "AI 채팅", description: "AI와의 대화 기능", freeAccess: true, isActive: true },
    { id: "premium-templates", name: "프리미엄 템플릿", description: "고급 템플릿 모음", freeAccess: false, isActive: true },
    { id: "challenger-missions", name: "챌린저 미션", description: "7일 챌린저 프로그램", freeAccess: true, isActive: true },
    { id: "community-board", name: "커뮤니티 게시판", description: "사용자 커뮤니티", freeAccess: true, isActive: true }
  ];

  // 기본 요금제 데이터
  const defaultPricingPlans: PricingPlan[] = [
    {
      id: "free",
      name: "무료",
      price: 0,
      description: "기본 기능 이용 가능",
      features: ["기본 블로그 템플릿", "커뮤니티 참여", "챌린저 미션"],
      isActive: true
    },
    {
      id: "basic",
      name: "베이직",
      price: 99000,
      description: "핵심 AI 기능 이용",
      features: ["모든 블로그 템플릿", "SNS 자동화", "AI 채팅", "프리미엄 지원"],
      isActive: true
    },
    {
      id: "pro",
      name: "프로",
      price: 199000,
      description: "고급 비즈니스 기능",
      features: ["무제한 자동화", "고급 템플릿", "우선 고객지원", "분석 리포트"],
      isActive: true
    },
    {
      id: "enterprise",
      name: "엔터프라이즈",
      price: 499000,
      description: "기업용 맞춤 솔루션",
      features: ["전담 매니저", "API 접근", "커스텀 기능", "24/7 지원"],
      isActive: true
    }
  ];

  const currentFeatures = features.length > 0 ? features : defaultFeatures;
  const currentPricingPlans = pricingPlans.length > 0 ? pricingPlans : defaultPricingPlans;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 헤더 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">관리자 대시보드</h1>
              <p className="text-gray-600 dark:text-gray-400">시스템 운영 및 사용자 관리</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              <Shield className="h-4 w-4 mr-1" />
              관리자 권한
            </Badge>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">총 사용자</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">활성 사용자</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.activeUsers || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">활성 도구</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalTools || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">월 매출</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ₩{(stats.totalRevenue || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 탭 */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>사용자 관리</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>기능 제어</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>요금제 관리</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>시스템 설정</span>
            </TabsTrigger>
          </TabsList>

          {/* 사용자 관리 탭 */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>사용자 관리</span>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="사용자 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="free">무료</SelectItem>
                        <SelectItem value="basic">베이직</SelectItem>
                        <SelectItem value="pro">프로</SelectItem>
                        <SelectItem value="enterprise">엔터프라이즈</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user: AdminUser) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{user.username}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            가입일: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.subscriptionTier === 'free' ? 'secondary' : 'default'}>
                            {user.subscriptionTier}
                          </Badge>
                          <Badge variant={user.isActive ? 'default' : 'destructive'}>
                            {user.isActive ? '활성' : '비활성'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* 플랜 변경 드롭다운 */}
                        <Select
                          value={user.subscriptionTier}
                          onValueChange={(value) => updateUserPlan.mutate({ userId: user.id, plan: value })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">무료</SelectItem>
                            <SelectItem value="basic">베이직</SelectItem>
                            <SelectItem value="pro">프로</SelectItem>
                            <SelectItem value="enterprise">엔터프라이즈</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* 활성/비활성 토글 */}
                        <Button
                          variant={user.isActive ? "destructive" : "default"}
                          size="sm"
                          onClick={() => updateUserStatus.mutate({ userId: user.id, isActive: !user.isActive })}
                        >
                          {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 기능 제어 탭 */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>기능별 접근 제한 설정</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  각 기능의 무료 사용자 접근 권한과 활성화 상태를 관리합니다.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{feature.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        {/* 무료 사용자 접근 허용 */}
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`free-${feature.id}`} className="text-sm">
                            무료 사용자 접근
                          </Label>
                          <Switch
                            id={`free-${feature.id}`}
                            checked={feature.freeAccess}
                            onCheckedChange={(checked) => 
                              updateFeature.mutate({ ...feature, freeAccess: checked })
                            }
                          />
                        </div>
                        
                        {/* 기능 활성화 */}
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`active-${feature.id}`} className="text-sm">
                            기능 활성화
                          </Label>
                          <Switch
                            id={`active-${feature.id}`}
                            checked={feature.isActive}
                            onCheckedChange={(checked) => 
                              updateFeature.mutate({ ...feature, isActive: checked })
                            }
                          />
                        </div>
                        
                        <Badge variant={feature.isActive ? 'default' : 'secondary'}>
                          {feature.isActive ? '활성' : '비활성'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 요금제 관리 탭 */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>요금제 정보 및 가격 설정</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  구독 요금제의 가격과 기능을 직접 수정할 수 있습니다.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentPricingPlans.map((plan) => (
                    <div key={plan.id} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{plan.name}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingPlan(plan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                          ₩{plan.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">/ 월</p>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">포함 기능:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                          {plan.isActive ? '활성' : '비활성'}
                        </Badge>
                        <Switch
                          checked={plan.isActive}
                          onCheckedChange={(checked) => 
                            updatePricing.mutate({ ...plan, isActive: checked })
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 요금제 편집 모달 */}
            {editingPlan && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>요금제 수정: {editingPlan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="plan-name">요금제 이름</Label>
                        <Input
                          id="plan-name"
                          value={editingPlan.name}
                          onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="plan-price">월 가격 (원)</Label>
                        <Input
                          id="plan-price"
                          type="number"
                          value={editingPlan.price}
                          onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="plan-description">설명</Label>
                        <Textarea
                          id="plan-description"
                          value={editingPlan.description}
                          onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="plan-features">포함 기능 (줄바꿈으로 구분)</Label>
                        <Textarea
                          id="plan-features"
                          value={editingPlan.features.join('\n')}
                          onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split('\n').filter(f => f.trim()) })}
                          rows={6}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setEditingPlan(null)}>
                      취소
                    </Button>
                    <Button 
                      onClick={() => updatePricing.mutate(editingPlan)}
                      disabled={updatePricing.isPending}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      저장
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 시스템 설정 탭 */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>시스템 기능 제어</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    전체 시스템의 주요 기능을 활성화/비활성화합니다.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance">유지보수 모드</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">서비스 점검 시 활성화</p>
                    </div>
                    <Switch id="maintenance" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="registration">신규 가입 허용</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">새로운 사용자 가입</p>
                    </div>
                    <Switch id="registration" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payments">결제 시스템</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">구독 결제 처리</p>
                    </div>
                    <Switch id="payments" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>데이터 관리</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    사용자 데이터 및 시스템 로그를 관리합니다.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    사용자 데이터 내보내기
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    데이터 가져오기
                  </Button>
                  
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    시스템 로그 정리
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}