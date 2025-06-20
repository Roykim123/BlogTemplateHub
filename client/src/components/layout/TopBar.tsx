import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Bell } from "lucide-react";
import { useLocation } from "wouter";

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6 bg-hermes-orange rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">걱</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:block">걱정마AI</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-6 h-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "light" ? (
            <Moon className="h-3 w-3 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="h-3 w-3 text-gray-600 dark:text-gray-400" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
        >
          <Bell className="h-3 w-3 text-gray-600 dark:text-gray-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-hermes-orange rounded-full"></div>
        </Button>
        
        <Button
          size="sm"
          className="text-xs bg-hermes-orange text-white px-3 py-1 h-6 rounded-full hover:bg-hermes-orange/90"
        >
          로그인
        </Button>
      </div>
    </header>
  );
}
