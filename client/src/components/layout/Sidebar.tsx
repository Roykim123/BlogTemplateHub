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

  // New menu structure based on requirements
  const menuSections = [
    {
      title: "커뮤니티",
      items: [
        { id: "dashboard", label: "기본 대시보드", icon: Home, path: "/" },
        { id: "community", label: "커뮤니티 게시판", icon: MessageCircle, path: "/community" },
        { id: "challenger", label: "챌린저 프로젝트", icon: Trophy, path: "/challenger" },
        { id: "premium-courses", label: "프리미엄 콘텐츠", icon: GraduationCap, path: "/tutorial" }
      ]
    },
    {
      title: "자동화 기능", 
      items: [
        { id: "sns-auto", label: "딸깍AI 자동포스팅", icon: Zap, path: "/sns-auto" },
        { id: "blog-templates", label: "블로그 템플릿", icon: FileText, path: "/blog-templates" },
        { id: "insta-threads", label: "인스타/쓰레드 템플릿", icon: Instagram, path: "/insta-threads" },
        { id: "youtube-auto", label: "유튜브 자동화", icon: Youtube, path: "/youtube-auto", badge: "예정" }
      ]
    },
    {
      title: "고객영역",
      items: [
        { id: "mypage", label: "마이페이지", icon: User, path: "/mypage" },
        { id: "payment", label: "결제 관리", icon: CreditCard, path: "/payment" },
        ...(isAdmin ? [{ id: "admin", label: "관리자 대시보드", icon: Shield, path: "/admin" }] : [])
      ]
    }
  ];

  // Mobile navigation with essential items
  const mobileNavItems = [
    { id: "dashboard", label: "홈", icon: Home, path: "/" },
    { id: "sns-auto", label: "딸깍AI", icon: Zap, path: "/sns-auto" },
    { id: "community", label: "커뮤니티", icon: MessageCircle, path: "/community" },
    { id: "mypage", label: "마이페이지", icon: User, path: "/mypage" }
  ];

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-4 z-40">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setLocation(item.path)}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all",
              currentPage === item.id
                ? "text-hermes-orange"
                : "text-gray-600 dark:text-gray-400 hover:text-hermes-orange"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  // Desktop expandable sidebar
  return (
    <nav 
      className={cn(
        "fixed left-0 top-8 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col py-4 z-30 transition-all duration-700 ease-in-out group",
        isExpanded ? "w-56" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col space-y-6 flex-1 px-2">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-2">
            {/* Section Title - only show when expanded */}
            {isExpanded && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            )}
            
            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLocation(item.path)}
                  className={cn(
                    "w-full flex items-center rounded-lg transition-all duration-500 ease-in-out text-gray-700 dark:text-gray-300",
                    isExpanded ? "px-3 py-2" : "px-3 py-3 justify-center",
                    currentPage === item.id
                      ? "bg-hermes-orange text-white shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white hover:shadow-sm"
                  )}
                >
                  <item.icon className={cn("flex-shrink-0", isExpanded ? "h-5 w-5" : "h-6 w-6")} />
                  
                  {isExpanded && (
                    <>
                      <span className="ml-3 text-sm font-medium truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>
            
            {/* Divider between sections */}
            {section !== menuSections[menuSections.length - 1] && (
              <div className="my-4">
                <div className="h-px bg-gray-200 dark:bg-gray-700 mx-3"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}