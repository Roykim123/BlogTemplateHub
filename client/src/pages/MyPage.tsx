import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Settings, Award, Coins, TrendingUp, Calendar, Crown, Plus, Edit, Trash2, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MyPage() {
  const userLevel = "Gold";
  const progress = 65;
  const aiCash = 12450;
  const { toast } = useToast();

  const [storeInfos, setStoreInfos] = useState([
    {
      id: 1,
      storeName: "카페 걱정마",
      productName: "아메리카노",
      address: "서울시 강남구 테헤란로 123",
      website: "https://ggokcafe.com",
      description: "신선한 원두로 만든 프리미엄 커피",
      mainKeyword: "강남 카페",
      hashtags: "#강남카페 #아메리카노 #프리미엄커피"
    }
  ]);

  const [newStoreInfo, setNewStoreInfo] = useState({
    storeName: "",
    productName: "",
    address: "",
    website: "",
    description: "",
    mainKeyword: "",
    hashtags: ""
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<any>(null);

  const handleSaveStoreInfo = () => {
    if (storeInfos.length >= 1 && !editingStore) {
      // 2개부터는 캐시 차감
      const cashRequired = 500;
      if (aiCash >= cashRequired) {
        toast({
          title: "상품정보 추가 완료!",
          description: `새 상품정보가 추가되었습니다. AI캐쉬 ${cashRequired}캐쉬가 차감되었습니다.`,
        });
      } else {
        toast({
          title: "AI캐쉬 부족",
          description: "AI캐쉬가 부족합니다. 결제 메뉴에서 충전해주세요.",
          variant: "destructive",
        });
        return;
      }
    }

    if (editingStore) {
      setStoreInfos(storeInfos.map(store => 
        store.id === editingStore.id 
          ? { ...store, ...newStoreInfo }
          : store
      ));
      setEditingStore(null);
      toast({
        title: "상품정보 수정 완료!",
        description: "상품정보가 성공적으로 수정되었습니다.",
      });
    } else {
      const newStore = {
        id: storeInfos.length + 1,
        ...newStoreInfo
      };
      setStoreInfos([...storeInfos, newStore]);
      toast({
        title: "상품정보 저장 완료!",
        description: storeInfos.length === 0 ? "첫 번째 상품정보가 무료로 저장되었습니다." : "상품정보가 저장되었습니다.",
      });
    }

    setNewStoreInfo({
      storeName: "",
      productName: "",
      address: "",
      website: "",
      description: "",
      mainKeyword: "",
      hashtags: ""
    });
    setIsAddModalOpen(false);
  };

  const handleEditStore = (store: any) => {
    setEditingStore(store);
    setNewStoreInfo({
      storeName: store.storeName,
      productName: store.productName,
      address: store.address,
      website: store.website,
      description: store.description,
      mainKeyword: store.mainKeyword,
      hashtags: store.hashtags
    });
  };

  const handleDeleteStore = (storeId: number) => {
    setStoreInfos(storeInfos.filter(store => store.id !== storeId));
    toast({
      title: "상품정보 삭제 완료",
      description: "상품정보가 성공적으로 삭제되었습니다.",
    });
  };

  return (
    <div className="h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            👤 마이페이지
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            프로필 정보와 계정 설정을 관리하세요
          </p>
        </div>

        <div className="grid gap-8">
          {/* 프로필 정보 */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>프로필 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/api/placeholder/100/100" />
                  <AvatarFallback className="bg-hermes-orange text-white text-xl">
                    김
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">김걱정마</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">ggokcafe@example.com</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-hermes-orange text-white">
                      {userLevel} 회원
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">{aiCash.toLocaleString()} 캐쉬</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  편집
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 상품정보 */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Store className="h-5 w-5" />
                  <span>상품정보 관리</span>
                </div>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-hermes-orange hover:bg-hermes-orange/90">
                      <Plus className="h-4 w-4 mr-2" />
                      추가
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingStore ? "상품정보 수정" : "새 상품정보 추가"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {!editingStore && storeInfos.length >= 1 && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            ⚠️ 첫 번째 상품정보는 무료이며, 2개부터는 500캐쉬가 차감됩니다.
                          </p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">매장명</label>
                          <Input
                            value={newStoreInfo.storeName}
                            onChange={(e) => setNewStoreInfo({...newStoreInfo, storeName: e.target.value})}
                            placeholder="매장명을 입력하세요"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">상품명</label>
                          <Input
                            value={newStoreInfo.productName}
                            onChange={(e) => setNewStoreInfo({...newStoreInfo, productName: e.target.value})}
                            placeholder="상품명을 입력하세요"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">주소</label>
                        <Input
                          value={newStoreInfo.address}
                          onChange={(e) => setNewStoreInfo({...newStoreInfo, address: e.target.value})}
                          placeholder="매장 주소를 입력하세요"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">홈페이지 주소</label>
                        <Input
                          value={newStoreInfo.website}
                          onChange={(e) => setNewStoreInfo({...newStoreInfo, website: e.target.value})}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">상세설명</label>
                        <Textarea
                          value={newStoreInfo.description}
                          onChange={(e) => setNewStoreInfo({...newStoreInfo, description: e.target.value})}
                          placeholder="상품/매장에 대한 상세설명을 입력하세요"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">메인 키워드</label>
                          <Input
                            value={newStoreInfo.mainKeyword}
                            onChange={(e) => setNewStoreInfo({...newStoreInfo, mainKeyword: e.target.value})}
                            placeholder="메인 키워드"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">해시태그</label>
                          <Input
                            value={newStoreInfo.hashtags}
                            onChange={(e) => setNewStoreInfo({...newStoreInfo, hashtags: e.target.value})}
                            placeholder="#태그1 #태그2 #태그3"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleSaveStoreInfo} 
                          className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90"
                        >
                          저장하기
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsAddModalOpen(false);
                            setEditingStore(null);
                            setNewStoreInfo({
                              storeName: "",
                              productName: "",
                              address: "",
                              website: "",
                              description: "",
                              mainKeyword: "",
                              hashtags: ""
                            });
                          }} 
                          className="flex-1"
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {storeInfos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Store className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>등록된 상품정보가 없습니다.</p>
                  <p className="text-sm">첫 번째 상품정보는 무료로 등록할 수 있습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {storeInfos.map((store) => (
                    <div key={store.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{store.storeName}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{store.productName}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditStore(store)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>상품정보 수정</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">매장명</label>
                                    <Input
                                      value={newStoreInfo.storeName}
                                      onChange={(e) => setNewStoreInfo({...newStoreInfo, storeName: e.target.value})}
                                      placeholder="매장명을 입력하세요"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">상품명</label>
                                    <Input
                                      value={newStoreInfo.productName}
                                      onChange={(e) => setNewStoreInfo({...newStoreInfo, productName: e.target.value})}
                                      placeholder="상품명을 입력하세요"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">주소</label>
                                  <Input
                                    value={newStoreInfo.address}
                                    onChange={(e) => setNewStoreInfo({...newStoreInfo, address: e.target.value})}
                                    placeholder="매장 주소를 입력하세요"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">홈페이지 주소</label>
                                  <Input
                                    value={newStoreInfo.website}
                                    onChange={(e) => setNewStoreInfo({...newStoreInfo, website: e.target.value})}
                                    placeholder="https://example.com"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">상세설명</label>
                                  <Textarea
                                    value={newStoreInfo.description}
                                    onChange={(e) => setNewStoreInfo({...newStoreInfo, description: e.target.value})}
                                    placeholder="상품/매장에 대한 상세설명을 입력하세요"
                                    rows={3}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">메인 키워드</label>
                                    <Input
                                      value={newStoreInfo.mainKeyword}
                                      onChange={(e) => setNewStoreInfo({...newStoreInfo, mainKeyword: e.target.value})}
                                      placeholder="메인 키워드"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">해시태그</label>
                                    <Input
                                      value={newStoreInfo.hashtags}
                                      onChange={(e) => setNewStoreInfo({...newStoreInfo, hashtags: e.target.value})}
                                      placeholder="#태그1 #태그2 #태그3"
                                    />
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    onClick={handleSaveStoreInfo} 
                                    className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90"
                                  >
                                    수정하기
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setEditingStore(null)} 
                                    className="flex-1"
                                  >
                                    취소
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteStore(store.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>📍 {store.address}</p>
                        <p>🔗 {store.website}</p>
                        <p>🔑 {store.mainKeyword}</p>
                        <p>{store.hashtags}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 등급 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>등급 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userLevel} 등급</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">다음 등급까지 {100 - progress}% 남음</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Premium
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>진행도</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-hermes-orange">156</div>
                  <div className="text-xs text-gray-500">총 사용 횟수</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hermes-orange">23</div>
                  <div className="text-xs text-gray-500">이번 달 사용</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-hermes-orange">7</div>
                  <div className="text-xs text-gray-500">연속 사용일</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 최근 활동 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>최근 활동</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">AI 블로그 글 생성</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2시간 전</p>
                  </div>
                  <Badge variant="outline">완료</Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Coins className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">AI캐쉬 충전</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1일 전</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+10,000</Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Gold 등급 달성</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3일 전</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">업그레이드</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}