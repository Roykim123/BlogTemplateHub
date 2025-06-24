import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap, 
  Store, 
  MapPin, 
  FileText, 
  Briefcase, 
  ArrowLeft,
  Lightbulb,
  TrendingUp,
  Users,
  Target,
  Save,
  ChevronDown
} from "lucide-react";

export default function BlogTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({});
  const [savedProfiles, setSavedProfiles] = useState([
    { id: 1, name: "카페 ABC", data: { storeName: "카페 ABC", location: "강남구", description: "프리미엄 원두 커피 전문점" } },
    { id: 2, name: "레스토랑 XYZ", data: { storeName: "레스토랑 XYZ", location: "홍대", description: "이탈리안 파스타 맛집" } },
    { id: 3, name: "헬스장 FIT", data: { storeName: "헬스장 FIT", location: "서초구", description: "24시간 무인 헬스장" } },
    { id: 4, name: "미용실 스타일", data: { storeName: "미용실 스타일", location: "잠실", description: "트렌디한 헤어 디자인" } }
  ]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  const templates = [
    {
      id: "traffic-boost",
      title: "방문자 늘리기 블로그",
      description: "SEO 최적화로 검색 노출을 높이는 콘텐츠",
      icon: TrendingUp,
      color: "bg-green-500",
      features: ["SEO 최적화", "키워드 분석", "트래픽 증대"]
    },
    {
      id: "store-promotion",
      title: "매장 홍보용 블로그",
      description: "매장과 서비스를 효과적으로 홍보하는 글",
      icon: Store,
      color: "bg-blue-500",
      features: ["매장 소개", "서비스 홍보", "고객 유치"]
    },
    {
      id: "experience-review",
      title: "체험 후기/여행기",
      description: "생생한 경험담과 후기로 신뢰도 향상",
      icon: MapPin,
      color: "bg-purple-500",
      features: ["체험 후기", "여행 기록", "신뢰도 구축"]
    },
    {
      id: "expert-info",
      title: "전문 정보 블로그",
      description: "전문성을 보여주는 정보성 콘텐츠",
      icon: Lightbulb,
      color: "bg-orange-500",
      features: ["전문 지식", "업계 정보", "권위 구축"]
    },
    {
      id: "business-promotion",
      title: "부업/제품홍보 블로그",
      description: "제품이나 부업을 효과적으로 홍보하는 글",
      icon: Briefcase,
      color: "bg-indigo-500",
      features: ["제품 소개", "부업 홍보", "수익 창출"]
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSelect = (profileId) => {
    const profile = savedProfiles.find(p => p.id === parseInt(profileId));
    if (profile) {
      setFormData(profile.data);
      setSelectedProfile(profileId);
    }
  };

  const handleSaveProfile = () => {
    if (newProfileName && formData.storeName) {
      const newProfile = {
        id: savedProfiles.length + 1,
        name: newProfileName,
        data: { ...formData }
      };
      setSavedProfiles([...savedProfiles, newProfile]);
      setNewProfileName("");
      setShowSaveDialog(false);
    }
  };

  const handleGenerate = async (templateId) => {
    setIsGenerating(true);
    // 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const renderTemplateForm = () => {
    if (!selectedTemplate) return null;

    switch (selectedTemplate.id) {
      case "traffic-boost":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="keywords">타겟 키워드</Label>
              <Input 
                id="keywords"
                placeholder="예: 강남 카페, 원두 커피, 디저트 맛집"
                value={formData.keywords || ''}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="topic">주제</Label>
              <Input 
                id="topic"
                placeholder="블로그 글의 주요 주제를 입력하세요"
                value={formData.topic || ''}
                onChange={(e) => handleInputChange('topic', e.target.value)}
              />
            </div>
          </div>
        );

      case "store-promotion":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-1">
                <Label htmlFor="savedProfiles">저장된 매장 정보</Label>
                <Select value={selectedProfile} onValueChange={handleProfileSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="저장된 정보를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedProfiles.map((profile, index) => (
                      <SelectItem 
                        key={profile.id} 
                        value={profile.id.toString()}
                        disabled={index > 0}
                      >
                        {profile.name} {index > 0 && "(AI캐쉬 필요)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="storeName">매장명</Label>
              <Input 
                id="storeName"
                placeholder="매장 이름을 입력하세요"
                value={formData.storeName || ''}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">위치</Label>
              <Input 
                id="location"
                placeholder="매장 위치를 입력하세요"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">매장 설명</Label>
              <Textarea 
                id="description"
                placeholder="매장의 특징과 장점을 설명해주세요"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case "experience-review":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience">체험 내용</Label>
              <Textarea 
                id="experience"
                placeholder="어떤 체험을 했는지 설명해주세요"
                value={formData.experience || ''}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="location">장소</Label>
              <Input 
                id="location"
                placeholder="체험한 장소를 입력하세요"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>
        );

      case "expert-info":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="field">전문 분야</Label>
              <Input 
                id="field"
                placeholder="예: IT, 마케팅, 요리, 건강"
                value={formData.field || ''}
                onChange={(e) => handleInputChange('field', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="topic">주제</Label>
              <Input 
                id="topic"
                placeholder="다룰 주제를 입력하세요"
                value={formData.topic || ''}
                onChange={(e) => handleInputChange('topic', e.target.value)}
              />
            </div>
          </div>
        );

      case "business-promotion":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="product">제품/서비스명</Label>
              <Input 
                id="product"
                placeholder="홍보할 제품이나 서비스를 입력하세요"
                value={formData.product || ''}
                onChange={(e) => handleInputChange('product', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="benefits">주요 장점</Label>
              <Textarea 
                id="benefits"
                placeholder="제품/서비스의 주요 장점을 설명해주세요"
                value={formData.benefits || ''}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            블로그 템플릿
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            목적에 맞는 템플릿을 선택하여 최적화된 블로그 콘텐츠를 생성하세요
          </p>
        </div>

        {!selectedTemplate ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center`}>
                      <template.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTemplate(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>템플릿 선택으로 돌아가기</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <selectedTemplate.icon className="h-5 w-5 text-hermes-orange" />
                  <span>{selectedTemplate.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderTemplateForm()}
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-hermes-orange hover:bg-hermes-orange/90 text-xl font-bold py-6"
                    onClick={() => handleGenerate(selectedTemplate.id)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        생성 중...
                      </>
                    ) : (
                      '딸깍'
                    )}
                  </Button>
                  
                  {selectedTemplate?.id === 'store-promotion' && (
                    <Button 
                      variant="outline"
                      className="w-full border-hermes-orange text-hermes-orange hover:bg-hermes-orange hover:text-white"
                      onClick={() => setShowSaveDialog(true)}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      정보 저장
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 정보 저장 다이얼로그 */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">매장 정보 저장</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profileName">저장할 이름</Label>
                  <Input 
                    id="profileName"
                    placeholder="예: 우리카페"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    취소
                  </Button>
                  <Button 
                    className="flex-1 bg-hermes-orange hover:bg-hermes-orange/90"
                    onClick={handleSaveProfile}
                  >
                    저장
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}