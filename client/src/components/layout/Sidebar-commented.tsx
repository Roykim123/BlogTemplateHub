import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { 
  Home, 
  MessageCircle, 
  Trophy, 
  GraduationCap,
  Zap,
  BarChart3,
  FileText,
  Instagram,
  Youtube,
  Briefcase,
  User,
  CreditCard,
  Shield
} from "lucide-react";

export function Sidebar() {
  const [location, setLocation] = useLocation();
  const isMobile = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentPage = location.replace("/", "") || "dashboard";
  const isAdmin = true;

  // ✅ [메뉴 구조 설정] - 사이드바에 표시할 메뉴들을 설정합니다
  // 새로운 메뉴를 추가하거나 기존 메뉴를 수정하려면 이 부분을 편집하세요
  const menuSections = [
    {
      // ✅ [첫 번째 섹션 - 자동화 기능] - 핵심 수익 기능들이 모인 섹션
      // 섹션 제목 변경: "자동화 기능" → "AI 도구" 등으로 변경 가능
      title: "자동화 기능", 
      items: [
        // ✅ [딸깍AI 메뉴] - 메인 자동포스팅 기능
        // 메뉴명 변경: "딸깍AI 자동포스팅" → 원하는 이름으로 변경 가능
        // 아이콘 변경: Zap → 다른 아이콘(예: Bot, Smartphone 등)으로 변경 가능
        // 경로 변경: "/sns-auto" → 원하는 페이지 경로로 변경 가능
        { id: "sns-auto", label: "딸깍AI 자동포스팅", icon: Zap, path: "/sns-auto" },
        
        // ✅ [블로그 템플릿 메뉴] - 블로그 작성 템플릿 기능
        { id: "blog-templates", label: "블로그 템플릿", icon: FileText, path: "/blog-templates" },
        
        // ✅ [인스타/쓰레드 템플릿 메뉴] - SNS 템플릿 기능
        { id: "insta-threads", label: "인스타/쓰레드 템플릿", icon: Instagram, path: "/insta-threads" },
        
        // ✅ [유튜브 자동화 메뉴] - 예정된 기능 (뱃지 포함)
        // 뱃지 변경: badge: "예정" → "신규", "베타" 등으로 변경 가능
        { id: "youtube-auto", label: "유튜브 자동화", icon: Youtube, path: "/youtube-auto", badge: "예정" }
      ]
    },
    {
      // ✅ [두 번째 섹션 - 커뮤니티] - 사용자 소통 관련 기능들
      title: "커뮤니티",
      items: [
        // ✅ [기본 대시보드] - 홈페이지 메뉴
        { id: "dashboard", label: "기본 대시보드", icon: Home, path: "/" },
        
        // ✅ [커뮤니티 게시판] - 게시판 메뉴
        { id: "community", label: "커뮤니티 게시판", icon: MessageCircle, path: "/community" },
        
        // ✅ [챌린저 프로젝트] - 7일 미션 메뉴
        { id: "challenger", label: "챌린저 프로젝트", icon: Trophy, path: "/challenger" },
        
        // ✅ [프리미엄 콘텐츠] - 교육 콘텐츠 메뉴
        { id: "premium-courses", label: "프리미엄 콘텐츠", icon: GraduationCap, path: "/tutorial" }
      ]
    },
    {
      // ✅ [세 번째 섹션 - 고객영역] - 개인 설정 및 관리 기능들
      title: "고객영역",
      items: [
        // ✅ [마이페이지] - 개인 정보 관리
        { id: "mypage", label: "마이페이지", icon: User, path: "/mypage" },
        
        // ✅ [결제관리] - 구독 및 결제 관리
        { id: "payment", label: "결제관리", icon: CreditCard, path: "/payment" }
      ]
    }
  ];

  // ✅ [관리자 메뉴] - 관리자만 볼 수 있는 메뉴 (isAdmin이 true일 때만 표시)
  if (isAdmin) {
    menuSections.push({
      title: "관리자",
      items: [
        // ✅ [관리자 대시보드] - 전체 시스템 관리
        // 관리자가 아닌 경우 이 메뉴는 보이지 않습니다
        { id: "admin", label: "관리자 대시보드", icon: Shield, path: "/admin" }
      ]
    });
  }

  // ✅ [메뉴 클릭 함수] - 메뉴를 클릭했을 때 페이지 이동 처리
  const handleNavigation = (path: string) => {
    setLocation(path);
    if (isMobile) {
      setIsExpanded(false); // 모바일에서는 메뉴 클릭 후 사이드바 자동 닫기
    }
  };

  // ✅ [모바일 화면 처리] - 화면 크기에 따른 다른 UI 표시
  if (isMobile) {
    return (
      // ✅ [모바일 하단 네비게이션] - 모바일에서는 화면 하단에 네비게이션 표시
      // 배경색 변경: bg-white → bg-blue-50 등으로 변경 가능
      // 테두리색 변경: border-gray-200 → border-blue-200 등으로 변경 가능
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-pb">
        <div className="flex justify-around items-center py-1 px-2">
          {/* ✅ [모바일 메뉴 아이템들] - 모바일에서 표시할 주요 4개 메뉴 */}
          {[
            // 홈, 자동화, 커뮤니티, 마이페이지 순서로 표시
            { id: "dashboard", label: "홈", icon: Home, path: "/" },
            { id: "sns-auto", label: "자동화", icon: Zap, path: "/sns-auto" },
            { id: "community", label: "커뮤니티", icon: MessageCircle, path: "/community" },
            { id: "mypage", label: "마이페이지", icon: User, path: "/mypage" }
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id || (item.id === "dashboard" && currentPage === "");
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center p-1 rounded-lg transition-all duration-200 min-w-0 flex-1",
                  // ✅ [활성/비활성 상태 색상] - 현재 페이지와 다른 페이지의 색상 설정
                  // 활성 상태: text-hermes-orange bg-orange-50 → text-blue-600 bg-blue-50 등으로 변경
                  // 비활성 상태: text-gray-600 → text-gray-500 등으로 변경
                  isActive 
                    ? "text-hermes-orange bg-orange-50 dark:bg-orange-900/20" 
                    : "text-gray-600 dark:text-gray-400 hover:text-hermes-orange hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <IconComponent className="h-4 w-4 mb-0.5" />
                {/* ✅ [모바일 메뉴 텍스트] - 아이콘 아래 표시되는 텍스트 */}
                <span className="text-xs font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ✅ [데스크톱 사이드바] - PC 화면에서 표시되는 사이드바
  return (
    <div
      // ✅ [사이드바 호버 이벤트] - 마우스를 올리면 확장, 벗어나면 축소
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        "fixed left-0 top-8 bottom-0 z-40 transition-all duration-300 ease-in-out",
        // ✅ [사이드바 배경색] - 사이드바 전체 배경색 설정
        // 배경색 변경: bg-white → bg-blue-50, bg-gray-50 등으로 변경 가능
        // 테두리색 변경: border-gray-200 → border-blue-200 등으로 변경 가능
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700",
        // ✅ [사이드바 너비] - 축소/확장 시 너비 설정
        // 축소 너비: w-16 (64px), 확장 너비: w-64 (256px)
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 px-3 space-y-6">
          {/* ✅ [메뉴 섹션들] - 각 섹션(자동화 기능, 커뮤니티, 고객영역)을 순서대로 표시 */}
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              
              {/* ✅ [섹션 제목] - 확장되었을 때만 표시되는 섹션 제목 */}
              {/* 제목 색상: text-gray-900 → text-blue-900 등으로 변경 가능 */}
              {isExpanded && (
                <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2 px-2">
                  {section.title}
                </h3>
              )}
              
              {/* ✅ [메뉴 아이템들] - 각 섹션 내의 개별 메뉴들 */}
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = currentPage === item.id || (item.id === "dashboard" && currentPage === "");
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        "w-full flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                        // ✅ [메뉴 아이템 색상] - 활성/비활성 상태별 색상 설정
                        // 활성 상태 배경: bg-hermes-orange/10 → bg-blue-100 등으로 변경
                        // 활성 상태 텍스트: text-hermes-orange → text-blue-600 등으로 변경
                        // 비활성 상태: text-gray-700 → text-gray-600 등으로 변경
                        isActive
                          ? "bg-hermes-orange/10 text-hermes-orange dark:bg-hermes-orange/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-hermes-orange"
                      )}
                    >
                      {/* ✅ [메뉴 아이콘] - 각 메뉴의 아이콘 */}
                      <IconComponent className={cn("h-5 w-5 flex-shrink-0", isExpanded ? "mr-3" : "mr-0")} />
                      
                      {/* ✅ [메뉴 텍스트] - 확장되었을 때만 표시되는 메뉴 이름 */}
                      {isExpanded && (
                        <span className="flex-1 text-left font-semibold">
                          {item.label}
                        </span>
                      )}
                      
                      {/* ✅ [메뉴 뱃지] - "예정", "신규" 등의 상태 표시 */}
                      {isExpanded && item.badge && (
                        // 뱃지 색상: bg-yellow-100 text-yellow-800 → bg-green-100 text-green-800 등으로 변경
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-900 dark:text-yellow-200">
                          {item.badge}
                        </span>
                      )}
                      
                      {/* ✅ [툴팁] - 축소 상태에서 메뉴에 마우스를 올렸을 때 표시되는 설명 */}
                      {!isExpanded && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.label}
                          {/* 툴팁 화살표 */}
                          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}