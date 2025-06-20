import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS, TUTORIAL_NAV } from "@/lib/constants";
import { useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const [location, setLocation] = useLocation();
  const isMobile = useMobile();
  
  const currentPage = location.replace("/", "") || "chatbot";

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

  return (
    <nav className="fixed left-0 top-8 bottom-0 w-12 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center py-4 space-y-3 z-40">
      {NAVIGATION_ITEMS.map((item) => (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setLocation(item.path)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-lg transition-all group",
                currentPage === item.id
                  ? "bg-hermes-orange text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            {item.label}
          </TooltipContent>
        </Tooltip>
      ))}
      
      <div className="flex-1" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setLocation(TUTORIAL_NAV.path)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-lg transition-all group",
              currentPage === TUTORIAL_NAV.id
                ? "bg-hermes-orange text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-hermes-orange hover:text-white"
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
