import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  Search,
  Filter,
  Coins,
  Heart,
  Share2,
  TrendingUp,
  Award
} from "lucide-react";
import { premiumCourses, courseCategories, courseLevels, type PremiumCourse } from "@/data/premiumCourses";
import { useToast } from "@/hooks/use-toast";

export default function TutorialPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCourse, setSelectedCourse] = useState<PremiumCourse | null>(null);
  const [userCash] = useState(2450); // Mock user AI Cash
  const { toast } = useToast();

  const filteredCourses = premiumCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  }).sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleEnrollCourse = (course: PremiumCourse) => {
    if (userCash >= course.price) {
      toast({
        title: "클래스 신청 완료!",
        description: `${course.title} 강의를 신청했습니다. AI캐쉬 ${course.price.toLocaleString()}원이 차감되었습니다.`,
      });
      setSelectedCourse(null);
    } else {
      toast({
        title: "AI캐쉬 부족",
        description: "AI캐쉬가 부족합니다. 결제 메뉴에서 충전해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            유료 강의존
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            전문가들의 고급 강의로 실력을 한 단계 업그레이드하세요
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
              <Coins className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium">보유 AI캐쉬: {userCash.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">자동화 강의</TabsTrigger>
            <TabsTrigger value="live">유튜브 Live</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="강의 제목이나 강사명으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="난이도" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevels.map(level => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">인기순</SelectItem>
                      <SelectItem value="rating">평점순</SelectItem>
                      <SelectItem value="price-low">가격 낮은순</SelectItem>
                      <SelectItem value="price-high">가격 높은순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-all group">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-hermes-orange to-red-500 rounded-t-lg flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-sm opacity-90">{course.instructor}</p>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                      {course.isLive && (
                        <Badge className="bg-red-500 text-white text-xs">
                          LIVE
                        </Badge>
                      )}
                      {course.isPopular && (
                        <Badge className="bg-yellow-500 text-white text-xs">
                          인기
                        </Badge>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="bg-white/90 h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-white/90 h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-hermes-orange transition-colors">
                      {course.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {course.rating}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {course.students.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-hermes-orange">
                          {course.price.toLocaleString()}원
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            {course.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-hermes-orange hover:bg-hermes-orange/90"
                            onClick={() => setSelectedCourse(course)}
                          >
                            신청하기
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          {selectedCourse && (
                            <>
                              <DialogHeader>
                                <DialogTitle>{selectedCourse.title}</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-6">
                                {/* Course Header */}
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="w-full h-48 bg-gradient-to-br from-hermes-orange to-red-500 rounded-lg flex items-center justify-center mb-4">
                                      <div className="text-white text-center p-4">
                                        <h3 className="font-bold text-xl mb-2">{selectedCourse.title}</h3>
                                        <p className="opacity-90">{selectedCourse.instructor}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="ml-6 text-right">
                                    <div className="text-2xl font-bold text-hermes-orange mb-2">
                                      {selectedCourse.price.toLocaleString()}원
                                    </div>
                                    <div className="space-y-2">
                                      <Button
                                        onClick={() => handleEnrollCourse(selectedCourse)}
                                        className="w-full bg-hermes-orange hover:bg-hermes-orange/90"
                                      >
                                        클래스 신청
                                      </Button>
                                      <div className="flex items-center text-sm text-gray-500">
                                        <Coins className="h-4 w-4 mr-1" />
                                        AI캐쉬로 결제
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Course Info */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                                    <div className="text-sm font-medium">{selectedCourse.rating}</div>
                                    <div className="text-xs text-gray-500">평점</div>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                                    <div className="text-sm font-medium">{selectedCourse.students.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">수강생</div>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Clock className="h-5 w-5 mx-auto mb-1 text-green-500" />
                                    <div className="text-sm font-medium">{selectedCourse.duration}</div>
                                    <div className="text-xs text-gray-500">총 시간</div>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Award className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                                    <div className="text-sm font-medium">{selectedCourse.level}</div>
                                    <div className="text-xs text-gray-500">난이도</div>
                                  </div>
                                </div>

                                {/* Description */}
                                <div>
                                  <h3 className="font-semibold mb-2">클래스 소개</h3>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {selectedCourse.description}
                                  </p>
                                </div>

                                {/* Highlights */}
                                <div>
                                  <h3 className="font-semibold mb-3">클래스 특징</h3>
                                  <div className="space-y-2">
                                    {selectedCourse.highlights.map((highlight, index) => (
                                      <div key={index} className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                          {highlight}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Curriculum */}
                                <div>
                                  <h3 className="font-semibold mb-3">커리큘럼</h3>
                                  <div className="space-y-2">
                                    {selectedCourse.curriculum.map((item, index) => (
                                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                        <div className="w-6 h-6 bg-hermes-orange text-white rounded-full flex items-center justify-center text-xs font-medium">
                                          {index + 1}
                                        </div>
                                        <span className="text-sm">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                유튜브 라이브 강의
              </h3>
              <p className="text-gray-500">
                실시간 라이브 강의는 준비 중입니다. 곧 찾아뵙겠습니다!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
