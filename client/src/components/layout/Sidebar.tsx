import { cn } from "@/lib/utils";
import { DASHBOARD_ITEMS, AUTOMATION_ITEMS, CUSTOMER_ITEMS, USER_INFO_ITEMS, TUTORIAL_NAV } from "@/lib/constants";
import { useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings, Target } from "lucide-react";

export function Sidebar() {
  const [location, setLocation] = useLocation();
  const isMobile = useMobile();
  
  const currentPage = location.replace("/", "") || "dashboard";
  
  // Mock admin check - in real app, this would come from auth context
  const isAdmin = true; // Set to true to show admin panel

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-4 z-40">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setLocation(item.path)}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all",
              currentPage === item.id
                ? "bg-hermes-orange text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <item.icon className="h-4 w-4 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  const renderNavSection = (items: any[], sectionTitle?: string) => (
    <>
      {items.map((item) => (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setLocation(item.path)}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-lg transition-all group relative mb-2",
                currentPage === item.id
                  ? "bg-hermes-orange text-white shadow-lg ring-2 ring-hermes-orange/30 ring-offset-2"
                  : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white hover:shadow-md hover:ring-1 hover:ring-hermes-orange/20 hover:ring-offset-1"
              )}
            >
              <item.icon className="h-6 w-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );

  return (
    <nav className="fixed left-0 top-8 bottom-0 w-16 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center py-4 z-40">
      {/* 1) 대시보드 */}
      {renderNavSection(DASHBOARD_ITEMS)}
      
      {/* Divider */}
      <div className="w-10 h-px bg-gray-300 dark:bg-gray-600 my-3"></div>
      
      {/* 2) 자동화기능 (블로그/기타) */}
      {renderNavSection(AUTOMATION_ITEMS)}
      
      {/* Divider */}
      <div className="w-10 h-px bg-gray-300 dark:bg-gray-600 my-3"></div>
      
      {/* 3) 고객유치 (게시판/미니게임) */}
      {renderNavSection(CUSTOMER_ITEMS)}
      
      {/* Divider */}
      <div className="w-10 h-px bg-gray-300 dark:bg-gray-600 my-3"></div>
      
      {/* 4) 고객정보 (마이페이지, 결제) */}
      {renderNavSection(USER_INFO_ITEMS)}
      
      {/* Admin-only sections */}
      {isAdmin && (
        <>
          {/* Divider */}
          <div className="w-10 h-px bg-gray-300 dark:bg-gray-600 my-3"></div>
          
          {/* Mini Games - Admin only */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setLocation("/games")}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-lg transition-all group relative mb-2",
                  currentPage === "games"
                    ? "bg-hermes-orange text-white shadow-lg ring-2 ring-hermes-orange/30 ring-offset-2"
                    : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white hover:shadow-md hover:ring-1 hover:ring-hermes-orange/20 hover:ring-offset-1"
                )}
              >
                <Target className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <div>
                <p className="font-medium">미니게임</p>
                <p className="text-xs text-gray-500">관리자 전용</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </>
      )}

      {/* Admin Panel - Only visible to admins */}
      <div className="mt-auto mb-4">
        {isAdmin && (
          <>
            <div className="w-10 h-px bg-gray-300 dark:bg-gray-600 my-3"></div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setLocation("/admin")}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-lg transition-all group relative",
                    currentPage === "admin"
                      ? "bg-hermes-orange text-white shadow-lg ring-2 ring-hermes-orange/30 ring-offset-2"
                      : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white hover:shadow-md hover:ring-1 hover:ring-hermes-orange/20 hover:ring-offset-1"
                  )}
                >
                  <Settings className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                관리자 페이지
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
      
      <div className="flex-1" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setLocation(TUTORIAL_NAV.path)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg transition-all group relative",
              currentPage === TUTORIAL_NAV.id
                ? "bg-hermes-orange text-white shadow-lg ring-2 ring-hermes-orange/30 ring-offset-2"
                : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white hover:shadow-md hover:ring-1 hover:ring-hermes-orange/20 hover:ring-offset-1"
            )}
          >
            <TUTORIAL_NAV.icon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          {TUTORIAL_NAV.label}
        </TooltipContent>
      </Tooltip>
    </nav>
  );
}
